export const DATE_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const TIME_OPTIONS = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

export const DATETIME_OPTIONS = {
  ...DATE_OPTIONS,
  ...TIME_OPTIONS,
};

export function formatDate(dateIso: string, showTime = true) {
  const OPTIONS = showTime ? DATETIME_OPTIONS : DATE_OPTIONS;
  // @ts-ignore
  return new Date(dateIso).toLocaleDateString("en-EN", OPTIONS);
}

export function dateToISO(stringDate: string) {
  return new Date(stringDate).toISOString();
};

export function getAge(stringDate: string) {
  const currentDate = new Date();
  const birthDate = new Date(stringDate);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();

  let age = currentYear - birthYear;
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }

  return age;
}
