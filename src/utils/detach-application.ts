import { Type } from '@nestjs/common';

export function detachApplication<T extends Type[]>(apis: T) {
  const endpoints = apis.filter((x) => x.name.endsWith('Endpoint')) as T;
  const handlers = apis.filter((x) => x.name.endsWith('Handler')) as T;
  return { endpoints, handlers };
}
