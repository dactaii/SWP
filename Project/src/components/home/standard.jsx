import React from "react";
import Icon from "@mdi/react";
import {
  mdiBadgeAccountHorizontal,
  mdiVirusOutline,
  mdiScaleBathroom,
  mdiNeedleOff,
  mdiDiabetes,
  mdiAccountCheck,
  mdiHeartPulse,
  mdiCalendarMonthOutline,
  mdiTestTube,
} from "@mdi/js";

const standard = [
  {
    icon: <Icon path={mdiBadgeAccountHorizontal} size={1} />,
    text: "Mang theo chứng minh nhân dân/hộ chiếu",
  },
  {
    icon: <Icon path={mdiNeedleOff} size={1} />,
    text: "Không nghiện ma túy, rượu bia và các chất kích thích",
  },
  {
    icon: <Icon path={mdiVirusOutline} size={1} />,
    text:
      "Không mắc hoặc không có các hành vi nguy cơ lây nhiễm HIV, không nhiễm viêm gan B, viêm gan C, và các virus lây qua đường truyền máu",
  },
  {
    icon: <Icon path={mdiScaleBathroom} size={1} />,
    text: "Cân nặng: Nam ≥ 45 kg Nữ ≥ 45 kg",
  },
  {
    icon: <Icon path={mdiHeartPulse} size={1} />,
    text: "Không mắc các bệnh mãn tính hoặc cấp tính về tim mạch, huyết áp, hô hấp, dạ dày…",
  },
  {
    icon: <Icon path={mdiDiabetes} size={1} />,
    text: "Chỉ số huyết sắc tố (Hb) ≥120g/l (≥125g/l nếu hiến từ 350ml trở lên).",
  },
  {
    icon: <Icon path={mdiAccountCheck} size={1} />,
    text: "Người khỏe mạnh trong độ tuổi từ đủ 18 đến 60 tuổi",
  },
  {
    icon: <Icon path={mdiCalendarMonthOutline} size={1} />,
    text: "Thời gian tối thiểu giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ",
  },
  {
    icon: <Icon path={mdiTestTube} size={1} />,
    text: "Kết quả test nhanh âm tính với kháng nguyên bề mặt của siêu vi B",
  },
];

const Standard = () => {
  return (
    <section id="tieuchuan" className="standard section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Tiêu chuẩn tham gia hiến máu</h2>
        <p>
          Để đảm bảo an toàn cho người hiến máu và người nhận máu, cần tuân thủ
          các tiêu chuẩn sau:
        </p>
      </div>

      <div
        className="container grid-container"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {standard.map((item, index) => (
          <div key={index} className="standard-item text-center">
            {item.icon}
            <p className="mt-3">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Standard;
