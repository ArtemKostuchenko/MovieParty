import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { enablePageScroll, disablePageScroll } from "scroll-lock";
import { setSideMenuState } from "../features/store/slices/menu";
import { useEffect } from "react";

const useSideMenu = () => {
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 730px)" });

  const { isSideMenuOpen } = useSelector((store) => store.menu);

  const toggleSideMenu = () => {
    dispatch(setSideMenuState(!isSideMenuOpen));
  };

  useEffect(() => {
    if (!isSideMenuOpen) {
      enablePageScroll();
    } else {
      disablePageScroll();
    }
  }, [isSideMenuOpen]);

  useEffect(() => {
    if (!isTabletOrMobile && isSideMenuOpen) {
      toggleSideMenu();
    }
  }, [isTabletOrMobile]);

  return { isSideMenuOpen, toggleSideMenu };
};

export default useSideMenu;
