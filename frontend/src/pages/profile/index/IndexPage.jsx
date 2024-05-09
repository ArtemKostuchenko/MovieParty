import React from "react";
import "./style.page.scss";

const IndexPage = () => {
  return (
    <>
      <div className="profile-user-content-title">Профіль</div>
      <div className="profile-user-content-container">
        <div className="profile-user-content-container-title">
          Загальна інформація
        </div>
        <div className="user-info">
          <div className="user-info-items">
            <div className="user-info-item">
              <div className="user-info-title">Нікнейм</div>
              <div className="user-info-desc">Qwerty</div>
            </div>
            <div className="user-info-item">
              <div className="user-info-title">Країна</div>
              <div className="user-info-desc">
                <img
                  src="../images/icons/us.svg"
                  className="country-icon"
                  alt="США"
                />
                США
              </div>
            </div>
            <div className="user-info-item">
              <div className="user-info-title">Останній вхід</div>
              <div className="user-info-desc">30 хв тому</div>
            </div>
            <div className="user-info-item">
              <div className="user-info-title">Зареєстрований</div>
              <div className="user-info-desc">2 місяці тому</div>
            </div>
            <div className="user-info-item">
              <div className="user-info-title">Збереженого контенту</div>
              <div className="user-info-desc">6</div>
            </div>
            <div className="user-info-item">
              <div className="user-info-title">Переглянутого контенту</div>
              <div className="user-info-desc">30 хв</div>
            </div>
            <div className="user-info-item">
              <div className="user-info-title">Створено вечірок</div>
              <div className="user-info-desc">2</div>
            </div>
            <div className="user-info-item">
              <div className="user-info-title">Відвідано вечірок</div>
              <div className="user-info-desc">5</div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-user-content-container">
        <div className="profile-user-content-container-title">
          Популярні коментарі
        </div>
        <div className="user-comments">
          <div className="user-comments-items">
            <div className="user-comments-item">
              <div className="comment">
                <a href="#" className="comment-content-image">
                  <img
                    src="../images/comment.jpg"
                    alt="Зоряні війни: Епізод VIII - Останні джедаї"
                  />
                </a>
                <div className="comment-content-info">
                  <div className="comment-content-owner">
                    <div className="comment-content-user">
                      <img src="../images/avatar.png" alt="Qwerty" />
                      <div className="comment-content-user-nickname">
                        Qwerty
                      </div>
                    </div>
                    <div className="icon shift" />
                    <div className="comment-content-date">06.03.2024</div>
                    <div className="icon shift" />
                    <a href="#" className="comment-content-ref">
                      Зоряні війни: Епізод VIII - Останні джедаї
                    </a>
                  </div>
                  <div className="comment-content-message">
                    Епічне продовження франшизи, яке вражає як візуально, так і
                    сюжетно
                  </div>
                  <div className="comment-content-reactions">
                    <div className="comment-reactions">
                      <div className="comment__likes">
                        <button className="button icon i t">
                          <div className="icon like" />
                        </button>
                        <div className="comment-reactions-count">4</div>
                      </div>
                      <div className="comment__dislikes">
                        <button className="button icon i t">
                          <div className="icon dislike" />
                        </button>
                        <div className="comment-reactions-count">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-comments-item">
              <div className="comment">
                <a href="#" className="comment-content-image">
                  <img
                    src="../images/comment.jpg"
                    alt="Зоряні війни: Епізод VIII - Останні джедаї"
                  />
                </a>
                <div className="comment-content-info">
                  <div className="comment-content-owner">
                    <div className="comment-content-user">
                      <img src="../images/avatar.png" alt="Qwerty" />
                      <div className="comment-content-user-nickname">
                        Qwerty
                      </div>
                    </div>
                    <div className="icon shift" />
                    <div className="comment-content-date">06.03.2024</div>
                    <div className="icon shift" />
                    <a href="#" className="comment-content-ref">
                      Зоряні війни: Епізод VIII - Останні джедаї
                    </a>
                  </div>
                  <div className="comment-content-message">
                    Епічне продовження франшизи, яке вражає як візуально, так і
                    сюжетно
                  </div>
                  <div className="comment-content-reactions">
                    <div className="comment-reactions">
                      <div className="comment__likes">
                        <button className="button icon i t">
                          <div className="icon like" />
                        </button>
                        <div className="comment-reactions-count">4</div>
                      </div>
                      <div className="comment__dislikes">
                        <button className="button icon i t">
                          <div className="icon dislike" />
                        </button>
                        <div className="comment-reactions-count">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-comments-item">
              <div className="comment">
                <a href="#" className="comment-content-image">
                  <img
                    src="../images/comment.jpg"
                    alt="Зоряні війни: Епізод VIII - Останні джедаї"
                  />
                </a>
                <div className="comment-content-info">
                  <div className="comment-content-owner">
                    <div className="comment-content-user">
                      <img src="../images/avatar.png" alt="Qwerty" />
                      <div className="comment-content-user-nickname">
                        Qwerty
                      </div>
                    </div>
                    <div className="icon shift" />
                    <div className="comment-content-date">06.03.2024</div>
                    <div className="icon shift" />
                    <a href="#" className="comment-content-ref">
                      Зоряні війни: Епізод VIII - Останні джедаї
                    </a>
                  </div>
                  <div className="comment-content-message">
                    Епічне продовження франшизи, яке вражає як візуально, так і
                    сюжетно
                  </div>
                  <div className="comment-content-reactions">
                    <div className="comment-reactions">
                      <div className="comment__likes">
                        <button className="button icon i t">
                          <div className="icon like" />
                        </button>
                        <div className="comment-reactions-count">4</div>
                      </div>
                      <div className="comment__dislikes">
                        <button className="button icon i t">
                          <div className="icon dislike" />
                        </button>
                        <div className="comment-reactions-count">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-comments-item">
              <div className="comment">
                <a href="#" className="comment-content-image">
                  <img
                    src="../images/comment.jpg"
                    alt="Зоряні війни: Епізод VIII - Останні джедаї"
                  />
                </a>
                <div className="comment-content-info">
                  <div className="comment-content-owner">
                    <div className="comment-content-user">
                      <img src="../images/avatar.png" alt="Qwerty" />
                      <div className="comment-content-user-nickname">
                        Qwerty
                      </div>
                    </div>
                    <div className="icon shift" />
                    <div className="comment-content-date">06.03.2024</div>
                    <div className="icon shift" />
                    <a href="#" className="comment-content-ref">
                      Зоряні війни: Епізод VIII - Останні джедаї
                    </a>
                  </div>
                  <div className="comment-content-message">
                    Епічне продовження франшизи, яке вражає як візуально, так і
                    сюжетно
                  </div>
                  <div className="comment-content-reactions">
                    <div className="comment-reactions">
                      <div className="comment__likes">
                        <button className="button icon i t">
                          <div className="icon like" />
                        </button>
                        <div className="comment-reactions-count">4</div>
                      </div>
                      <div className="comment__dislikes">
                        <button className="button icon i t">
                          <div className="icon dislike" />
                        </button>
                        <div className="comment-reactions-count">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
