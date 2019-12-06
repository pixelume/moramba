import {keyframes} from 'styled-components';

export const fadeInOut = keyframes`
    0% {
        /* transform: translateX(-25px); */
        opacity: 0
    }
    20% {
        /* transform: translateX(-15px); */
        opacity: 1
    }
    80% {
        /* transform: translateX(15px); */
        opacity: 1
    }
    100% {
        /* transform: translateX(25px); */
        opacity: 0
    }
    `
export const fadeUpDown = keyframes`
    0% {
        transform: translateY(0px);
        /* filter: blur(5px); */
        opacity: 0;
    }
    /* 10% {
        opacity: 1;
    } */
    20% {
        /* transform: translateX(-15px); */
        /* filter: blur(0px); */
        opacity: 1;
    }
    80% {
        /* transform: translateX(15px); */
        /* filter: blur(0px); */
        opacity: 1;
    }
    /* 90% {
        opacity: 1;
    } */
    100% {
        transform: translateY(-50px);
        /* filter: blur(5px); */
        opacity: 0;
    }
    `
export const fadeLtRt = keyframes`
    0% {
        transform: translateX(0px);
        opacity: 0
    }
    20% {
        /* transform: translateX(-15px); */
        opacity: 1
    }
    90% {
        /* transform: translateX(15px); */
        opacity: 1
    }
    100% {
        transform: translateX(-50px);
        opacity: 0
    }
    `
    // animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
export const moveVert = keyframes`
    0% {
        margin-right: 0px;
    }
    50% {
        margin-right: 80%;
    }
    100% {
        margin-right: 0px;
    }
`
export const moveHoriz = keyframes`
    0% {
        margin-bottom: 0px;
    }
    50% {
        margin-bottom: 100%;
    }
    100% {
        margin-bottom: 0px;
    }
`
export const pulsate = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
`

export const fadeIn = keyframes`
    0% {
        opacity: 0
    }
    100% {
        opacity: 1
    }
`
export const fadeOut = keyframes`
    0% {
        opacity: 1
    }
    100% {
        opacity: 0
    }
`
export const pan = keyframes`
    0% {
        margin-right: -80px;
    }
    100% {
        margin-right: 0px;
    }
    /* 100% {
        margin-right: -80px
    } */
`
export const panPortrait = keyframes`
    0% {
        margin-right: -100px;
    }
    100% {
        margin-right: 0px;
    }
    /* 100% {
        margin-right: -200px
    } */
`
export const fadeInLt = keyframes`
    0% {
        transform: translateX(-50px);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`
export const fadeInRt = keyframes`
    0% {
        transform: translateX(50px);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`