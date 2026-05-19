import { useEffect } from "react";

const Filter = ({ onChange }) => {
  return (
    <div>
      <p>filter shown with</p>
      <input type="text" onChange={onChange} />
    </div>
  );
};

export default Filter;
