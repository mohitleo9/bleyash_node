import React from 'react';

const SearchContainer = () =>
<div className="row" style={{'paddingBottom': '100px', 'paddingTop': '100px'}}>
  <Search />
</div>;

const Search = () => (
  <div className="col-lg-8 col-md-7 col-sm-6">
    <input type="text" className="col-md-4 form-control" placeholder="Search"></input>
  </div>
);

const MainButtonBar = () =>
  <div className="row">
    <div className="btn-group btn-group-justified">
      <HomeButton text="Bars" />
      <HomeButton text="Resturants" />
      <HomeButton text="Clubs" />
    </div>
  </div>;

const HomeButton = ({text}) => (
  <a className="btn btn-default" type="submit">{text}</a>
);

const HelloWorld = () =>
  <div className="row">
    <h1>Hello, World!</h1>
  </div>;

const HomePage = () =>
  <div className='container'>
    <SearchContainer />
    <HelloWorld />
    <MainButtonBar />
  </div>;

export default HomePage;
