import React from "react";

const FAQItem = ({ id, title, description, isOpen, toggleItem }) => {
  return (
    <div className={`faq__item ${isOpen ? "active" : ""}`}>
      <div className="faq__item-action" onClick={() => toggleItem(id)}>
        <h3 className="faq__item-title">{title}</h3>
        <div className="faq__item-plus">
          <div className="icon plus"></div>
        </div>
      </div>
      <div className="faq__item-hide">
        <p className="faq__item-description">{description}</p>
      </div>
    </div>
  );
};

export default FAQItem;
