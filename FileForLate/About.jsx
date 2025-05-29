import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import banner3 from "../../assets/img/banners/banner3.png";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    const lightbox = GLightbox({
    selector: '.glightbox',
  });
  }, []);

  return (
    <section id="gioithieu" className="about section">
      <div className="about-title container section-title" data-aos="fade-up">
        <h2>Giới Thiệu</h2>
        <p>
          Chúng tôi là đơn vị tiên phong trong lĩnh vực tiếp nhận và điều phối
          máu, hướng tới cộng đồng nhân ái và khỏe mạnh.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          <div
            className="col-lg-6 position-relative align-self-start"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src={banner3}
              className="img-fluid"
              alt="Giới thiệu cơ sở y tế"
            />
            <a
              href="https://www.youtube.com/watch?v=EPw5UBXIycE"
              className="glightbox pulsating-play-btn"
            >
              <i
                className="bi bi-play-circle-fill btn-video"
              ></i>
            </a>
          </div>

          <div
            className="col-lg-6 content"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3>Đồng hành cùng cộng đồng trong mỗi giọt máu cho đi.</h3>
            <p className="fst-italic">
              Cơ sở y tế chúng tôi không chỉ tiếp nhận máu mà còn kết nối trái
              tim giữa người hiến và người cần.
            </p>
            <ul>
              <li>
                <i className="bi bi-check2-all"></i>{" "}
                <span>Tiếp nhận và phân phối máu an toàn, chính xác.</span>
              </li>
              <li>
                <i className="bi bi-check2-all"></i>{" "}
                <span>Hợp tác với nhiều đơn vị, tổ chức trên toàn quốc.</span>
              </li>
              <li>
                <i className="bi bi-check2-all"></i>{" "}
                <span>Luôn sẵn sàng hỗ trợ cấp cứu, truyền máu khẩn cấp.</span>
              </li>
            </ul>
            <p>
              Chúng tôi cam kết mang đến dịch vụ chuyên nghiệp, tận tâm và kịp
              thời, với mục tiêu giúp đỡ người bệnh có cơ hội sống.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
