import React from 'react';

const SearchContainer = () =>
<div className="row" style={{'paddingBottom': '100px', 'paddingTop': '100px'}}>
  <Search />
</div>;

const Search = () => (
  <div className="col-sm-6">
    <input type="text" className="col-md-4 form-control" placeholder="Search"></input>
  </div>
);

export {SearchContainer, Search};
