// Заглушка для bcrypt

export function compare(data: string, encrypted: string): Promise<boolean> {
  return Promise.resolve(data === encrypted);
}

export function hash(data: string, saltOrRounds: string | number): Promise<string> {
  return Promise.resolve(data);
}