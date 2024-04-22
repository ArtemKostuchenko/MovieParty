import React, { useState } from "react";
import FAQItem from "./FAQItem";

const data = [
  {
    id: 1,
    title: "Що таке MovieParty?",
    description:
      "MovieParty - це ваш особистий кінотеатр у власному домі! Це інноваційна веб-платформа, яка дозволяє користувачам насолоджуватися переглядом різноманітного відеоконтенту у режимі реального часу, будь-де та будь-коли. Запрошуйте друзів або насолоджуйтеся переглядом самі - MovieParty створює можливість синхронного перегляду та обговорення контенту у реальному часі. Поділіться враженнями, створіть власні вечірки з фільмами та серіалами, і насолоджуйтеся магією спільного перегляду разом з MovieParty!",
    isOpen: false,
  },
  { id: 2, title: "Що таке cпільний перегляд?", isOpen: false },
  { id: 3, title: "Де можна дивитись контент?", isOpen: false },
  { id: 4, title: "Скільки коштує підписка на місяць?", isOpen: false },
  { id: 5, title: "Як скасувати підписку?", isOpen: false },
  { id: 6, title: "Що можна подивитися на даному сервісі?", isOpen: false },
];

const FAQItems = () => {
  const [items, setItems] = useState(data);

  const toggleItem = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id == id) {
        item.isOpen = !item.isOpen;
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div className="faq__items">
      {items.map((item) => {
        return <FAQItem key={item.id} {...item} toggleItem={toggleItem} />;
      })}
    </div>
  );
};

export default FAQItems;
