export const emailValidate = (value: string): boolean => {
  if (value === undefined || value === null) return false;
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

export function isRequired(value: any) {
  if (!value) {
    return "Обязательно для заполнения";
  }

  return true;
}
