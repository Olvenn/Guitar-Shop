export const pictureNumber = ((previewImg: string) => {
  const from = previewImg.search('.jpg');
  const to = previewImg.search('-') + 1;
  return previewImg.substring(from, to);
});

export const capitalize = (str: string) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};
