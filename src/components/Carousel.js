import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
// import {StImg} from '../pages/index';
import {UnitImg} from '../components/layout/contentBody';
import {Swipeable} from 'react-touch';

const NavDots = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 10%;
    width: 100%;
    cursor: pointer;
`
const Dot = styled.div`
    width: 10px;
    height: 10px;
    margin: 3px;
    border: 1px solid white;
    border-radius: 50%;
    background-color: ${props => props.active? 'white': 'transparent'};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
`
const NavArrow = styled.div`
    position: absolute;
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding: 0px 10px;
    /* width: 15px; */
    height: 100%;
    top: 0px;
    font-size: 2rem;
    color: white;
    ${props => props.left? 'left: 0px;': 'right: 0px;'};
    @media(min-width: 700px) {
        &:hover {
            background-color: rgba(0,0,0,0.3);
            cursor: pointer;
        }
    }
`


export default ({imgObjArray}) => {
    const [imgCount, setImgCount] = useState(0);
    const [animateOut, setAnimateOut] = useState(false);
    const [nextImg, setNextImg] = useState(0);
    // const [bgImg, setbgImage] = useState(0)
    let leftRef = useRef(null);
    let rightRef = useRef(null);

    const dotClickHandler = (idx) => {
        setAnimateOut(true);
        // setbgImage(idx);
        setNextImg(idx);
        // setTimeout(() => setImgCount(idx), 1000)
    }

    useEffect(() => {
        if (animateOut) {
            setTimeout(() => {
                setAnimateOut(false);
                setImgCount(nextImg);
            }, 480)
        }
    }, [animateOut])

    const keypressHandler = (e) => {
        if (e.key === 'ArrowLeft') {
            leftRef.current.click();
            // if (imgCount > 1) {
            //     dotClickHandler(imgCount - 1);
            // } else {
            //     dotClickHandler(imgObjArray.length - 1);
            // }
        } else if (e.key === 'ArrowRight') {
            rightRef.current.click();
            // if (imgCount < (imgObjArray.length - 1)) {
            //     dotClickHandler(imgCount + 1)
            // } else {
            //     dotClickHandler(0)
            // };
        } else return null;
    }

    useEffect(() => {
        window.addEventListener('keydown', keypressHandler);
        return () => {
            window.removeEventListener('keydown', keypressHandler);
        };
    }, [])

    const handleSwipeLeft = () => {
        rightRef.current.click();
    }
    const handleSwipeRight = () => {
        leftRef.current.click();
    }

    return (
        <Swipeable
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
        >
            <div style={{display: 'flex', position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', overflow: 'show'}}>
                <UnitImg bg style={{position: 'absolute'}} fluid={imgObjArray[nextImg].childImageSharp.fluid}/>
                <UnitImg fluid={imgObjArray[imgCount].childImageSharp.fluid} animateOut={animateOut}/>
                <NavDots>
                    {imgObjArray.map((imgObj, idx) =>
                        <div key={`dot${idx}`} onClick={() => dotClickHandler(idx)} ><Dot active={nextImg === idx}/></div>)}
                </NavDots>
                <NavArrow
                    ref={leftRef}
                    left
                    onClick={imgCount > 1? () => dotClickHandler(imgCount - 1): () => dotClickHandler(imgObjArray.length - 1)}
                >
                〈
                </NavArrow>
                <NavArrow
                    ref={rightRef}
                    onClick={imgCount < imgObjArray.length - 1? () => dotClickHandler(imgCount + 1): () => dotClickHandler(0)}
                >
                〉
                </NavArrow>
            </div>
        </Swipeable>
    )
} 
