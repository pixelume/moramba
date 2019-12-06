import React, { useState, useEffect, useRef, useContext } from "react"
import styled, { css, keyframes } from "styled-components"
// import Layout from '../components/layoutComp';
import {
  Wrapper,
  Body,
  ContentBlock100,
  ContentBlock20,
} from "../components/layout/contentBody"
import { /*  fadeInOut,  */ moveVert, moveHoriz, pulsate } from "../animations"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Div100vh from "react-div-100vh"
import { Swipeable, defineSwipe } from "react-touch"
import { DataContext } from "../components/layoutComp"

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const fadeIn = keyframes`
  0% {opacity: 0}
  100%{opacity: 1}
`
const fadeOut = keyframes`
  0% {opacity: 1}
  100%{opacity: 0}
`

const fadeInOut = keyframes`
    0% {
        opacity: 0;
    }
    2% {
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    98% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`

const StContentBlock20 = styled(ContentBlock20)`
  @media (orientation: landscape) {
    animation: ${moveVert} 100s linear infinite;
  }
  @media (orientation: portrait) {
    animation: ${moveHoriz} 30s linear infinite;
  }
`

const Message = styled.h3`
  animation: ${fadeInOut} 3s linear;
  width: 100%;
  @media (orientation: landscape) {
    width: 90%;
  }
  font-size: 1.8rem;
`

const StImg = styled(Img)`
  height: 100%;
  width: 100%;
  @media (orientation: portrait) {
    width: 100%;
    height: 100%;
  }
  animation: ${fadeIn} 1s ease-out forwards;
  ${({animating}) => animating? css`animation: ${fadeOut} 1s ease-out forwards;`: null}
`
const ImgContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  right: 0px;
`

const NextPageBtn = styled.button`
  position: fixed;
  color: red;
  right: 2%;
  bottom: 2%;
  display: block;
  padding: 10px;
  outline: none;
  border: none;
  background-color: transparent;
  animation: ${pulsate} 1s ease-in-out infinite;
  cursor: pointer;
`

export const swipe = defineSwipe({ swipeDistance: 70 })

export default ({ data }) => {
  // console.log(data);
  const { pageLinkRefs, location, navData } = useContext(DataContext)
  const [msgCount, setMsgCount] = useState(0)
  const [imageCount, setImageCount] = useState(0)

  const [animating, setAnimating] = useState(false)

  const locations = navData.map(item => item.link)
  const swipeUpHandler = () => {
    const nextPageIndex = locations.indexOf(location.pathname) + 1
    if (nextPageIndex < locations.length - 1) {
      pageLinkRefs[nextPageIndex].current.firstChild.click()
    }
  }
  const swipeDownHandler = () => {
    const nextPageIndex = locations.indexOf(location.pathname) - 1
    if (nextPageIndex >= 0) {
      pageLinkRefs[nextPageIndex].current.firstChild.click()
    }
  }

  const incrMsgCount = () => {
    if (msgCount < 5) {
      setMsgCount(msgCount => msgCount + 1)
    } else {
      setMsgCount(0)
    }
  }

  useInterval(() => {
    incrImageCount()
  }, 7500)

  const scrollHandler = e => {
    if (e.deltaY < 0) swipeDownHandler()
    else swipeUpHandler()
  }

  useEffect(() => {
    window.addEventListener("mousewheel", scrollHandler)
    return () => {
      window.removeEventListener("mousewheel", scrollHandler)
    }
  })

  const incrImageCount = () => {
    // fade out
    setAnimating(true);
    setTimeout(() => {
      if (imageCount < data.allFile.nodes.length - 1) {
        setImageCount(imageCount => imageCount + 1)
      } else {
        setImageCount(0)
      }
      setAnimating(false)
    }, 1000)
  }

  const imgObjArr = data.allFile.nodes
  return (
    <Div100vh>
      <Swipeable
        config={swipe}
        onSwipeUp={swipeUpHandler}
        onSwipeDown={swipeDownHandler}
      >
        <Wrapper>
          <Body>
            <ContentBlock100 padding="0px" display="block">
              <ImgContainer /* onAnimationEnd={incrImageCount} */>
                <StImg fluid={imgObjArr[imageCount].childImageSharp.fluid} animating={animating}/>
              </ImgContainer>
              <StContentBlock20
                position="absolute"
                style={{
                  bottom: "0px",
                  right: "0px",
                  backgroundColor: "rgba(255, 255, 255, 0.7",
                }}
              >
                {msgCount === 0 && (
                  <Message onAnimationEnd={incrMsgCount}>
                    Comfortable, stylish &amp; contemporary
                  </Message>
                )}
                {msgCount === 1 && (
                  <Message onAnimationEnd={incrMsgCount}>
                    Self catering accommodation in PE
                  </Message>
                )}
                {msgCount === 2 && (
                  <Message onAnimationEnd={incrMsgCount}>
                    Close to the Airport
                  </Message>
                )}
                {msgCount === 3 && (
                  <Message onAnimationEnd={incrMsgCount}>
                    Free Wifi. Premium DSTV.
                  </Message>
                )}
                {msgCount === 4 && (
                  <Message onAnimationEnd={incrMsgCount}>
                    Sit back &amp; relax
                  </Message>
                )}
                {msgCount === 5 && (
                  <Message onAnimationEnd={incrMsgCount}>
                    Your home away from home
                  </Message>
                )}
              </StContentBlock20>
            </ContentBlock100>
            <AniLink swipe direction="up" to={navData[0].link}>
              <NextPageBtn>
                Our Units
                <br /> ⤵
              </NextPageBtn>
            </AniLink>
          </Body>
        </Wrapper>
      </Swipeable>
    </Div100vh>
  )
}

export const pageQuery = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        name: { regex: "/-feat/" }
      }
    ) {
      nodes {
        childImageSharp {
          fluid(maxHeight: 1280) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  }
`
