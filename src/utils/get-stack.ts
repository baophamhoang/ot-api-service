export const getStack = (err: Error) => (err && err.stack ? err.stack.split('\n').map((s) => s.trim()) : []);
