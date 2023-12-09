import React from 'react';

// Interface for ErrorMessage component props
export interface IErrorMessageProps {
    error: string;
}

// ErrorMessage component: Displays an error message if the error prop is not empty.
const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = props => {
    const {error} = props;

    // Return null (no render) if there is no error message
    if (error === '') return null;

    // Render the error message in a small, red-colored text element
    return (
        <small className="text-danger">
            {error}
        </small>
    );
}

export default ErrorMessage;
