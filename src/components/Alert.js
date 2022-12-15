import React from "react";

const Alert = (props) => {
  const { alert } = props;
  return (
    <>
      {alert && (
        <div className={`alert alert-${alert.type} my-3`} role="alert">
          {alert.message}
        </div>
      )}
    </>
  );
};

export default Alert;
