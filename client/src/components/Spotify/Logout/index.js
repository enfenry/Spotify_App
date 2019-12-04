import React, { useEffect } from 'react';
// import React from 'react';
import './LogoutSpotify.css';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { navigate } from 'hookrouter';

export default function Logout({
    path,
    user,
    setUser,
    popoverPlacement
}) {

    useEffect(() => {
        setUser(user);
    })

    const handleLogout = (path) => {
        localStorage.clear();
        navigate(path);

        if (path === "/" || path === "/results") {
            window.location.reload();
        }
    }

    const popover = (

        <Popover id={`popover-basic popover-positioned-${popoverPlacement}`}>
            <Popover.Title as="h3">Logged in as {user.data.display_name}</Popover.Title>
            <Popover.Content>
                <Row noGutters={true}>
                    <a onClick={() => handleLogout(path)}>Sign Out</a>
                </Row>
            </Popover.Content>
        </Popover>
    );

    return (
        <OverlayTrigger rootClose trigger="click" placement={popoverPlacement} overlay={popover}>
            <img className="img-header" id="user-profile-header" alt="User-Profile" type="button" src={user.data.images[0].url} />
        </OverlayTrigger>
    )
};