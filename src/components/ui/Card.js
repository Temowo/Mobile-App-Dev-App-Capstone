import React from "react";
import classNames from "classnames";

const Card = ({ classes, children, onClick }) => {
  const cardClasses = classNames("card", classes);
  return (
    <div onClick={onClick} className={cardClasses}>
      {children}
    </div>
  );
};

export default Card;
