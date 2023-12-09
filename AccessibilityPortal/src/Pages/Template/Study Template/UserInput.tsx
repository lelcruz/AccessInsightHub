import {ChangeEvent, useState} from "react";

type ValidationFunction = (value: string) => boolean;

// Define an interface for the return object of the custom hook
interface UseInputReturn {
    value: string;
    isValid: boolean;
    hasError: boolean;
    valueChangeHandler: (
        event: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => void;
    inputBlurHandler: () => void;
    reset: () => void;
}

// Define the custom hook userInput, which manages input state and validation
const userInput = (validateValue: ValidationFunction): UseInputReturn => {
    const [enteredValue, setEnteredValue] = useState<string>("");
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const valueIsValid: boolean = validateValue(enteredValue);
    const hasError: boolean = !valueIsValid && isTouched;

    // Update the enteredValue when the input value changes
    const valueChangeHandler = (
        event: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        setEnteredValue(event.target.value);
    };

    // Mark the input as touched when it loses focus
    const inputBlurHandler = () => {
        setIsTouched(true);
    };
    // Reset the input to its initial state
    const reset = () => {
        setEnteredValue("");
        setIsTouched(false);
    };
    // Return the input state and handlers as an object
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
