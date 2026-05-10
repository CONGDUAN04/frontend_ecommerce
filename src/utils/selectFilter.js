export const universalFilterOption = (input, option) => {
  const text = (option?.label ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

  const keywords = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return keywords.every((k) => text.includes(k));
};
