export const parseColor = (color) => {
  return `rgba(${color.red}, ${color.green}, ${color.blue}, ${
    color.alpha !== undefined ? color.alpha : 1.0
  })`;
};
