import React from "react";

const TypeOfBlood = () => {
  const bloodTypes = [
    { type: "Nhóm Máu O+", percentage: 36 },
    { type: "Nhóm Máu O-", percentage: 14 },
    { type: "Nhóm Máu A+", percentage: 28 },
    { type: "Nhóm Máu A-", percentage: 8 },
    { type: "Nhóm Máu B+", percentage: 8 },
    { type: "Nhóm Máu B-", percentage: 3 },
    { type: "Nhóm Máu AB+", percentage: 2 },
    { type: "Nhóm Máu AB-", percentage: 1 },
  ];

  const bloodCards = [
    {
      img: "https://via.placeholder.com/150", // thay bằng link ảnh thật nếu có
      title: "Nhóm máu O+",
      description: "O+ là nhóm máu phổ biến nhất.",
      link: "#",
    },
    {
      img: "https://via.placeholder.com/150",
      title: "Nhóm máu O-",
      description: "O- là nhóm máu có thể hiến cho mọi người.",
      link: "#",
    },
    {
      img: "https://via.placeholder.com/150",
      title: "Nhóm máu A+",
      description: "A+ là nhóm máu phổ biến thứ hai.",
      link: "#",
    },
    {
      img: "https://via.placeholder.com/150",
      title: "Nhóm máu A-",
      description: "A- phù hợp với A- và AB-.",
      link: "#",
    },
    {
      img: "https://via.placeholder.com/150",
      title: "Nhóm máu B+",
      description: "B+ có thể nhận từ O+ và B+.",
      link: "#",
    },
    {
      img: "https://via.placeholder.com/150",
      title: "Nhóm máu B-",
      description: "Hiếm, chỉ chiếm 3% dân số.",
      link: "#",
    },
    {
      img: "https://via.placeholder.com/150",
      title: "Nhóm máu AB+",
      description: "AB+ là người nhận phổ quát.",
      link: "#",
    },
    {
      img: "https://via.placeholder.com/150",
      title: "Nhóm máu AB-",
      description: "AB- là nhóm máu hiếm nhất.",
      link: "#",
    },
    {
      img: "https://via.placeholder.com/150",
      title: "Nhóm máu Hiếm",
      description: "Điều gì làm cho một nhóm máu trở nên hiếm?",
      link: "#",
    },
  ];

  return (
    <section>
      <h2>Nhóm máu</h2>
      <h3>Tìm hiểu nhóm máu của bạn</h3>
      <p>Bạn sẽ biết nhóm máu của mình sau lần hiến máu đầu tiên.</p>

      <h3>Nhóm máu nào là hiếm nhất?</h3>
      <p>
        Có 8 nhóm máu chính, nhưng một số nhóm hiếm hơn những nhóm khác. Dưới
        đây là tỷ lệ phần trăm người hiến máu theo từng nhóm:
      </p>

      <ul>
        {bloodTypes.map((item, index) => (
          <li key={index}>
            <strong>{item.type}</strong>: {item.percentage}%
          </li>
        ))}
      </ul>

      <p>
        Dữ liệu cập nhật đến tháng 2 năm 2025. Các con số phần trăm đã được làm
        tròn.
      </p>

      <h3>Về các nhóm máu</h3>
      <p>Tìm hiểu thêm về nhóm máu của bạn.</p>

      <div className="blood-grid">
        {bloodCards.map((card, index) => (
          <div className="card" key={index}>
            <div className="card_image">
              <img src={card.img} alt={card.title} />
            </div>
            <div className="card_body">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <span className="btn">Tìm hiểu về {card.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TypeOfBlood;
