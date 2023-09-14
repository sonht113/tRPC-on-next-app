export const hasItemInList = <Type = unknown>(item: Type, list: Type[]) =>
  new Set(list).has(item);
