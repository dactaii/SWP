//tách phần nhóm máu để hiển thị dạng list (trang thông tin về máu)
const extractBloodPercentage = (article) => {
  if (!article || !article.content) return article;

  const content = article.content;

  const intro = content.split("Dưới đây là")[0]?.trim() || ""; //chia chuỗi thành 2 phần, lấy phần này làm intro

  const outroMatch = content.match(/Dữ liệu cập nhật.*$/); // lấy phần này làm outro để xác định dữ liệu
  const outro = outroMatch ? outroMatch[0] : "";

  const regex = /(\b[ABO]{1,2}[+-]): (\d+)%/g; // regex để xác định dũ liệu là các nhóm máu: AB+. O-,..
  const bloodTypes = [];
  let match;
  while ((match = regex.exec(content)) !== null) { //duyệt qua các dữ liệu -> giống với regex
    bloodTypes.push({
      type: `Nhóm Máu ${match[1]}`,
      percentage: match[2],
    });
  }

  return {
    ...article,
    intro,
    bloodTypes,
    outro,
  };
};

export default extractBloodPercentage;
