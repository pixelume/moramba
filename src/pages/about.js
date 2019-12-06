import React from "react"
import {
  Wrapper,
  Body,
  ContentBlock50,
  ContentBlock100,
  CenterBlock,
} from "../components/layout/contentBody"
import Div100vh from "react-div-100vh"
// import aboutImg from "../Assets/Images/about_us.jpg"
import styled, { css } from "styled-components"
import { fadeInLt, fadeInRt } from "../animations"
import SwipeScrollWrapper from "../components/layout/swipeScrollWrapper"
import {graphql} from "gatsby"
import Img from 'gatsby-image';

const StContentBlock50 = styled(ContentBlock50)`
    ${props =>
      props.animDirection === "right"
        ? css`
            animation: ${fadeInLt} 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
          `
        : css`
            animation: ${fadeInRt} 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
          `}
    animation-delay: ${props => props.delay || "0s"};
    @media(orientation: portrait) {
      overflow-y: auto;
      height: ${({portHeight}) => portHeight || '50%'}
    }
`
const StP = styled.p`
  @media (orientation: portrait) {
    font-size: 0.8rem;
  }
`

const StImg = styled(Img)`
  display: block;
  border: 5px solid white;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  box-shadow: 3px 3px 10px -4px rgba(0,0,0,0.75);
  box-sizing: border-box;
  flex-grow: 1;
`

// const StImg = styled.img`
//   @media (orientation: portrait) {
//     display: block;
//     object-fit: contain;
//   }
// `

export default ({data}) => {
  return (
    <Div100vh>
      <SwipeScrollWrapper enqSbOpen={false}>
        <Wrapper color="#ead1ff">
          <Body>
            <CenterBlock>
              <h1>About Us</h1>
              <ContentBlock100 columnOnPortrait>
                <StContentBlock50
                  padding="10px"
                  animDirection="right"
                  delay="0.7s"
                  // portHeight="30%"
                >
                  <StImg
                    // src={aboutImg}
                    alt=""
                    fluid={data.file.childImageSharp.fluid}
                  />
                </StContentBlock50>
                <StContentBlock50 
                  delay="0.8s" 
                  // portHeight="55%"
                >
                  <StP style={{ padding: 10, textAlign: "left" }}>
                  This is my wife Ester, my daughter and myself. My wife and I share a love for property. We love renovating and upgrading properties. We love creating new spaces and decorating them. We started the little self catering business by renovating and converting the garden cottage of the property we bought approximately 6 years ago just as an experiment and because we love renovating. It kind of took of from there and pretty soon we had a second unit, third unit, fourth unit and now a fifth unit and we're still loving it...
                  </StP>
                </StContentBlock50>
              </ContentBlock100>
            </CenterBlock>
          </Body>
        </Wrapper>
      </SwipeScrollWrapper>
    </Div100vh>
  )
}

export const pageQuery = graphql`
  query {
    file(sourceInstanceName: {eq: "images"}, name: {eq: "about"}) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`