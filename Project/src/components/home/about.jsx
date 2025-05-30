import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import banner3 from "../../assets/img/banners/banner3.png";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    const lightbox = GLightbox({
      selector: ".glightbox",
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
              <i className="bi bi-play-circle-fill btn-video"></i>
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

        <div className="accordion mt-5" id="aboutAccordion" data-aos="fade-up">
          <div className="accordion-item">
            <h2 className="accordion-header" id="featureHeading">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#featureCollapse"
              >
                Chức năng nổi bật
              </button>
            </h2>
            <div
              id="featureCollapse"
              className="accordion-collapse collapse show"
              data-bs-parent="#aboutAccordion"
            >
              <div className="accordion-body">
                <ul className="mb-0">
                  <li>
                    <Link to="/bloodtype" className="underline-important">
                      <strong>Kiến thức về máu</strong>
                    </Link>{" "}
                    giúp bạn hiểu nhanh về các nhóm và thành phần máu.
                  </li>
                  <li>
                    <Link to="/dangkyhienmau" className="underline-important">
                      <strong>Đăng ký hiến máu</strong>
                    </Link>{" "}
                    để chọn nhóm máu và thời gian bạn sẵn sàng hiến.
                  </li>
                  <li>
                    <Link to="/dangkytimnmau" className="underline-important">
                      <strong>Đăng ký tìm máu</strong>
                    </Link>{" "}
                    cho người cần máu đăng ký yêu cầu nhanh chóng.
                  </li>
                  <li>
                    <Link to="/tracuu" className="underline-important">
                      <strong>Tra cứu nhóm máu phù hợp</strong>
                    </Link>{" "}
                    giúp tìm nhóm và thành phần máu cần thiết.
                  </li>
                  <li>
                    <Link to="/timnguoiHM" className="underline-important">
                      <strong>Tìm người hiến máu gần bạn</strong>
                    </Link>{" "}
                    kết nối bạn với người hiến máu gần nhất.
                  </li>
                  <li>
                    <Link to="/timnguoiCM" className="underline-important">
                      <strong>Tìm người cần máu</strong>
                    </Link>{" "}
                    giúp người hiến dễ tìm người cần máu quanh đây.
                  </li>
                  <li>
                    <Link to="/DKmauKC" className="underline-important">
                      <strong>Đăng ký hiến máu khẩn cấp</strong>
                    </Link>{" "}
                    khi cơ sở y tế cần hỗ trợ đăng ký ngay các trường hợp cấp cứu.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="accordion-item mt-3">
            <h2 className="accordion-header" id="benefitHeading">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#benefitCollapse"
              >
                Lợi ích khi sử dụng hệ thống
              </button>
            </h2>
            <div
              id="benefitCollapse"
              className="accordion-collapse collapse"
              data-bs-parent="#aboutAccordion"
            >
              <div className="accordion-body">
                <ul className="mb-0">
                  <li>Rút ngắn thời gian tìm người hiến máu phù hợp.</li>
                  <li>
                    Gợi ý người hiến phù hợp theo tiêu chí nhóm máu và vị trí
                    địa lý.
                  </li>
                  <li>Kết nối mạng lưới những người sẵn sàng giúp đỡ.</li>
                  <li>
                    Cơ sở y tế có thể theo dõi toàn bộ quá trình từ lúc tiếp
                    nhận đến lúc hoàn tất hiến máu.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
