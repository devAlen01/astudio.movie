import { FC } from "react";
import scss from "./BurgerButton.module.scss";
import { useHeaderStore } from "@/stores/useHeaderStore";

const BurgerButton: FC = () => {
  const { isOpen, setIsOpen } = useHeaderStore();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      className={`${scss.menu} ${isOpen ? scss.opened : ""}`}
      onClick={handleClick}
      aria-label="Main Menu"
      aria-expanded={isOpen}
    >
      <svg viewBox="0 0 100 100">
        <path
          className={`${scss.line} ${scss.line1}`}
          d="M 20,29 H 80 C 80,29 94.5,28.8 94.5,66.7 C 94.5,77.9 90.97,81.67 85.26,81.67 C 79.55,81.67 75,75 75,75 L 25,25"
        />
        <path className={`${scss.line} ${scss.line2}`} d="M 20,50 H 80" />
        <path
          className={`${scss.line} ${scss.line3}`}
          d="M 20,71 H 80 C 80,71 94.5,71.2 94.5,33.3 C 94.5,22 90.97,18.33 85.26,18.33 C 79.55,18.33 75,25 75,25 L 25,75"
        />
      </svg>
    </button>
  );
};

export default BurgerButton;
