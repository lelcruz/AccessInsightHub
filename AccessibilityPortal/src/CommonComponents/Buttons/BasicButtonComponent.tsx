import React, {useState} from 'react';

type BasicButtonComponentProps = {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  color: "light" | "dark";
};

function BasicButtonComponent(props: BasicButtonComponentProps) {

  const buttonTheme = () => {
    let theme = (props.color === "light") ? "btn btn-light" : (props.color === "dark") ? "btn btn-dark" : ""
    return theme;
  }
  
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <button type={props.type} className={buttonTheme()} onClick={handleClick}>
      {props.title}</button>
  );
}

export default BasicButtonComponent;
