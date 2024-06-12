import React from "react";

const SendResetPasswordPage = () => {
  return (
    <div className="grid__info">
      <div className="container h100">
        <div className="wrapper flex center h100">
          <div className="info">
            <h1 className="info__title">Очікуємо підтвердження</h1>
            <p className="info__description">
              Якщо обліковий запис, який відповідає вашій електронній пошті,
              існує, це означає, що щойно надіслано електронний лист із
              посиланням, за яким можна скинути пароль. Термін дії цього
              посилання закінчиться через 1 годину. Якщо ви не отримали
              електронний лист, перевірте папку зі спамом або спробуйте знову.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendResetPasswordPage;
