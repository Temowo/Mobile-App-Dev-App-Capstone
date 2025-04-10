import React from "react";

const Subheader = ({ pageTitle, children }) => {
  return (
    <div className="subheader">
      <h1 className="page-title">{pageTitle}</h1>
      {children}
    </div>
  );
};

export default Subheader;
