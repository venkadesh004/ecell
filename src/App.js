import './App.css';
import { React, useState } from 'react';

import { Navbar, SidePage } from './components';
import Database from './Database';
export default function App() {
  var pageIndex = 0;

  const [searchState, setSearchState] = useState(false);
  const [searchResult, setSearchResult] = useState("com1");
  
  console.log("State ", searchState);

  return (
    <div className="App">
      {/* <Database /> */}
        <div className='navbar'>
         <Navbar searchState={searchState} searchResult={searchResult} />
        </div>
        <SidePage pageIndex={pageIndex} searchResult={[searchState, searchResult]} />
      </div>
  );
}