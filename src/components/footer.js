import React, { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <div>

                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="footer-col">
                                <h4>Website</h4>
                                <ul>
                                    <li><a href="#">giới thiệu</a></li>
                                    <li><a href="#">các dịch vụ</a></li>
                                    <li><a href="#">chính sách</a></li>
                                    <li><a href="#">Liên hệ</a></li>
                                </ul>
                            </div>
                            <div className="footer-col">
                                <h4>Trợ giúp</h4>
                                <ul>
                                    <li><a href="#">FAQ</a></li>
                                    <li><a href="#">hướng dẫn</a></li>
                                    <li><a href="#">đăng kí</a></li>
                                    <li><a href="#">Llựa chọn món ăn</a></li>
                                    <li><a href="#">Lựa chọn thanh toán</a></li>
                                </ul>
                            </div>
                            <div className="footer-col">
                                <h4>Menu SangOrder</h4>
                                <ul>
                                    <li><a href="#">thức ăn chính</a></li>
                                    <li><a href="#">ăn vặt/ăn nhanh</a></li>
                                    <li><a href="#">healthy</a></li>
                                    <li><a href="#">đồ uống</a></li>
                                </ul>
                            </div>
                            <div className="footer-col">
                                <h4>follow us</h4>
                                <div className="social-links">
                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}