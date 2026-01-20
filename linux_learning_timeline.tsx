import React, { useState } from 'react';
import { CheckCircle, Circle, Calendar, Book, Terminal, Award } from 'lucide-react';

const LinuxLearningTimeline = () => {
  const [completedTasks, setCompletedTasks] = useState({});
  
  const toggleTask = (weekId, taskId) => {
    const key = `${weekId}-${taskId}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const weeks = [
    {
      id: 'week1',
      title: 'Неделя 1: Основы и установка',
      theme: 'bg-blue-50 border-blue-200',
      color: 'text-blue-600',
      tasks: [
        'Установить Linux (Ubuntu/CentOS) на виртуальную машину',
        'Освоить базовую навигацию в терминале (cd, ls, pwd)',
        'Изучить структуру файловой системы (/etc, /home, /var, /usr)',
        'Научиться работать с файлами (cp, mv, rm, touch, mkdir)',
        'Освоить права доступа (chmod, chown, ls -l)',
        'Практика: создать структуру папок своего проекта'
      ],
      resources: [
        'Документация Ubuntu/CentOS',
        'Книга "Linux Command Line" - главы 1-5',
        'Интерактивные туториалы на linuxcommand.org'
      ]
    },
    {
      id: 'week2',
      title: 'Неделя 2: Работа с текстом и процессами',
      theme: 'bg-green-50 border-green-200',
      color: 'text-green-600',
      tasks: [
        'Изучить редакторы текста (nano, vim основы)',
        'Освоить работу с текстом (grep, sed, awk, sort, uniq)',
        'Понять перенаправление ввода/вывода (>, >>, |, <)',
        'Изучить управление процессами (ps, top, htop, kill)',
        'Освоить фоновые процессы и jobs (bg, fg, nohup)',
        'Практика: написать скрипт для анализа логов'
      ],
      resources: [
        'Vim tutor (встроенный)',
        'Regex101.com для изучения регулярных выражений',
        'Man-страницы команд (man grep, man sed)'
      ]
    },
    {
      id: 'week3',
      title: 'Неделя 3: Сетевые возможности и администрирование',
      theme: 'bg-purple-50 border-purple-200',
      color: 'text-purple-600',
      tasks: [
        'Изучить сетевые команды (ping, wget, curl, ssh, scp)',
        'Освоить управление пользователями (useradd, usermod, su, sudo)',
        'Понять работу с пакетными менеджерами (apt/yum)',
        'Изучить системные службы (systemctl, service)',
        'Освоить планировщик задач (cron, crontab)',
        'Практика: настроить автоматическое резервное копирование'
      ],
      resources: [
        'Официальная документация systemd',
        'Crontab.guru для составления cron-выражений',
        'SSH туториалы и лучшие практики'
      ]
    },
    {
      id: 'week4',
      title: 'Неделя 4: Скриптинг и продвинутые темы',
      theme: 'bg-orange-50 border-orange-200',
      color: 'text-orange-600',
      tasks: [
        'Написать продвинутые bash-скрипты с условиями и циклами',
        'Изучить переменные окружения и конфигурацию (.bashrc, .profile)',
        'Освоить мониторинг системы (df, du, free, iostat)',
        'Понять логи системы (/var/log, journalctl)',
        'Изучить архивирование (tar, gzip, zip)',
        'Финальный проект: создать скрипт системного администратора'
      ],
      resources: [
        'Advanced Bash-Scripting Guide',
        'Linux System Administrator Guide',
        'Stack Overflow для решения практических задач'
      ]
    }
  ];

  const getWeekProgress = (weekId) => {
    const weekTasks = weeks.find(w => w.id === weekId)?.tasks || [];
    const completed = weekTasks.filter((_, idx) => completedTasks[`${weekId}-${idx}`]).length;
    return Math.round((completed / weekTasks.length) * 100);
  };

  const getTotalProgress = () => {
    const totalTasks = weeks.reduce((sum, week) => sum + week.tasks.length, 0);
    const completedTotal = Object.values(completedTasks).filter(Boolean).length;
    return Math.round((completedTotal / totalTasks) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          <Terminal className="inline-block mr-2 text-blue-600" />
          Изучение Linux за 1 месяц
        </h1>
        <div className="bg-gray-100 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{width: `${getTotalProgress()}%`}}
          ></div>
        </div>
        <p className="text-gray-600">Общий прогресс: {getTotalProgress()}%</p>
      </div>

      <div className="space-y-6">
        {weeks.map((week, weekIndex) => (
          <div key={week.id} className={`border-2 rounded-xl p-6 ${week.theme}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${week.color}`}>
                <Calendar className="inline-block mr-2" size={20} />
                {week.title}
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {getWeekProgress(week.id)}%
                </span>
                <div className="w-16 bg-white rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      week.id === 'week1' ? 'bg-blue-500' :
                      week.id === 'week2' ? 'bg-green-500' :
                      week.id === 'week3' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}
                    style={{width: `${getWeekProgress(week.id)}%`}}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <CheckCircle className="mr-2" size={16} />
                  Задачи недели:
                </h3>
                <div className="space-y-2">
                  {week.tasks.map((task, taskIndex) => (
                    <label 
                      key={taskIndex} 
                      className="flex items-start space-x-3 cursor-pointer hover:bg-white/50 p-2 rounded transition-colors"
                    >
                      <button
                        onClick={() => toggleTask(week.id, taskIndex)}
                        className="mt-0.5"
                      >
                        {completedTasks[`${week.id}-${taskIndex}`] ? (
                          <CheckCircle className="text-green-500" size={16} />
                        ) : (
                          <Circle className="text-gray-400" size={16} />
                        )}
                      </button>
                      <span className={`text-sm ${
                        completedTasks[`${week.id}-${taskIndex}`] 
                          ? 'line-through text-gray-500' 
                          : 'text-gray-700'
                      }`}>
                        {task}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <Book className="mr-2" size={16} />
                  Ресурсы для изучения:
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  {week.resources.map((resource, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
        <h2 className="text-xl font-bold text-green-700 mb-3 flex items-center">
          <Award className="mr-2" />
          Итоговые навыки через месяц:
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <ul className="space-y-1">
            <li>✓ Уверенная работа в командной строке</li>
            <li>✓ Администрирование пользователей и прав</li>
            <li>✓ Написание bash-скриптов</li>
            <li>✓ Управление процессами и службами</li>
          </ul>
          <ul className="space-y-1">
            <li>✓ Работа с сетевыми инструментами</li>
            <li>✓ Мониторинг и диагностика системы</li>
            <li>✓ Автоматизация задач через cron</li>
            <li>✓ Понимание архитектуры Linux</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>💡 Совет: уделяйте 1-2 часа ежедневно практике в терминале</p>
        <p>📚 Ведите заметки и создавайте собственную базу команд</p>
      </div>
    </div>
  );
};

export default LinuxLearningTimeline;