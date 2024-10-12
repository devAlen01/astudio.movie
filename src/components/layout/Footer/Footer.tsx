import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import scss from "./Footer.module.scss";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={scss.Footer}>
      <div className={scss.line}></div>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.media_icons}>
            <a href="https://www.instagram.com/x.seven___/" target="blank">
              <FaInstagram />
            </a>
            <a href="http://t.me/alenx10" target="blank">
              <FaTelegram />
            </a>
            <a href="https://wa.me/+996700067684" target="blank">
              <FaWhatsapp />
            </a>
          </div>
          <div className={scss.text}>
            <p>© 2024 «A&#xB7;STIUDO» Разработано с любовью</p>
            <span>
              <FaHeart />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
