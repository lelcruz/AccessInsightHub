import React, {useState} from 'react';

type BasicButtonComponentProps = {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  color: "light" | "dark";
};

function BasicButtonComponent(props: BasicButtonComponentProps) {

  const buttonTheme = `btn ${props.color === 'light' ? 'btn-light' : 'btn-dark'}`;
  
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <button type={props.type} className={buttonTheme} onClick={handleClick}>
      {props.title}</button>
  );
}

export default BasicButtonComponent;
