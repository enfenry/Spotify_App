import React, { useEffect } from 'react';
// import React from 'react';
import './LogoutSpotify.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { navigate } from 'hookrouter';


export default function Header({
    path,
    user,
    setUser
}) {

    useEffect(() =>{
        setUser(user);
    })

    const handleLogout = (path) => {
        localStorage.clear();
        navigate(path);
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Logged in as {user.data.display_name}</Popover.Title>
            <Popover.Content>
                <a onClick={() => handleLogout(path)}>Sign Out</a>
            </Popover.Content>
        </Popover>
    );

    return (
        <OverlayTrigger rootClose trigger="click" placement="right" overlay={popover}>
            <img className="img-header" id="user-profile-header" alt="User-Profile" type="button" src={user.data.images[0].url} />
        </OverlayTrigger>
    )
};