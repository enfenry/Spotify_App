import React, { useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { navigate } from 'hookrouter';
import { PathContext } from '../../App';
import styled from 'styled-components';

const StyledLink = styled.a`
    text-decoration: none !important;
    cursor:pointer;
`

const StyledPopover = styled(Popover)`
    margin-top: 40px;
`

const StyledImg = styled.img`
    border-radius: 50%;
    background-color: black;
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding;
    background-clip: padding-box;
    height: 50px !important;
    width: 50px !important;

    &:hover {
        opacity: .7;
        transition: .3s ease;
    }
`

export default function Logout({
    user,
    setUser,
    popoverPlacement
}) {

    // TODO: Review use of [user] dependency array here
    useEffect(() => {
        setUser(user);
    },[user])

    const { pathState } = useContext(PathContext);
    const path = pathState.path;
    // console.log('path',path);

    const handleLogout = (path) => {
        localStorage.clear();
        navigate(path);

        if (path === "/" || path === "/results") {
            window.location.reload();
        }
    }

    const popover = (
        <StyledPopover id={`popover-positioned-${popoverPlacement}`}>
            <Popover.Title as="h3">Logged in as {user.data.display_name}</Popover.Title>
            <Popover.Content>
                <Row noGutters={true}>
                    <StyledLink onClick={() => handleLogout(path)}>Sign Out</StyledLink>
                </Row>
            </Popover.Content>
        </StyledPopover>
    );

    // TODO: TEST THAT THIS WORKS (TRY USING ANSAR'S SPOTIFY)
    const renderSrc = () => {
        if (user.data.images[0]) {
            return user.data.images[0].url
        }
        else {
            return process.env.PUBLIC_URL + '/static/img/user.png'
        }
    }

    return (
        <OverlayTrigger rootClose trigger="click" placement={popoverPlacement} overlay={popover}>
            <StyledImg className="img-header" id="user-profile-header" alt="User-Profile" type="button" src={renderSrc()} />
        </OverlayTrigger>
    )
};