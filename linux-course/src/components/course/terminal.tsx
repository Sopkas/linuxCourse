'use client';

import { useState, useEffect, useRef } from 'react';
import type { Terminal as XTermType, IDisposable } from 'xterm';
// Обратите внимание: пакет xterm-addon-fit устарел, но мы используем его для совместимости
// В будущем рекомендуется перейти на @xterm/addon-fit
import type { FitAddon as FitAddonType } from 'xterm-addon-fit';

// Файловая система для эмуляции
type FileSystemItem = {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: Record<string, FileSystemItem>;
  permissions?: string;
  owner?: string;
  group?: string;
  size?: number;
  modified?: string;
};

// Создаем виртуальную файловую систему
const fileSystem: Record<string, FileSystemItem> = {
  'home': {
    name: 'home',
    type: 'directory',
    permissions: 'drwxr-xr-x',
    owner: 'root',
    group: 'root',
    modified: '2023-01-01',
    children: {
      'user': {
        name: 'user',
        type: 'directory',
        permissions: 'drwxr-xr-x',
        owner: 'user',
        group: 'user',
        modified: '2023-01-01',
        children: {
          'documents': {
            name: 'documents',
            type: 'directory',
            permissions: 'drwxr-xr-x',
            owner: 'user',
            group: 'user',
            modified: '2023-01-01',
            children: {
              'notes.txt': {
                name: 'notes.txt',
                type: 'file',
                content: 'Это мои заметки по Linux.',
                permissions: '-rw-r--r--',
                owner: 'user',
                group: 'user',
                size: 25,
                modified: '2023-01-15'
              },
              'todo.txt': {
                name: 'todo.txt',
                type: 'file',
                content: '1. Изучить команды Linux\n2. Выполнить задания курса\n3. Практиковаться каждый день',
                permissions: '-rw-r--r--',
                owner: 'user',
                group: 'user',
                size: 70,
                modified: '2023-01-20'
              }
            }
          },
          'downloads': {
            name: 'downloads',
            type: 'directory',
            permissions: 'drwxr-xr-x',
            owner: 'user',
            group: 'user',
            modified: '2023-01-05',
            children: {}
          },
          '.bashrc': {
            name: '.bashrc',
            type: 'file',
            content: '# .bashrc конфигурация\nalias ll="ls -la"\nexport PATH=$PATH:/usr/local/bin',
            permissions: '-rw-r--r--',
            owner: 'user',
            group: 'user',
            size: 60,
            modified: '2022-12-15'
          }
        }
      }
    }
  },
  'bin': {
    name: 'bin',
    type: 'directory',
    permissions: 'drwxr-xr-x',
    owner: 'root',
    group: 'root',
    modified: '2022-12-01',
    children: {
      'bash': {
        name: 'bash',
        type: 'file',
        permissions: '-rwxr-xr-x',
        owner: 'root',
        group: 'root',
        size: 1024,
        modified: '2022-12-01'
      },
      'ls': {
        name: 'ls',
        type: 'file',
        permissions: '-rwxr-xr-x',
        owner: 'root',
        group: 'root',
        size: 512,
        modified: '2022-12-01'
      }
    }
  },
  'etc': {
    name: 'etc',
    type: 'directory',
    permissions: 'drwxr-xr-x',
    owner: 'root',
    group: 'root',
    modified: '2022-12-01',
    children: {
      'passwd': {
        name: 'passwd',
        type: 'file',
        content: 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:User:/home/user:/bin/bash',
        permissions: '-rw-r--r--',
        owner: 'root',
        group: 'root',
        size: 80,
        modified: '2022-12-01'
      },
      'hostname': {
        name: 'hostname',
        type: 'file',
        content: 'linux-course',
        permissions: '-rw-r--r--',
        owner: 'root',
        group: 'root',
        size: 11,
        modified: '2022-12-01'
      }
    }
  }
};

interface TerminalProps {
  initialOutput?: string[];
  className?: string;
  checkTask?: (command: string) => boolean;
}

export function Terminal({ initialOutput = [], className = '', checkTask }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTermType | null>(null);
  const [, setInput] = useState('');
  const [, setCommandHistory] = useState<string[]>([]);
  const [, setHistoryIndex] = useState(-1);
  const [, setCurrentDirectory] = useState('/home/user');
  const [environmentVariables, setEnvironmentVariables] = useState({
    PATH: '/usr/local/bin:/usr/bin:/bin',
    HOME: '/home/user',
    USER: 'user',
    SHELL: '/bin/bash',
    PWD: '/home/user'
  });
  const inputRef = useRef('');
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const currentDirectoryRef = useRef('/home/user');
  const envVarsRef = useRef(environmentVariables);



  useEffect(() => {
    if (!terminalRef.current) return;

    let term: XTermType | null = null;
    let fitAddon: FitAddonType | null = null;
    let keyListener: IDisposable | null = null;
    let isMounted = true;
    let resizeObserver: ResizeObserver | null = null;

    const handleResize = () => {
      if (fitAddon && terminalRef.current) {
        const { clientWidth, clientHeight } = terminalRef.current;
        // Only fit if container has actual dimensions
        if (clientWidth > 0 && clientHeight > 0) {
          try {
            fitAddon.fit();
          } catch (e) {
            console.error("Failed to fit terminal on resize:", e);
          }
        }
      }
    };

    const setupTerminal = async () => {
      const [{ Terminal }, { FitAddon }] = await Promise.all([
        import('xterm'),
        import('xterm-addon-fit'),
      ]);

      if (!isMounted || !terminalRef.current) return;

      // Wait for the container to have dimensions
      const container = terminalRef.current;
      const { clientWidth, clientHeight } = container;

      if (clientWidth === 0 || clientHeight === 0) {
        // Container not ready yet, use ResizeObserver to wait
        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
              resizeObserver?.disconnect();
              resizeObserver = null;
              if (isMounted) {
                initTerminal(Terminal, FitAddon);
              }
            }
          }
        });
        resizeObserver.observe(container);
        return;
      }

      initTerminal(Terminal, FitAddon);
    };

    const initTerminal = (
      Terminal: typeof XTermType,
      FitAddon: typeof FitAddonType
    ) => {
      if (!terminalRef.current || term) return;

      term = new Terminal({
        cursorBlink: true,
        fontFamily: 'monospace',
        fontSize: 14,
        theme: {
          background: '#1e1e1e',
          foreground: '#f8f8f8',
          cursor: '#f8f8f8',
        },
      });

      fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);

      // Delay fit() to ensure layout is stable
      requestAnimationFrame(() => {
        try {
          if (terminalRef.current) {
            const { clientWidth, clientHeight } = terminalRef.current;
            if (clientWidth > 0 && clientHeight > 0) {
              fitAddon?.fit();
            }
          }
        } catch (e) {
          console.error("Failed to fit terminal:", e);
        }
      });

      const prompt = () => {
        term?.write('$ ');
      };

      const handleCommandInput = (command: string) => {
        if (!term) return;

        const args = command.trim().split(/\s+/);
        const baseCommand = args[0];

        switch (baseCommand) {
          case 'ls':
            handleLsCommand(term, args, currentDirectoryRef.current);
            break;
          case 'cd': {
            const newPath = handleCdCommand(args[1], currentDirectoryRef.current);
            currentDirectoryRef.current = newPath;
            setCurrentDirectory(newPath);

            const updatedEnv = { ...envVarsRef.current, PWD: newPath };
            envVarsRef.current = updatedEnv;
            setEnvironmentVariables(updatedEnv);
            break;
          }
          case 'cat':
            handleCatCommand(term, args, currentDirectoryRef.current);
            break;
          case 'mkdir':
            handleMkdirCommand(term, args, currentDirectoryRef.current);
            break;
          case 'touch':
            handleTouchCommand(term, args, currentDirectoryRef.current);
            break;
          case 'rm':
            handleRmCommand(term, args, currentDirectoryRef.current);
            break;
          case 'pwd':
            term.writeln(currentDirectoryRef.current);
            break;
          case '':
            break;
          default:
            term.writeln(`${baseCommand}: command not found`);
        }
      };

      term.writeln('Welcome to the Linux course terminal!');
      term.writeln('Supported commands: ls, cd, cat, mkdir, touch, rm, pwd.');
      term.writeln('');

      const t = term;
      if (initialOutput.length > 0 && t) {
        initialOutput.forEach((line) => t.writeln(line));
      }

      prompt();

      window.addEventListener('resize', handleResize);

      keyListener = term.onKey(({ key, domEvent }) => {
        const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

        if (domEvent.keyCode === 13 || domEvent.key === 'Enter') {
          term!.writeln('');

          const command = inputRef.current.trim();

          if (command) {
            const newHistory = [...historyRef.current, command];
            historyRef.current = newHistory;
            setCommandHistory(newHistory);
            historyIndexRef.current = -1;
            setHistoryIndex(-1);

            if (checkTask && checkTask(command)) {
              term!.writeln('[32m?-???????????? ???<?????>???????? ??????????????![0m');
            }

            const commandEvent = new CustomEvent('terminal-command', {
              detail: { command },
            });
            window.dispatchEvent(commandEvent);

            handleCommandInput(command);
          }

          inputRef.current = '';
          setInput('');
          prompt();
        } else if (domEvent.keyCode === 8 || domEvent.key === 'Backspace') {
          if (inputRef.current.length > 0) {
            inputRef.current = inputRef.current.slice(0, -1);
            setInput(inputRef.current);
            term!.write('\b \b');
          }
        } else if (domEvent.key === 'ArrowUp') {
          if (historyRef.current.length === 0) {
            return;
          }

          const nextIndex = Math.min(historyIndexRef.current + 1, historyRef.current.length - 1);
          historyIndexRef.current = nextIndex;
          setHistoryIndex(nextIndex);

          const cmd = historyRef.current[historyRef.current.length - 1 - nextIndex];
          term!.write('\x1b[2K\r');
          prompt();
          inputRef.current = cmd;
          setInput(cmd);
          term!.write(cmd);
        } else if (domEvent.key === 'ArrowDown') {
          if (historyRef.current.length === 0) {
            return;
          }

          const nextIndex = Math.max(historyIndexRef.current - 1, -1);
          historyIndexRef.current = nextIndex;
          setHistoryIndex(nextIndex);

          const cmd = nextIndex === -1 ? '' : historyRef.current[historyRef.current.length - 1 - nextIndex];
          term!.write('\x1b[2K\r');
          prompt();
          inputRef.current = cmd;
          setInput(cmd);
          term!.write(cmd);
        } else if (printable) {
          inputRef.current += key;
          setInput(inputRef.current);
          term!.write(key);
        }
      });

      xtermRef.current = term;
    };

    setupTerminal();

    return () => {
      isMounted = false;
      keyListener?.dispose();
      term?.dispose();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [checkTask, initialOutput]);

  const handleLsCommand = (term: XTermType, args: string[], currentDir: string) => {
    const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
    const showLong = args.includes('-l') || args.includes('-la') || args.includes('-al');

    let targetDir = currentDir;
    const nonFlagArgs = args.filter(arg => !arg.startsWith('-') && arg !== 'ls');

    if (nonFlagArgs.length > 0) {
      const dirArg = nonFlagArgs[0];
      if (dirArg.startsWith('/')) {
        targetDir = dirArg;
      } else {
        targetDir = resolvePath(currentDir + '/' + dirArg);
      }
    }

    const dirItem = getItemAtPath(targetDir);

    if (!dirItem || dirItem.type !== 'directory') {
      term.writeln(`ls: невозможно получить доступ к '${targetDir}': Нет такого файла или каталога`);
      return;
    }

    const children = dirItem.children || {};
    const items = Object.values(children);

    if (showLong) {
      term.writeln('итого ' + items.length);

      // Фильтруем скрытые файлы, если не указан флаг -a
      const filteredItems = showAll
        ? items
        : items.filter(item => !item.name.startsWith('.'));

      filteredItems.forEach(item => {
        const permissions = item.permissions || (item.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--');
        const owner = item.owner || 'user';
        const group = item.group || 'user';
        const size = item.size || (item.type === 'directory' ? 4096 : 0);
        const modified = item.modified || '2023-01-01';
        term.writeln(`${permissions} 1 ${owner} ${group} ${size.toString().padStart(5)} ${modified} ${item.name}`);
      });
    } else {
      // Фильтруем скрытые файлы, если не указан флаг -a
      const filteredItems = showAll
        ? items
        : items.filter(item => !item.name.startsWith('.'));

      const names = filteredItems.map(item => {
        if (item.type === 'directory') {
          return '\x1b[34m' + item.name + '\x1b[0m';
        } else if (item.permissions && item.permissions.includes('x')) {
          return '\x1b[32m' + item.name + '\x1b[0m';
        } else {
          return item.name;
        }
      });

      term.writeln(names.join('  '));
    }
  };

  // Функция для обработки команды cd
  const handleCdCommand = (dirArg: string = '', currentDir: string): string => {
    if (!dirArg || dirArg === '~') {
      return '/home/user';
    }

    let newPath: string;
    if (dirArg.startsWith('/')) {
      newPath = dirArg;
    } else {
      newPath = resolvePath(currentDir + '/' + dirArg);
    }

    const item = getItemAtPath(newPath);
    if (!item || item.type !== 'directory') {
      // Оставляем текущую директорию без изменений
      return currentDir;
    }

    return newPath;
  };

  // Функция для обработки команды cat
  const handleCatCommand = (term: XTermType, args: string[], currentDir: string) => {
    if (args.length < 2) {
      term.writeln('cat: отсутствует операнд');
      return;
    }

    const filePath = args[1].startsWith('/') ? args[1] : resolvePath(currentDir + '/' + args[1]);
    const fileItem = getItemAtPath(filePath);

    if (!fileItem) {
      term.writeln(`cat: ${args[1]}: Нет такого файла или каталога`);
    } else if (fileItem.type === 'directory') {
      term.writeln(`cat: ${args[1]}: Это каталог`);
    } else {
      if (fileItem.content) {
        term.writeln(fileItem.content);
      }
    }
  };

  // Функция для обработки команды mkdir
  const handleMkdirCommand = (term: XTermType, args: string[], currentDir: string) => {
    if (args.length < 2) {
      term.writeln('mkdir: отсутствует операнд');
      return;
    }

    // Пока просто имитируем успешное создание
    term.writeln(`Директория ${args[1]} создана`);
  };

  // Функция для обработки команды touch
  const handleTouchCommand = (term: XTermType, args: string[], currentDir: string) => {
    if (args.length < 2) {
      term.writeln('touch: отсутствует операнд');
      return;
    }

    // Пока просто имитируем успешное создание
    term.writeln(`Файл ${args[1]} создан`);
  };

  // Функция для обработки команды rm
  const handleRmCommand = (term: XTermType, args: string[], currentDir: string) => {
    if (args.length < 2) {
      term.writeln('rm: отсутствует операнд');
      return;
    }

    // Пока просто имитируем успешное удаление
    term.writeln(`${args[1]} удален`);
  };

  // Вспомогательная функция для получения элемента по пути
  const getItemAtPath = (path: string): FileSystemItem | null => {
    const parts = path.split('/').filter(p => p);

    if (path === '/') {
      return {
        name: '/',
        type: 'directory',
        children: fileSystem
      };
    }

    let current: Record<string, FileSystemItem> = fileSystem;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (!current[part]) {
        return null;
      }

      if (i === parts.length - 1) {
        return current[part];
      }

      if (current[part].type !== 'directory' || !current[part].children) {
        return null;
      }

      current = current[part].children!;
    }

    return null;
  };

  // Вспомогательная функция для разрешения пути
  const resolvePath = (path: string): string => {
    const parts = path.split('/').filter(p => p);
    const result: string[] = [];

    for (const part of parts) {
      if (part === '.') {
        continue;
      } else if (part === '..') {
        result.pop();
      } else {
        result.push(part);
      }
    }

    return '/' + result.join('/');
  };

  return (
    <div className={`terminal-container ${className}`}>
      <div ref={terminalRef} className="h-full w-full" />
    </div>
  );
}
