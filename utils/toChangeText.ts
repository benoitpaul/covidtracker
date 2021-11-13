const toChangeText = (change: number): string => {
  const sign = change > 0 ? "+" : "";
  return `${sign} ${change.toLocaleString()}`;
};

export default toChangeText;
