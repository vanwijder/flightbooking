export function average(args: number[]) {
    return args.reduce((acc, cur) => acc + cur, 0) / args.length || 0
}