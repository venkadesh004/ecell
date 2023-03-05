import './logo.css';
import React from 'react';

import LogoImage from '../../images/tce-logo.png';

export default function Logo() {
    return (
        <div className='logo-div'>
            <a href='/'><img src={LogoImage} alt="" className='logo-image' /></a>
            <h2>Investor</h2>
        </div>
    );
}