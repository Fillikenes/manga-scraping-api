export const sleep = (seconds: number) => {
  const MS_TO_SECOND = 1000;
  return new Promise((resolve) => setTimeout(resolve, seconds * MS_TO_SECOND));
};
