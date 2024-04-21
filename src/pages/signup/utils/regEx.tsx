export function emailValidation(email: string) {
  const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regEx.test(email);
}

export function nameRegex(name: string) {
  const regEx = /^[a-zA-ZÀ-ÿ\u00C0-\u00FF\s']+$/;
  return regEx.test(name);
}

export function passwordRegex(password: string) {
  const regEx = /^.{6,}$/;
  return regEx.test(password);
}
