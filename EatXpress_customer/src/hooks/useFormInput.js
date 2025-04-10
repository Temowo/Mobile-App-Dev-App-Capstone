import { useState } from "react";

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(text) {
    setValue(text);
  }

  const inputProps = {
    value: value,
    onChangeText: handleChange,
  };

  return inputProps;
}
