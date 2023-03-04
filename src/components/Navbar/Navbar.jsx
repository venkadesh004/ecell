import { React } from "react";
import Logo from "../../containers/Logo/Logo";
import SearchBar from "../../containers/SearchBar/SearchBar";
import BellIcon from "../../containers/BellIcon/BellIcon";
import FaceProfile from "../../containers/FaceProfile/FaceProfile";

import './Navbar.css';

export default function Navbar({searchState, searchResult}) {

    return (
        <div className="Navbar">
            <Logo />
            <SearchBar searchState={searchState} searchInputResult={searchResult} />
            <div className="Navbar-side">
                <BellIcon />
                <FaceProfile />
            </div>
        </div>
    );
}