import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import {DataContext} from '../layoutComp';
import { FaBars } from 'react-icons/fa';

const Nav = styled.nav`
    display: flex;
    align-items: center;
    @media (max-width: 700px) {
        z-index: 15;
        flex-flow: column;
        justify-content: center;
        position: fixed;
        top: 0px;
        right: 0px;
        height: 100vh;
        /* border-radius: 50% 0px 0px 50% / 50% 0px 0px 50%; */
        background-color: #f9f9f9;
        transition: transform 0.3s ease-out, border-radius 0.3s ease-out;
        ${props => props.open
            ? `transform: translateX(0%);
            border-radius: 50% 0px 0px 50% / 50% 0px 0px 50%;`
            : `transform: translateX(100%);
            border-radius: 0px;`}
    }
`

const TriggerCloseBox = styled.div`
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 9;
    width: 100%;
    height: 100vh;
    @media(min-width: 701px) {
        display: none;
    }
`

const MenuItem = styled.button`
    display: block;
    padding: 10px;
    /* margin: 0px 20px; */
    outline: none;
    background-color: transparent;
    transition: transform 0.2s ease-in-out, border 0.5s linear;
    border: ${props => props.active? '1px solid salmon': 'none'};
    border-radius: 10px;
    &:hover {
        transform: scale(1.1);
    }
`

const MenuBars = styled(MenuItem)`
    display: flex;
    align-items: flex-end;
    padding: 5px;
    background-color: rgba(249,249,249,0.7);
    @media(min-width: 701px) {
        display: none;
    }
`

export default () => {
    // const [currentPage, setCurrentPage] = useState('Home');
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const {location, navData, pageLinkRefs} = useContext(DataContext);
    const locations = navData.map(item => item.link);

    const getContent = () => {
        // console.log(location.pathname);
        // if (mobile) return <MenuItem onClick={() => setSideNavOpen(true)} style={{fontSize: '2rem'}}>☰</MenuItem>
        return (
            <>
            <MenuBars onClick={() => setSideNavOpen(true)} ariaLabel="main menu"><FaBars/></MenuBars>
            <Nav open={sideNavOpen} >
                {navData.map((item, idx) => (
                    <MenuItem key={item.label} ref={pageLinkRefs[idx]} onClick={() => setSideNavOpen(false)} active={location.pathname === item.link}>
                        <AniLink
                            swipe direction={
                                locations.indexOf(location.pathname) <= locations.indexOf(item.link)
                                    ? "up": "down"}
                            to={item.link}
                        >
                            {item.label}
                        </AniLink>
                    </MenuItem>
                ))}
            </Nav>
            {sideNavOpen && <TriggerCloseBox onClick={() => setSideNavOpen(false)}/>}
            </>
        )
    };
    return getContent()
}