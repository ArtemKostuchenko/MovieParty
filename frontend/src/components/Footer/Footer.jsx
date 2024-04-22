import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div class="container">
      <div class="wrapper">
        <footer class="footer">
          <div class="footer__items">
            <div class="footer__item">
              <div class="footer__logo logo">
                <div class="icon logo"></div>
              </div>
              <p class="footer__devis">
                Насолоджуйтеся вашим улюбленим контентом без обмежень!
              </p>
            </div>
            <div class="footer__item">
              <h3 class="footer__title">Контакти</h3>
              <div class="contacts__items">
                <div class="contacts__item">
                  <div class="contact__icon">
                    <div class="icon phone"></div>
                  </div>
                  <div class="contact__title">(380) 687802095</div>
                </div>
                <div class="contacts__item">
                  <div class="contact__icon">
                    <div class="icon email"></div>
                  </div>
                  <div class="contact__title">moviepartyteam@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer__copyright">© All rights reserved, 2024</div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
