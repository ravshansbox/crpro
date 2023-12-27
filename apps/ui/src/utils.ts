const isValidClass = (value: unknown): value is string => {
  return typeof value === 'string' && value !== '';
};

export const classNames = (
  ...classes: (string | boolean | null | undefined)[]
) => {
  return classes.filter(isValidClass).join(' ');
};
