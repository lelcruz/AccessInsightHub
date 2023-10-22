import { ChangeEvent, useState } from "react";

type ValidationFunction = (value: string) => boolean;

interface UseInputReturn {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  inputBlurHandler: () => void;
  reset: () => void;
}

const useInput = (validateValue: ValidationFunction): UseInputReturn => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid: boolean = validateValue(enteredValue);
  const hasError: boolean = !valueIsValid && isTouched;

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
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

export default useInput;
