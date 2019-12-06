import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Swipeable } from "react-touch"

const FilmStrip = styled.div`
  height: 100%;
  width: ${props => parseInt(props.nrOfImages) * 70}vw;
  @media(orientation: portrait) {
    width: ${props => parseInt(props.nrOfImages) * 100}vw;
  }
  margin-left: ${props => parseInt(props.activeImg) * -100 || 0}%;
  overflow: show;
  transition: margin 0.5s ease-out;
`
const PicContainer = styled.div`
    width: 70vw;
    @media(orientation: portrait) {
      width: 100vw;
    }
    height: 100%;
    /* opacity: 0; */
    /* ${props => (props.active ? "opacity: 1;" : null)} */
    display: inline-block;
    transition: opacity 0.5s ease-out;
`
const NavDots = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10%;
  width: 100%;
  cursor: pointer;
`
const LargerImg = styled(Img)`
    height: 100%;
    @media(orientation: landscape) {
        width: calc(100% + 80px);
        margin-left: ${props => props.active? '-80px': '0px'};
        transition: margin 3s ease-out;
    }
    @media(orientation: portrait) {
        width: calc(100% + 150px);
        margin-left: ${props => props.active? '-150px': '0px'};
        transition: margin 7s ease-out;
    }
    /* width: calc(100% + 50px); */
`
const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 3px;
  border: 1px solid white;
  border-radius: 50%;
  background-color: ${props => (props.active ? "white" : "transparent")};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`
const NavArrow = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 0px 10px;
  height: 100%;
  top: 0px;
  font-size: 2rem;
  color: white;
  ${props => (props.left ? "left: 0px;" : "right: 0px;")};
  @media (min-width: 700px) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
  }
`
export default ({ imgObjArray }) => {
  const [currImg, setCurrImg] = useState(0)
  let leftRef = useRef(null)
  let rightRef = useRef(null)

  const dotClickHandler = idx => {
    setCurrImg(idx)
  }

  const keypressHandler = e => {
    if (e.key === "ArrowLeft") {
      leftRef.current.click()
    } else if (e.key === "ArrowRight") {
      rightRef.current.click()
    } else return null
  }

  useEffect(() => {
    window.addEventListener("keydown", keypressHandler)
    return () => {
      window.removeEventListener("keydown", keypressHandler)
    }
  }, [])

  const handleSwipeLeft = () => {
    rightRef.current.click()
  }
  const handleSwipeRight = () => {
    leftRef.current.click()
  }

  return (
    <Swipeable onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <FilmStrip nrOfImages={imgObjArray.length} activeImg={currImg}>
          {imgObjArray.map((imgObj, idx) => (
            <PicContainer
              key={`im-${idx}`}
              nrOfImages={imgObjArray.length}
            //   active={idx === currImg}
            >
              {idx < imgObjArray.length - 2 && <LargerImg fit="cover" style={{position: 'absolute', opacity: 0}} fluid={imgObjArray[idx+1].childImageSharp.fluid} />}
              <LargerImg active={idx === currImg} fit="cover" fluid={imgObj.childImageSharp.fluid} />
            </PicContainer>
          ))}
        </FilmStrip>
        <NavDots>
          {imgObjArray.map((imgObj, idx) => (
            <div key={`dot${idx}`} onClick={() => dotClickHandler(idx)}>
              <Dot active={currImg === idx} />
            </div>
          ))}
        </NavDots>
        <NavArrow
          ref={leftRef}
          left
          onClick={
            currImg > 0
              ? () => dotClickHandler(currImg - 1)
              : () => dotClickHandler(imgObjArray.length - 1)
          }
        >
          〈
        </NavArrow>
        <NavArrow
          ref={rightRef}
          onClick={
            currImg < imgObjArray.length - 1
              ? () => dotClickHandler(currImg + 1)
              : () => dotClickHandler(0)
          }
        >
          〉
        </NavArrow>
      </div>
    </Swipeable>
  )
}
