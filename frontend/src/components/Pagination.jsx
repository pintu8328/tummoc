import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "../App.css";
const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="flex-btn">
      <Button className="btn btn-primary" onClick={() => onButtonClick("prev")}>
        Previous
      </Button>
      <Button className="btn btn-primary" onClick={() => onButtonClick("next")}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;