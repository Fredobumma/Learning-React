import React from "react";

const SearchBox = ({ extraClasses, onSearch, ...rest }) => {
  return (
    <div>
      <input
        type="search"
        className={`form-control ${extraClasses}`}
        placeholder="Search..."
        {...rest}
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchBox;
