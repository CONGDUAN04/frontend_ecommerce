import "../../styles/client/layouts/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* COL */}
        <div className="footer-col">
          <h3>TechZone</h3>

          <p>Hệ thống bán lẻ công nghệ hiện đại, chính hãng toàn quốc.</p>
        </div>

        {/* COL */}
        <div className="footer-col">
          <h4>Hỗ trợ khách hàng</h4>

          <span>Hotline: 1900 9999</span>
          <span>Email: support@techzone.vn</span>
          <span>Hỗ trợ kỹ thuật 24/7</span>
        </div>

        {/* COL */}
        <div className="footer-col">
          <h4>Chính sách</h4>

          <span>Bảo hành</span>
          <span>Đổi trả</span>
          <span>Vận chuyển</span>
          <span>Thanh toán</span>
        </div>

        {/* COL */}
        <div className="footer-col">
          <h4>Kết nối với chúng tôi</h4>

          <span>Facebook</span>
          <span>YouTube</span>
          <span>TikTok</span>
          <span>Zalo</span>
        </div>
      </div>

      <div className="footer-bottom">© 2026 TechZone. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
