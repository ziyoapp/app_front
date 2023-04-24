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

export function passwordMinLength(value: any) {
  if (value?.length < 8) {
    return "Минимальное количество символов 8";
  }

  return true;
}

export function isSamePassword(value: string, value2: string) {
  if (value !== value2) {
    return "Пароли не совпадают";
  }

  return true;
}
