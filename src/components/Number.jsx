import {useEffect, useState} from "react";

const Number = ({
                       className = "",
                       title = "",
                       init = 0,
                       onChange = (val) => {}
                     }) => {
  return (
    <div className={"card p-2 " + className}>
      <label htmlFor={title.hashCode().toString()}>{title}</label>
      <input
        type="number"
        className="form-control"
        id={title.hashCode().toString()}
        value={init}
        onChange={(e) => onChange(+e.target.value)}
      />
    </div>
  );
};

export default Number;