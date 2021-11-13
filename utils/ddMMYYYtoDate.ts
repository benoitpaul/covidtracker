const ddMMYYYYtoDate = (value: string): Date => {
  const parts = value.split("-");
  return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
};

export default ddMMYYYYtoDate;
