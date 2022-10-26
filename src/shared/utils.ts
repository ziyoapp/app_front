import { alertController } from "@ionic/vue";

function cleanPhone(phone: string | number): string {
  return String(phone).replace(/-/g, "").replace("+", "");
}

function catchError(error: any, errorType: any) {
  let description;
  const status = error.response?.status;
  const errorsList = error.response?.data?.errors;
  const errorKeys = errorsList ? Object.keys(errorsList) : [];

  if (!errorKeys?.length) {
    description = error.response.data.error;
  } else {
    description = errorsList[errorKeys[0]][0];
  }

  throw new errorType(status, description);
}

async function showError(errorText: string): Promise<any> {
  const errorAlert = await alertController.create({
    header: "Ошибка!",
    message: errorText || "",
    buttons: ["OK"],
  });
  await errorAlert.present();
}

function isRequired(value: any) {
  if (!value) {
    return "Обязательно для заполнения";
  }

  return true;
}

function positiveNumbers(value: any) {
  if (!value || parseInt(value) < 0) {
    return "Только положительные числа или 0";
  }
  return true;
}

export { cleanPhone, catchError, showError, isRequired, positiveNumbers };
