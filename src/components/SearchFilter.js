import React from 'react';

const SearchFilter = (props) => {

  const handleSearch = e => {
    e.preventDefault();
    props.onSearch(e.target.value);
  }

  return (
    <div>
      <input
        type='text'
        placeholder="Search todo"
        name="text"
        className="todo-input"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchFilter;
