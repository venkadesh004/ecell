import { React, Component } from "react";
import Logo from "../../containers/Logo/Logo";
import SearchBar from "../../containers/SearchBar/SearchBar";
import BellIcon from "../../containers/BellIcon/BellIcon";
import FaceProfile from "../../containers/FaceProfile/FaceProfile";

import './Navbar.css';

export default class Navbar extends Component {
    render() {
        return (
            <div className="Navbar">
                <Logo />
                <SearchBar />
                <div className="Navbar-side">
                    <BellIcon />
                    <FaceProfile />
                </div>
            </div>
        );
    }
}