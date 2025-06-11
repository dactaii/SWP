const splitText = (text) => {
  return text
  // regex: ".", "?", "!", s+: khoảng trắng
    .split(/(?<=[.?!])\s+/)
    .filter((sentence) => sentence.trim() !== "");
};

export default splitText;
