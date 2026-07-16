import { useState, useEffect, useRef } from "react";

import clsx from "clsx";

import DropdownDown from "../../assets/icons/DropdownDown";
import DropdownUp from "../../assets/icons/DropdownUp";

import styles from "./Select.module.css";

export function Select({ value, options, onChange, className, placeholder }) {

  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className={clsx(styles.container, className)}>

      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={styles.body}
        type="button"
      >
        {selectedOption?.label ?? {placeholder}}
        {
          isOpen
            ? (<DropdownUp
              title="DropdownUp"
              titleId="dropdown-up-icon"
              width={24}
              height={24}
              className={styles.icon}
            />)
            : (<DropdownDown
              title="DropdownDown"
              titleId="dropdown-down-icon"
              width={24}
              height={24}
              className={styles.icon}
            />)
        }
      </button>

      {isOpen && (
        <div className={styles.items}>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false)
              }}
              className={styles.item}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

    </div>
  );

}