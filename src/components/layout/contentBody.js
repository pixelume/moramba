import React, { useContext } from 'react';
import styled, {css/* , keyframes */} from 'styled-components';
import 'spiketip-tooltip/spiketip.min.css';
import Img from 'gatsby-image';
import { fadeOut, pan, panPortrait } from '../../animations';
import { DataContext } from '../layoutComp';
import { /* Form, FormField, TextInput,  */Select, TextArea, Drop } from 'grommet';
import { fadeInLt } from '../../animations';

export const Wrapper = styled.div`
    display: flex;
    /* @media(orientation: portrait) {
        flex-flow: column;
    } */
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${props => props.color};
    height: 100%;
`

const StBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media(orientation: portrait) {
        flex-flow: column;
    }
    width: 100%;
    height: calc(100% - 60px);
    margin: 60px auto 0px auto;
    @media(orientation: portrait) {
        ${props => ['/', '/contact'].includes(props.location)
            ? `height: calc(100% - 60px);
            margin: 60px auto 0px auto;`
            : `height: 100%;
            margin: auto;`}
    }
    /* border: 1px dotted black; */
    text-align: center;
    background-color: transparent;
`
export const Body =({children}) => {
    const {location} = useContext(DataContext)
    return <StBody location={location.pathname}>{children}</StBody>;
}

export const CenterBlock = styled.div`
    display: flex;
    flex-flow: column;
    width: ${props => props.width || '58%'};
    @media(orientation: portrait) {
        width: 100%;
        /* position: relative; */
    }
    ${props => props.height? `height: ${props.height};`: null}
    align-items: center;
    justify-content: center;
`

export const ContentBlock50 = styled.div`
    display: ${props => props.display || 'flex'};
    position: ${props => props.position || 'relative'};
    flex-flow: ${props => props.flexFlow || 'row'};
    align-items: ${props => props.alignItems || 'center'};
    padding: ${props => props.padding || '0px'};
    /* justify-content: ${props => props.justifyContent || 'center'}; */
    justify-content: center;
    width: 50%;
    height: 100%;
    overflow: hidden;
    @media(orientation: portrait) {
        height: 50%;
        width: 100%;
    }
    @media(orientation: landscape) {
      ${props => props.margin? css`margin: ${props.margin};`: null}
    }
    /* border: 1px dotted black; */
`

export const ContentBlock5075 = styled(ContentBlock50)`
    width: 50%;
    height: 100%;
    @media(orientation: portrait) {
        height: 75%;
        width: 100%;
    }
`
export const ContentBlock100 = styled(ContentBlock50)`
    width: 100%;
    height: 100%;
    @media(orientation: portrait) {
        ${props => props.columnOnPortrait
            ? props.justifyOnColumn
                ? `justify-content: ${props.justifyOnColumn}; flex-flow: column;`
                :`flex-flow: column;`
            : null}
        height: 100%;
        width: 100%;
    }
`

export const ContentBlock6075 = styled(ContentBlock50)`
    width: 60%;
    height: 100%;
    @media(orientation: portrait) {
        height: 75%;
        width: 100%;
    }
`
export const ContentBlock80 = styled(ContentBlock50)`
    width: 80%;
    height: 100%;
    @media(orientation: portrait) {
        height: 80%;
        width: 100%;
    }
`
export const ContentBlock20 = styled(ContentBlock50)`
    width: 20%;
    height: 100%;
    @media(orientation: portrait) {
        height: 20%;
        width: 100%;
    }
`
export const ContentBlock30 = styled(ContentBlock50)`
    width: 30%;
    height: 100%;
    @media(orientation: portrait) {
        height: 30%;
        width: 100%;
    }
`
export const ContentBlock40 = styled(ContentBlock50)`
    width: 40%;
    height: 100%;
    @media(orientation: portrait) {
        height: 40%;
        width: 100%;
    }
`
export const ContentBlock60 = styled(ContentBlock50)`
    width: 60%;
    height: 100%;
    @media(orientation: portrait) {
        height: 60%;
        width: 100%;
    }
`
export const ContentBlock70 = styled(ContentBlock50)`
    width: 70%;
    height: 100%;
    @media(orientation: portrait) {
        height: 70%;
        width: 100%;
    }
`

export const ContentBlock4025 = styled(ContentBlock50)`
    width: 40%;
    height: 100%;
    @media(orientation: portrait) {
        height: 25%;
        width: 100%;
    }
`
export const ContentBlock5025 = styled(ContentBlock50)`
    width: 50%;
    height: 100%;
    @media(orientation: portrait) {
        height: 25%;
        width: 100%;
    }
`
export const ContentBlock5030 = styled(ContentBlock50)`
    width: 50%;
    height: 100%;
    @media(orientation: portrait) {
        height: 30%;
        width: 100%;
    }
`
export const ContentBlock5040 = styled(ContentBlock50)`
    width: 50%;
    height: 100%;
    @media(orientation: portrait) {
        height: 40%;
        width: 100%;
    }
`
export const ContentBlock5060 = styled(ContentBlock50)`
    width: 50%;
    height: 100%;
    @media(orientation: portrait) {
        height: 60%;
        width: 100%;
    }
`
export const ContentBlock5070 = styled(ContentBlock50)`
    width: 50%;
    height: 100%;
    @media(orientation: portrait) {
        height: 70%;
        width: 100%;
    }
`
export const TooltipIcn = ({title, pos, children}) =>
    <span
        style={{
            display: 'inline-block',
            padding: '5px 5px 0px 5px',
            border: '1px solid black',
            borderRadius: '8px',
            margin: '0px 5px 5px 0px',
            minWidth: '35px'
        }}
        spiketip-title={title}
        spiketip-pos={pos || 'top'}
        spiketip-length='sm'
    >
        {children}
    </span>

export const IconBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: center;
`
export const UnitImg = styled(Img)`
    ${props => props.bg? 'position: absolute;': null}
    /* margin-right: 0px; */
    height: 100%;
    @media(orientation: landscape) {
        width: calc(100% + 80px);
        ${props => !props.bg? css`animation: ${pan} 3s ease-in-out;`: null}
        ${props => props.bg? 'right: -80px;': null}
        ${props => props.animateOut? css`animation: ${fadeOut} 0.5s linear;`: null}
    }
    @media(orientation: portrait) {
        width: calc(100% + 100px);
        ${props => !props.bg? css`animation: ${panPortrait} 3s ease-in-out;`: null}
        ${props => props.bg? 'right: -100px;': null}
        ${props => props.animateOut? css`animation: ${fadeOut} 0.5s linear;`: null}

    }
`

export const EnqSidebar = styled.div`
    z-index: 15;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    top: 0px;
    height: 100%;
    @media(orientation: portrait) {
        left: 0px;
    }
    @media(orientation: landscape) {
        right: 0px;
    }
    width: 100vw;
    @media(orientation: landscape) {
        width: 50vw;
    }
    /* border-radius: 50% 0px 0px 50% / 50% 0px 0px 50%; */
    background-color: rgba(255,255,255,0.8);
    transition: transform 0.3s ease-out;
    /* transform: translateX(-90%); */
    ${props => props.open
        ? `@media(orientation: landscape) {
            transform: translateX(-20vw);
        }`
        : `transform: translateX(100%);
        @media(orientation: portrait) {
            transform: translateX(-100%);
        }`}
`
// const fadeInOverlay = keyframes`
//     0% {
//         background-color: transparent;
//     }
//     100% {
//         background-color: rgba(0,0,0,0.5);
//     }
// `
export const TriggerCloseBox = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
`
export const BlackBtn = styled.button`
    display: flex;
    justify-content: center;
    /* align-items: flex-start; */
    padding: 5px 10px;
    /* border: 2px solid black; */
    border-radius: 20px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    outline: none;
    border: none;
    &:hover {
        cursor: pointer;
    }
`
export const CloseBtn = styled.button.attrs({
    type: "button"
})`
    font-size: 1rem;
    display: flex;
    align-items: center;
    position: absolute;
    ${props => props.pos
        ? props.pos
        : null}
    /* padding: 5px; */
    background-color: ${props => props.bgColor || 'white'};
    outline: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`

// Form Components --->

export const FormContainer = styled.div`
    animation: ${fadeInLt} 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    animation-delay: ${props => props.delay};
    /* max-height: 90%; */
    width: ${props => props.width || '70%'};
    /* height: 50%; */
    @media(max-width: 700px) {
        width: 95%;
        /* height: 50%; */
    }
    padding: 10px;
    border-radius: 15px;
    background-color: ${props => props.bgColor || 'transparent'};
    overflow: auto;
    box-sizing: border-box;
`

export const StForm = styled.form`
    display: grid;
    grid-template: ${props => props.gridTemplate};
    grid-gap: 0px 5px;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0px;
    background-color: rgba(255,255,255,0.6);
    border-radius: 10px;
`
export const StFormField = styled.div`
    grid-column: ${props => props.col};
    grid-row: ${props => props.row};
    margin: 0px;
    height: 100%;
`
export const StTextInput = styled.input`
    height: 100%;
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid grey;
    @media(max-height: 700px) {
        padding: 4px 10px;
    }
`
export const StSelect = styled(Select)`
    height: 100%;
    @media(max-height: 700px) {
        padding: 4px 10px;
    }
`
export const StTextArea = styled(TextArea)`
    height: 100%;
    @media(max-height: 700px) {
        padding: 4px 10px;
    }
`
export const StDrop = styled(Drop)`
    /* background-color: white; */
    border-radius: 15px;
    box-shadow: 0px 0px 11px -2px rgba(0,0,0,0.75);
    @media(max-height: 700px) {
        padding: 10px;
    }
`
export const CalInstructions = styled.span`
    display: block;
    margin: auto;
    width: 100%;
    padding: 10px;
    background-color: ${props => props.bgColor};
    border-radius: 10px;
    @media(orientation: portrait) {
        font-size: 0.8rem;
        line-height: 1rem;
    }
`
export const FlexRow = styled.div`
    grid-column: ${props => props.col};
    grid-row: ${props => props.row};
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,0.33);
    align-items: center;
    padding: 5px;
`