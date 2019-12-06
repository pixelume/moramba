import React from "react"
import {
  Wrapper,
  Body,
  CenterBlock,
  ContentBlock100,
} from "../components/layout/contentBody"
import Div100vh from "react-div-100vh"
import { Carousel } from "grommet"
import styled from "styled-components"
import { graphql } from "gatsby";
import {FaStar, FaRegStar} from 'react-icons/fa';
import SwipeScrollWrapper from '../components/layout/swipeScrollWrapper';

const ReviewDiv = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  width: 85%;
  height: calc(100vh - 60px);
  margin: auto;
`

export default ({ data }) => {
  const reviews = data.site.siteMetadata.reviews;

  const renderStars = rating => {
    let stars = [];
    let i;
    for (i = 0; i < rating; i++) {
      stars.push(<FaStar key={`starSolid-${i}`} color="#FBBC06"/>);
    }
    if (rating < 5) {
      for (i=5-rating; i<4; i++) {
        stars.push(<FaRegStar key={`starReg-${i}`} color="#FBBC06"/>)
      }
    }
    return stars
  }

  return (
    <Div100vh>
      <SwipeScrollWrapper enqSbOpen={false}>
        <Wrapper color="#d1f1ff">
          <Body>
            <CenterBlock width="50%" height="100%">
              <h1>Reviews</h1>
              <ContentBlock100 flexFlow="column" columnOnPortrait>
              {/* <h3>Reviews Page Coming Soon... </h3> */}
                <Carousel fill play={8000}>
                  {reviews.map((review, idx) => (
                    <ReviewDiv key={`rev-${idx}`}>
                      <div><q><i>{review.review}</i></q></div>
                      <div style={{marginTop: 20}}>{renderStars(parseInt(review.rating))}</div>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 20}}>
                        <img src={review.pic} alt="reviewer pic" style={{display: 'block', borderRadius: '50%'}}/>
                        <div style={{height: 50, marginLeft: 15}}>{review.author}</div>
                      </div>
                    </ReviewDiv>
                  ))}
                </Carousel>
                <h3 style={{position: 'absolute', bottom: '25%'}}><a href="https://www.google.com/maps/place/Moramba+Self+Catering/@-33.9831097,25.5861662,16.64z/data=!4m5!3m4!1s0x1e7ad20da85be073:0x3c66fd549478ce19!8m2!3d-33.982591!4d25.588665">See all Google reviews... </a></h3>
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
    site {
      siteMetadata {
        reviews {
          author
          pic
          link
          rating
          review
        }
      }
    }
  }
`
