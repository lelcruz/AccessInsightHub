import React from 'react';

// Type definition for BasicButtonComponent's props
type BasicButtonComponentProps = {
    title: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    color: "light" | "dark";
};

function BasicButtonComponent(props: BasicButtonComponentProps) {
    // Determine the button's theme class based on the provided color prop
    const buttonTheme = `btn ${props.color === 'light' ? 'btn-light' : 'btn-dark'}`;

    // Function to handle button click, triggering the onClick prop if provided
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    }

    // Render the button with the appropriate type, theme, and click handler
    return (
        <button type={props.type} className={buttonTheme} onClick={handleClick}>
            {props.title}
        </button>
    );
}

export default BasicButtonComponent;
