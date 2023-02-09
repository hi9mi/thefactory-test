export function debounce<A = unknown, R = void>(
  fn: (...args: A[]) => R,
  ms = 300
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  function debouncedFn(...args: A[]) {
    new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        //@ts-expect-error
        resolve(fn.apply(this, args));
      }, ms);
    });
  }

  const teardown = () => clearTimeout(timeoutId);

  return [debouncedFn, teardown] as const;
}
