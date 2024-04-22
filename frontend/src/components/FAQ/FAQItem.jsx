import React from "react";
import { useDispatch } from "react-redux";
import { toggleFAQ } from "../../features/store/slices/faq";

const FAQItem = ({ id, title, description, isOpen }) => {
  const dispatch = useDispatch();

  return (
    <div className={`faq__item ${isOpen ? "active" : ""}`}>
      <div className="faq__item-action" onClick={() => dispatch(toggleFAQ(id))}>
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
