import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { enablePageScroll, disablePageScroll } from "scroll-lock";
import {
  setProfileMenuOpenState,
  setSideMenuState,
} from "../features/store/slices/menu";
import { useEffect } from "react";

const useSideMenu = () => {
  const dispatch = useDispatch();
  const isTabletOrMobileSide = useMediaQuery({ query: "(max-width: 730px)" });
  const isTabletOrMobileProfile = useMediaQuery({
    query: "(max-width: 760px)",
  });

  const { isSideMenuOpen, isProfileMenuOpen } = useSelector(
    (store) => store.menu
  );

  const toggleSideMenu = () => {
    dispatch(setSideMenuState(!isSideMenuOpen));
  };

  const toggleProfileMenu = () => {
    dispatch(setProfileMenuOpenState(!isProfileMenuOpen));
  };

  useEffect(() => {
    if (!isSideMenuOpen) {
      enablePageScroll();
    } else {
      disablePageScroll();
    }
  }, [isSideMenuOpen]);

  useEffect(() => {
    if (!isTabletOrMobileSide && isSideMenuOpen) {
      toggleSideMenu();
    }
  }, [isTabletOrMobileSide]);

  useEffect(() => {
    if (isTabletOrMobileProfile && isProfileMenuOpen) {
      toggleProfileMenu();
    }
  }, [isTabletOrMobileProfile]);

  return {
    isSideMenuOpen,
    isProfileMenuOpen,
    toggleSideMenu,
    isTabletOrMobileProfile,
    toggleProfileMenu,
  };
};

export default useSideMenu;
