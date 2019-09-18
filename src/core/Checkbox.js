import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  // a FUNCTION that returns another function
  const handleToggle = category => () => {
    //returns 1st index of -1
    const currentCategoryId = checked.indexOf(category);
    //shows all category ids in the state
    const newCheckedCateogryId = [...checked];

    //if below equals -1, then category is not already in the state
    if (currentCategoryId === -1) {
      newCheckedCateogryId.push(category);
    } else {
      newCheckedCateogryId.splice(currentCategoryId, 1);
    }
    // console.log(newCheckedCateogryId);
    setChecked(newCheckedCateogryId);
    handleFilters(newCheckedCateogryId);
  };

  return categories.map((category, i) => (
    <li key={i} className='list-unstyles'>
      <input
        onChange={handleToggle(category._id)}
        value={checked.indexOf(category._id === -1)}
        type='checkbox'
        className='form-check-input'
      />
      <label className='form-check-label'>{category.name}</label>
    </li>
  ));
};

export default Checkbox;
