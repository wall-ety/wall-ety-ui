import { useState } from "react";

type UseToggleState = [boolean, () => void];

export function useToggle(defaultValue = false): UseToggleState {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = () => {
    setValue((prev) => !prev);
  };

  return [value, toggleValue];
}
