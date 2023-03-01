import React from "react";

import SearchIcon from '../../images/search.png';

import './SearchBar.css';

export default function SearchBar() {
    return (
        <div className="SearchBar">
            <img src={SearchIcon} alt="" />
            <input type="text" placeholder="Search for companies" className="SearchBar-input" />
        </div>
    );
}