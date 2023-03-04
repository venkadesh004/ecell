import React, {useState} from "react";

import SearchIcon from '../../images/search.png';

import './SearchBar.css';

import { companies } from "../../constants";

export default function SearchBar({searchState, searchInputResult}) {
    
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        companies.forEach(comp => {
            if (comp.name === searchInput) {
                console.log("Found");
                searchState=true;
            } else {
                console.log("Not found");
            }
        })
    }

    return (
        <div className="SearchBar">
            <img src={SearchIcon} alt="" />
            <input type="search" onChange={handleChange} value={searchInput} placeholder="Search for companies" className="SearchBar-input" />
        </div>
    );
}