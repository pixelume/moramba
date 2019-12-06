import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { fadeInLt } from '../animations';
import styles from './calendar.module.css';

export const CalContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    animation: ${fadeInLt} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    animation-delay: ${props => props.delay};
    width: 100%;
    height: 50%;
    padding: 0px 10px;
`

export default ({delay, unit}) => {
    
    console.log(styles.wrapper);
    return (
    <CalContainer delay={delay}>
        <span>Availability:</span>
        <Calendar className={styles.wrapper}/>
    </CalContainer>
    )
    }