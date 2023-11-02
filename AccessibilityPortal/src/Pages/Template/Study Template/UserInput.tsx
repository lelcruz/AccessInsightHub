import { ChangeEvent, useState } from "react";

type ValidationFunction = (value: string) => boolean;

interface UseInputReturn<T> {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: (event: ChangeEvent<T>) => void;
  inputBlurHandler: () => void;
  reset: () => void;
}

const userInput = <T extends HTMLInputElement | HTMLTextAreaElement>(
  validateValue: ValidationFunction,
): UseInputReturn<T> => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid: boolean = validateValue(enteredValue);
  const hasError: boolean = !valueIsValid && isTouched;

  const valueChangeHandler = (event: ChangeEvent<T>) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default userInput;
