import './logo.css';
import React from 'react';

import LogoImage from '../../images/tce-logo.png';

export default function Logo({user}) {
    return (
        <div className='logo-div'>
            <a href='/'><img src={LogoImage} alt="" className='logo-image' /></a>
            <h2>{user}</h2>
        </div>
    );
}