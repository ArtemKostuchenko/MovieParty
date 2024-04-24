import React from "react";
// import "./footer.css";

const Footer = () => {
  return (
    <div className="container ftr">
      <div className="wrapper">
        <footer className="footer">
          <div className="footer__items">
            <div className="footer__item">
              <div className="footer__logo logo">
                <div className="icon logo"></div>
              </div>
              <p className="footer__devis">
                Насолоджуйтеся вашим улюбленим контентом без обмежень!
              </p>
            </div>
            <div className="footer__item">
              <h3 className="footer__title">Контакти</h3>
              <div className="contacts__items">
                <div className="contacts__item">
                  <div className="contact__icon">
                    <div className="icon phone"></div>
                  </div>
                  <div className="contact__title">(380) 687802095</div>
                </div>
                <div className="contacts__item">
                  <div className="contact__icon">
                    <div className="icon email"></div>
                  </div>
                  <div className="contact__title">moviepartyteam@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__copyright">© All rights reserved, 2024</div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
