export function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function formateISODate(date: string): string {
  return new Date(date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
}

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
};
