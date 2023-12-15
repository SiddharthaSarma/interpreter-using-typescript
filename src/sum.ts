export function sum(...args: number[]) {
  return args.reduce((acc, val) => acc += val, 0);
}