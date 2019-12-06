import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    width: 100%;
    height: 60px;
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: 10;
    background-color: rgba(249, 249, 249, 1);
    box-shadow: 0px 2px 6px -2px rgba(0,0,0,0.75);
    padding: 0px 5%;
    transition:
        height 0.4s ease-out,
        border-radius 0.4s ease-out,
        padding 0.6s ease-out,
        background-color 0.5s ease-out,
        box-shadow 0.5s ease-out;
    /* font-family: 'Indie Flower', cursive; */
    @media(max-width: 700px) {
        ${props => props.location !== '/'
            ? `background-color: rgba(249, 249, 249, 0);
            box-shadow: none;`
            : null}
    }
    /* font-size: 2rem; */
    /* border-radius: 255px 15px 225px 15px/15px 225px 15px 255px; */
    @media(min-width: 701px) {
        &:hover {
        height: 100px;
        border-radius: 0px 0px 50% 50% / 0px 0px 40% 40%;
        padding: 0px 10%;
        opacity: 1;
        }
    }
`

export default ({content, location}) => <Header location={location.pathname}>{content}</Header>