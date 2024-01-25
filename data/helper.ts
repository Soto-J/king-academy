export const getAge = (birthDate: string) => {
  const today = new Date();
  const date = new Date(birthDate);

  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--;
  }

  return age;
};

export const capitalize = (word: string | null) => {
  if (!word) return "";

  if (word.includes(" ")) {
    return word
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  return word[0].toUpperCase() + word.slice(1);
};
