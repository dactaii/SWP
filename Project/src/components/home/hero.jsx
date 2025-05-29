import React, { useEffect } from "react";
import banner1 from "../../assets/img/banners/banner1.png";
import banner2 from "../../assets/img/banners/banner2.png";
import banner3 from "../../assets/img/banners/banner3.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Hero = () => {
  useEffect(() => {
    document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
      const carousel = carouselIndicator.closest('.carousel');
      if (!carousel) return;
      const carouselId = carousel.id;
      const items = carousel.querySelectorAll('.carousel-item');
      carouselIndicator.innerHTML = "";

      items.forEach((item, index) => {
        const li = document.createElement('li');
        li.setAttribute('data-bs-target', `#${carouselId}`);
        li.setAttribute('data-bs-slide-to', index.toString());
        if (index === 0) {
          li.classList.add('active'); 
        }
        carouselIndicator.appendChild(li);
      });
    });
  }, []);

  return (
    <section id="hero" className="hero section">
      <div
        id="hero-carousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={banner1} alt="Banner 1" />
            <div className="container">
              <h2>Welcome to DonorPoint</h2>
              <p>Donating blood is a powerful act of kindness. Just one donation can save lives. Join us in spreading love and hope through every drop.</p>
              <a href="#" className="btn-get-started">
                Xem Thêm
              </a>
            </div>
          </div>

          <div className="carousel-item">
            <img src={banner2} alt="Banner 2" />
            <div className="container">
              <h2>A Small Act, A Big Impact</h2>
              <p>Your decision to donate blood today could mean the world to someone tomorrow. Be the silent hero in someone’s story with Medicio.</p>
              <a href="#" className="btn-get-started">
                Xem Thêm
              </a>
            </div>
          </div>

          <div className="carousel-item">
            <img src={banner3} alt="Banner 3" />
            <div className="container">
              <h2>Give Blood – Give Hope</h2>
              <p>Every drop you give brings someone closer to recovery. At Medicio, we walk beside you on this meaningful and compassionate journey.</p>
              <a href="#" className="btn-get-started">
                Xem Thêm
              </a>
            </div>
          </div>
        </div>

        <a
          className="carousel-control-prev"
          href="#hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bi bi-chevron-left"
            aria-hidden="true"
          ></span>
        </a>

        <a
          className="carousel-control-next"
          href="#hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bi bi-chevron-right"
            aria-hidden="true"
          ></span>
        </a>

        <ol className="carousel-indicators"></ol>
      </div>
    </section>
  );
};

export default Hero;
