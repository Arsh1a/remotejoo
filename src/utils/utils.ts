export const toFarsiNumber = (n: string | number) => {
  const farsiDigits: string[] = [
    "۰",
    "۱",
    "۲",
    "۳",
    "۴",
    "۵",
    "۶",
    "۷",
    "۸",
    "۹",
  ];

  return n.toString().replace(/\d/g, (x: any) => farsiDigits[x]);
};

export const convertSpacesToHyphens = (str: string) => {
  return str.replace(/\s+/g, "-");
};

export const passedDays = (days: number) => {
  return days === -1
    ? null
    : days === 0
    ? "امروز"
    : days === 1
    ? "دیروز"
    : `${toFarsiNumber(days)} روز پیش`;
};

export const convertISODateToPersianDate = (date: string) => {
  let d = new Date(date);

  return d.toLocaleDateString("fa-IR");
};

export const fileToDataUri = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target!.result);
    };
    reader.readAsDataURL(file);
  });

// export const removeEmptyFields = (object: object) => {
//   return Object.fromEntries(
//     Object.entries(object).filter(
//       ([_, v]) => v !== null && v !== "" && v !== undefined
//     )
//   );
// };

export const removeEmptyFields = <T>(object: T): T => {
  const entries = Object.entries(object as { [key: string]: any }).filter(
    ([_, v]) => v !== null && v !== "" && v !== undefined
  );

  return Object.fromEntries(entries) as T;
};

export const truncateString = (string: string, limit: number) =>
  string.length > limit ? `${string.substring(0, limit)}...` : string;
