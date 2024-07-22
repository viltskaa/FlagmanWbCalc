import {useEffect, useState} from "react";

const VRange = ({
                       className = "",
                       title = "",
                       init = 0,
                       onChange = (val) => {}
                     }) => {
  return (
    <div className={"card p-2 " + className}>
      <label htmlFor={title.hashCode().toString()}>{title} <u>{init}%</u></label>
      <input
        type="range"
        className="form-range"
        id={title.hashCode().toString()}
        value={init}
        onChange={(e) => onChange(+e.target.value)}
      />
    </div>
)
  ;
};

export default VRange;