import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Facebook,
  Youtube,
  MessageSquare,
} from "lucide-react";
import "../../styles/client/layouts/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-trust-badges">
        <div className="trust-badges-container">
          <div className="badge-card">
            <div className="badge-icon-box">
              <ShieldCheck size={22} />
            </div>
            <div className="badge-info">
              <h5>Chính hãng 100%</h5>
              <p>Cam kết chất lượng cao cấp</p>
            </div>
          </div>
          <div className="badge-card">
            <div className="badge-icon-box">
              <Truck size={22} />
            </div>
            <div className="badge-info">
              <h5>Vận chuyển siêu tốc</h5>
              <p>Giao nội thành trong 2h</p>
            </div>
          </div>
          <div className="badge-card">
            <div className="badge-icon-box">
              <RotateCcw size={22} />
            </div>
            <div className="badge-info">
              <h5>Đổi trả dễ dàng</h5>
              <p>1 đổi 1 trong 30 ngày</p>
            </div>
          </div>
          <div className="badge-card">
            <div className="badge-icon-box">
              <CreditCard size={22} />
            </div>
            <div className="badge-info">
              <h5>Trả góp 0%</h5>
              <p>Hỗ trợ mọi thủ tục online</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-col">
          <h4>Tổng đài hỗ trợ miễn phí</h4>
          <ul className="cps-contact-list">
            <li>
              Tư vấn mua hàng:{" "}
              <a href="tel:19009999" className="highlight-red">
                1900.9999
              </a>
            </li>
            <li>
              Hỗ trợ kỹ thuật:{" "}
              <a href="tel:19008888" className="highlight-red">
                1900.8888
              </a>
            </li>
            <li>
              Góp ý, khiếu nại:{" "}
              <a href="mailto:support@techzone.vn">support@techzone.vn</a>
            </li>
          </ul>

          <div className="mt-24">
            <h4>Kết nối với chúng tôi</h4>
            <div className="cps-social-logos">
              <a
                href="https://www.facebook.com/duan.pham.7965692?locale=vi_VN"
                className="social-icon fb-color"
              >
                <Facebook size={14} /> Facebook
              </a>
              <a
                href="https://www.youtube.com/@DuannnPhamCong"
                className="social-icon yt-color"
              >
                <Youtube size={14} /> YouTube
              </a>
              <a
                href="https://zalo.me/0974265824"
                className="social-icon zl-color"
              >
                <MessageSquare size={14} /> Zalo
              </a>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h4>Thông tin và chính sách</h4>
          <ul className="cps-links-list">
            <li>
              <a href="#baohanh">Chính sách bảo hành đổi trả</a>
            </li>
            <li>
              <a href="#vanchuyen">Chính sách giao hàng toàn quốc</a>
            </li>
            <li>
              <a href="#thanhtoan">Hướng dẫn thanh toán online</a>
            </li>
            <li>
              <a href="#baomat">Chính sách bảo mật thông tin</a>
            </li>
          </ul>
        </div>

        {/* CỘT 3: TIỆN ÍCH */}
        <div className="footer-col">
          <h4>Dịch vụ và tiện ích</h4>
          <ul className="cps-links-list">
            <li>
              <a href="#tragop">Mua trả góp qua thẻ tín dụng</a>
            </li>
            <li>
              <a href="#smember">Chương trình TechMember</a>
            </li>
            <li>
              <a href="#hoadon">Tra cứu hóa đơn điện tử VAT</a>
            </li>
            <li>
              <a href="#trungtam">Trung tâm bảo hành ủy quyền</a>
            </li>
          </ul>
        </div>

        <div className="footer-col brand-summary-col">
          <h3 className="brand-logo-text">
            Tech<span>Zone</span>
          </h3>
          <p>
            Hệ thống bán lẻ công nghệ hiện đại, chính hãng toàn quốc. Nơi mang
            đến sản phẩm chất lượng cao và dịch vụ hậu mãi tốt nhất thị trường.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <span>
            © 2026 TechZone. All rights reserved. Powered by CellphoneS Style.
          </span>
          <div className="footer-bottom-links">
            <a href="#privacy">Chính sách bảo mật</a>
            <a href="#terms">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
