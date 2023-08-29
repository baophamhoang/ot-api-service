import zod from 'zod';

export function combineSchemas(...args: zod.ZodObject<any>[]) {
  let result: zod.ZodObject<any> = zod.object({});
  args.forEach((schema) => (result = result.merge(schema)));
  return result;
}
