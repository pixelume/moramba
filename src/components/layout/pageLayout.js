import React, { useState } from "react"
import {
  Wrapper,
  Body,
  ContentBlock100,
  ContentBlock30,
  ContentBlock70,
  IconBar,
  EnqSidebar,
  BlackBtn,
  CloseBtn,
} from "./contentBody"
import { FaCalendarAlt, FaAlignJustify } from "react-icons/fa"
import "spiketip-tooltip/spiketip.min.css"
import Carousel2 from "../Carousel2"
import BookingForm2 from "../bookingForm2"
import Div100vh from "react-div-100vh"
import TextSeparator from "./textSeparator"
import styled from "styled-components"
import SwipeScrollWrapper from "./swipeScrollWrapper"
// import { Carousel } from 'grommet';
// import Img from 'gatsby-image';

const StCloseBtn = styled(CloseBtn)`
  box-shadow: 0px 0px 20px -9px rgba(0, 0, 0, 0.75);
  @media (max-width: 700px) {
    bottom: 10px;
    /* left: 50%; */
  }
  @media (min-width: 701px) {
    right: 50px;
    top: 30px;
  }
`
export default ({
  bgColor,
  unitName,
  icons,
  maxGuests,
  priceFrom,
  description,
  imgObjArray,
  bookedDates,
}) => {
  const [enqSbOpen, setEnqSbOpen] = useState(false)
  const [sbContent, setSbContent] = useState("description")
  const toggleSbHandler = content => {
    if (!enqSbOpen) {
      setEnqSbOpen(true)
    } else {
      if (content === sbContent) {
        setEnqSbOpen(false)
      }
    }
    setSbContent(content)
  }

  return (
    <Div100vh>
      <SwipeScrollWrapper enqSbOpen={enqSbOpen}>
        <Wrapper>
          <Body>
            <ContentBlock100 style={{ backgroundColor: bgColor }}>
              <ContentBlock30
                position="absolute"
                flexFlow="column"
                style={{ left: "0px", bottom: "0px" }}
              >
                <h2 style={{ margin: "0.4rem" }}>{unitName}</h2>
                <h3
                  style={{ margin: "0.4rem" }}
                >{`Max ${maxGuests} Guests | From R${priceFrom}/night`}</h3>
                <IconBar style={{ margin: "0.4rem" }}>{icons}</IconBar>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <BlackBtn
                    type="button"
                    onClick={() => toggleSbHandler("bookingForm")}
                  >
                    <span style={{ marginRight: "8px" }}>
                      <FaCalendarAlt />
                    </span>
                    <span>Enquire</span>
                  </BlackBtn>
                  <BlackBtn
                    type="button"
                    onClick={() => toggleSbHandler("description")}
                  >
                    <span style={{ marginRight: "8px" }}>
                      <FaAlignJustify />
                    </span>
                    <span>Full description</span>
                  </BlackBtn>
                </div>
              </ContentBlock30>
              <ContentBlock70
                position="absolute"
                style={{ right: "0px", top: "0px", overflow: "show" }}
              >
                <Carousel2 imgObjArray={imgObjArray} />
                {/* <Carousel style={{height: "100%", width: "100%"}}>
                                    {imgObjArray.map((imgObj, idx) => <Img key={`im-${idx}`} fit="cover" fluid={imgObj.childImageSharp.fluid}/>)}
                                </Carousel> */}
                <EnqSidebar open={enqSbOpen}>
                  {/* {enqSbOpen && <Calendar delay='0.5s' unit={unitName}/>} */}
                  {sbContent === "bookingForm" && (
                    <BookingForm2
                      delay="0.25s"
                      bgColor={bgColor}
                      maxGuests={maxGuests}
                      bookedDates={bookedDates}
                      unitName={unitName}
                    />
                  )}
                  {sbContent === "description" && (
                    <div style={{ maxHeight: "80%", overflow: "auto" }}>
                      <h2>Self Catering Cottage for {maxGuests} guests</h2>
                      {description.map((paragraph, idx) => (
                        <React.Fragment key={`p-${idx}`}>
                          {idx !== 0 && <TextSeparator color={bgColor} />}
                          <p
                            style={{
                              maxWidth: "90%",
                              margin: "auto",
                              textAlign: "left",
                            }}
                          >
                            {paragraph}
                          </p>
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                  <StCloseBtn onClick={() => setEnqSbOpen(false)}>
                    &times; Close
                  </StCloseBtn>
                </EnqSidebar>
              </ContentBlock70>
            </ContentBlock100>
          </Body>
        </Wrapper>
      </SwipeScrollWrapper>
    </Div100vh>
  )
}
