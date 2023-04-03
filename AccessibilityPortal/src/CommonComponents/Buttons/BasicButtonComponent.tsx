import React from 'react';

type BasicButtonComponentProps = {
  title: string;
};

function BasicButtonComponent(props: BasicButtonComponentProps) {
  return (
    <button className="btn btn-light">{props.title}</button>
  );
}

export default BasicButtonComponent;
