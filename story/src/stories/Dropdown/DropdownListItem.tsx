import React, { type ReactElement } from "react";
import { TextDirection } from "../textDirection";
import { createDropdownListItemStyles } from "./dropdownListItemStyles";

const dropdownListItemStyles = createDropdownListItemStyles("simple", "simple");

interface DropdownListItemProps {
  label: string;
  icon?: ReactElement;
  textDirection?: TextDirection;
  isDisabled?: boolean;
  onSelect?: () => void;
}

export const DropdownListItem = ({
  label,
  icon,
  textDirection = TextDirection.Ltr,
  isDisabled = false,
  onSelect,
}: DropdownListItemProps): ReactElement => {
  const handleClick = () => {
    if (!isDisabled) {
      onSelect?.();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "Enter" || event.key === " ") && !isDisabled) {
      event.preventDefault();
      onSelect?.();
    }
  };

  return (
    <button
      className={dropdownListItemStyles({ disabled: isDisabled })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      type="button"
      role="option"
      dir={textDirection}
    >
      {icon && <span className="scale-[.6667]">{icon}</span>}
      <span className="flex-1 truncate min-w-0 translate-y-px">{label}</span>
    </button>
  );
};
