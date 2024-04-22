import React, { useState } from "react";
import { useSelector } from "react-redux";
import FAQItem from "./FAQItem";

const FAQItems = () => {
  const { items } = useSelector((state) => state.faq);

  return (
    <div className="faq__items">
      {items.map((item) => {
        return <FAQItem key={item.id} {...item} />;
      })}
    </div>
  );
};

export default FAQItems;
