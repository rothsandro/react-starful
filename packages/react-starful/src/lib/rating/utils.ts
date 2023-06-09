/**
 * Merges class names together
 * @param classes The class names to merge.
 * @returns The merged class names.
 */
export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function assert(condition?: unknown, message?: string): asserts condition {
  if (!condition) throw new Error(message);
}
