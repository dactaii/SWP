import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logos/logo.png';

const Footer =() => {
    return(
        <>
    <footer className="footer light-background">
        <div className="container footer-top">
            <div className="row gy-4">
                <div className="col-lg-5 col-md-5 footer-about">
                    <Link to="/" className="logo d-flex align-items-center" >
                        <img src={logo} alt="Logo" />
                    </Link>
                    <div className="footer-contact pt-3">
                        <p>123, Đường 4, Quận 5</p>
                        <p>Thành Phố ABC</p>
                        <p className="mt-3"><strong>Phone:</strong> <span>+84 123 456 789</span></p>
                        <p><strong>Email:</strong> <span>info@example.com</span></p>
                    </div>
                    <div className="social-links d-flex mt-4">
                        <a href="#"><i className="bi bi-whatsapp"></i></a>
                        <a href="#"><i className="bi bi-facebook"></i></a>
                        <a href="#"><i className="bi bi-instagram"></i></a>
                        <a href="#"><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>

                <div className="col-lg-4 col-md-3 footer-links">
                    <h4>Links</h4>
                    <ul>
                        <li> <a href="#trangchu">Trang Chủ</a></li>
                        <li> <a href="#gioithieu">Giới Thiệu</a></li>
                        <li> <a href="#">Dịch vụ</a></li>
                        <li> <a href="#">Điều Khoản Dịch Vụ</a></li>
                        <li> <a href="#">Chính sách bảo mật</a></li>
                    </ul>
                </div>

                <div className="col-lg-3 col-md-4 footer-links">
                    <h4>Dịch vụ khác</h4>
                    <ul>
                        <li><a href="#tracuu">Tra cứu nhóm máu phù hợp</a></li>
                        <li><a href="#dangky">Đăng lý hiến máu</a></li>
                        <li><a href="#timnguoihienmau">Tìm người hiến máu gần bạn</a></li>
                        <li><a href="#timnguoicanmau">Tìm người cần máu</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </>
    );
}
export default Footer;