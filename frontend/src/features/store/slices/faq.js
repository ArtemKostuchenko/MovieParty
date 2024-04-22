import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
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
  ],
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    toggleFAQ: (state, action) => {
      const id = action.payload;
      state.items.map((item) => {
        if (item.id === id) {
          item.isOpen = !item.isOpen;
        } else {
          item.isOpen = false;
        }
      });
    },
  },
});

export const { toggleFAQ } = faqSlice.actions;

export default faqSlice.reducer;
