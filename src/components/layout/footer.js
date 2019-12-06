import React from 'react';
import styled from 'styled-components';

const TriggerBox = styled.div`
    position: fixed;
    width: 100%;
    height: 100px;
    bottom: 0px;
    left: 0px;
    z-index: 5;
    /* border: 1px dotted black; */
    transform: translateY(50%);
    transition: transform 0.2s ease-out, height 0.2s ease-out;
    &:hover {
        transform: translateY(0%);
        height: 50px;
    }
    @media(max-width: 700px) {
        display: none;
    }
`

const Footer = styled.div`
    position: absolute;
    /* top: 50%; */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    /* border: 1px dotted red; */
    /* margin-top: 50px; */
    bottom: 0px;
    /* left: 0px; */
    /* position: fixed; */
    /* z-index: 5; */
    background-color: lightgrey;
    /* transform: translateY(95%);
    transition: transform 0.2s ease-out; */
    /* &:hover {
        transform: translateY(0%);
    } */
`

export default ({content}) => {

return (
    <TriggerBox>
        <Footer>
            {content}
        </Footer>
    </TriggerBox>
    )
}