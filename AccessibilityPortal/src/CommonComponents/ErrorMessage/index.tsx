import React from 'react';

export interface IErrorMessageProps {
    error: string;
}

const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = props => {
    const { error } = props;

    if (error === '') return null;

    return (
        <small className="text-danger">
            {error}
        </small>
    );
}

export default ErrorMessage;