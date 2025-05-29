import React from "react";
import oposi from "../../assets/img/icons/oposi.png";
import onega from "../../assets/img/icons/onega.png";
import aposi from "../../assets/img/icons/aposi.png";
import anega from "../../assets/img/icons/anega.png";
import bposi from "../../assets/img/icons/bposi.png";
import bnega from "../../assets/img/icons/bnega.png";
import abposi from "../../assets/img/icons/abposi.png";
import abnega from "../../assets/img/icons/abnega.png";
import rareblood from "../../assets/img/icons/rareblood.png";
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
      img: oposi,
      title: "Nhóm máu O+",
      description: "O+ là nhóm máu phổ biến nhất.",
      link: "#",
    },
    {
      img: onega,
      title: "Nhóm máu O-",
      description: "O- là nhóm máu có thể hiến cho mọi người.",
      link: "#",
    },
    {
      img: aposi,
      title: "Nhóm máu A+",
      description: "A+ là nhóm máu phổ biến thứ hai.",
      link: "#",
    },
    {
      img: anega,
      title: "Nhóm máu A-",
      description: "A- phù hợp với A- và AB-.",
      link: "#",
    },
    {
      img: bposi,
      title: "Nhóm máu B+",
      description: "B+ có thể nhận từ O+ và B+.",
      link: "#",
    },
    {
      img: bnega,
      title: "Nhóm máu B-",
      description: "Hiếm, chỉ chiếm 3% dân số.",
      link: "#",
    },
    {
      img: abposi,
      title: "Nhóm máu AB+",
      description: "AB+ là người nhận phổ quát.",
      link: "#",
    },
    {
      img: abnega,
      title: "Nhóm máu AB-",
      description: "AB- là nhóm máu hiếm nhất.",
      link: "#",
    },
    {
      img: rareblood,
      title: "Nhóm máu Hiếm",
      description: "Điều gì làm cho một nhóm máu trở nên hiếm?",
      link: "#",
    },
  ];

  return (
    <section className="blood-section">
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
              <h4>{card.title}</h4>
              <p>{card.description}</p>
              <span className="btn">
                <i
                  className="bi bi-arrow-right-circle-fill"
                  style={{ marginRight: "6px" }}
                ></i>
                Tìm hiểu về {card.title}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h3>Các nhóm máu nào tương thích?</h3>
      <p>Bạn có thể nhận máu từ người hiến có cùng nhóm máu với bạn.</p>
      <p>Bạn cũng có thể nhận máu từ người hiến có nhóm máu tương thích.</p>
      <p>
        Tương tự, một người có nhóm máu khác bạn vẫn có thể an toàn khi nhận máu
        từ bạn nếu nhóm máu của bạn tương thích với họ.
      </p>
      <p>
        Nhóm máu O âm tính được gọi là nhóm máu phổ quát vì hồng cầu O âm tính
        có thể truyền an toàn cho tất cả mọi người, bất kể nhóm máu của người
        nhận.
      </p>

      <h3>Nhóm máu hoạt động như thế nào?</h3>
      <p>Nhóm máu của bạn được thừa hưởng từ gen do cha mẹ bạn truyền lại.</p>
      <p>
        Hai hệ thống nhóm máu quan trọng nhất trong truyền máu là hệ thống ABO
        và hệ thống Rh.
      </p>
      <p>
        Hệ thống nhóm máu ABO quy định phần chữ cái trong nhóm máu của bạn (A,
        B, AB hoặc O), còn hệ thống Rh quy định phần dương (+) hoặc âm (−) của
        nhóm máu.
      </p>

      <h3>Hệ thống nhóm máu ABO</h3>
      <p>Trong hệ thống nhóm máu ABO, có bốn nhóm máu chính.</p>
      <p>
        Mỗi nhóm đều quan trọng và chúng ta cần người hiến máu từ tất cả các
        nhóm để đảm bảo có đủ loại máu phù hợp cho những người cần.
      </p>
      <p>
        Nhóm máu của bạn phụ thuộc vào các kháng nguyên và kháng thể có trong
        máu.
      </p>
      <p>
        <strong>Kháng nguyên</strong> là sự kết hợp giữa đường và protein nằm
        trên bề mặt của hồng cầu.
      </p>
      <p>Tùy theo sự kết hợp này, bạn sẽ có một trong các dạng sau:</p>
      <ul>
        <li>Không có kháng nguyên nào</li>
        <li>Kháng nguyên A</li>
        <li>Kháng nguyên B</li>
        <li>Cả kháng nguyên A và B</li>
      </ul>
      <p>
        Bạn cũng có <strong>kháng thể</strong> trong phần huyết tương — là phần
        chất lỏng trong suốt của máu.
      </p>
      <p>
        Kháng thể đóng vai trò quan trọng trong truyền máu vì chúng là một phần
        của hệ thống phòng thủ tự nhiên của cơ thể. Chúng nhận diện bất kỳ kháng
        nguyên "lạ" nào và kích hoạt hệ miễn dịch để tiêu diệt chúng.
      </p>
      <p>
        Đó là lý do tại sao truyền máu sai nhóm trong hệ thống ABO có thể gây
        nguy hiểm đến tính mạng.
      </p>
      <p>
        Chính sự hiện diện của kháng nguyên A và B, cùng với các kháng thể tương
        ứng, quyết định nhóm máu ABO của bạn.
      </p>
    </section>
  );
};

export default TypeOfBlood;
