const splitText = (text) => {
  if (typeof text !== "string") return [];

  return text
    .split(/(?<=[.?!])\s+/)
    .filter((sentence) => sentence.trim() !== "");
};

export default splitText;
