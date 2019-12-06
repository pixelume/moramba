import React, { useState, useRef, useEffect } from "react"
// import styled from 'styled-components';
import { Calendar } from "grommet"
import {
  FormContainer,
  StForm,
  StFormField,
  StTextInput,
  StSelect,
  StTextArea,
  StDrop,
  CalInstructions,
  FlexRow,
} from "../components/layout/contentBody"
import { BlackBtn } from "./layout/contentBody"
import { FaPaperPlane, FaCalendarAlt } from "react-icons/fa"
import moment from "moment"
import { CloseBtn } from "../components/layout/contentBody"
import { getFirebase } from "../fireb"
import axios from "axios"

let db = null

export default ({ delay, bgColor, maxGuests, bookedDates, unitName }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNr, setPhoneNr] = useState("")
  const [adults, setAdults] = useState("2")
  const [children, setChildren] = useState("0")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [comments, setComments] = useState("")
  const [checkInSelect, setCheckInSelect] = useState(false)
  // const [checkOutSelect, setCheckOutSelect] = useState(false);
  const [dates, setDates] = useState([])
  const [processingForm, setProcessingForm] = useState(false)
  const [formCarrySubmStatus, setFormCarrySubmStatus] = useState(null)

  // const bookedDates = dateNodes.map(node => node.end)

  const checkInRef = useRef(null)
  // const checkOutRef = useRef(null);

  useEffect(() => {
    const lazyApp = import("firebase/app")
    const lazyDatabase = import("firebase/database")

    Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
      db = getFirebase(firebase).database()
      // do something with `database` here,
      // or store it as an instance variable or in state
      // to do stuff with it later
    })
  }, [])

  const formSubmitHandler = e => {
    setProcessingForm(true);
    e.preventDefault()
    const timeStamp = moment().format()
    db.ref(`enquiries/${timeStamp}`).set({
      name,
      email,
      phoneNr,
      unit: unitName,
      adults,
      children,
      checkIn,
      checkOut,
      // dates,
      comments,
    })
    // .then(() => { // Temp until Formcarry is set up for Middelberg Manor. Remove then block after setup
    //   setFormCarrySubmStatus("success")
    //   setProcessingForm(false)
    // })

    // Static Form Provider here

    axios
      .post(
        "https://formcarry.com/s/nW_ia5zmWNF",
        {
          Name: name,
          email: email,
          Phone: phoneNr,
          Unit: unitName,
          Adults: adults,
          Children: children,
          Checkin: checkInMoment.format("DD MMM YY"),
          Checkout: checkOutMoment.format("DD MMM YY"),
          Days: nrOfDays,
          Comments: comments,
        },
        {
          headers: { Accept: "application/json" },
        }
      )
      .then(res => {
        // console.log(res);
        setFormCarrySubmStatus(res)
      })
      .then(() => setProcessingForm(false))
      .catch(error => {
        setFormCarrySubmStatus("error")
      })
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setPhoneNr("")
    setAdults("2")
    setChildren("0")
    setCheckIn("")
    setCheckOut("")
    setComments("")
    setCheckInSelect("")
    setProcessingForm(false)
    setFormCarrySubmStatus(null)
  }

  const selectDates = selectedDate => {
    // const datesCopy = [...dates]
    if (!dates.includes(selectedDate)) {
      if (dates.length <= 1) {
        setDates([...dates, selectedDate])
      }
    } else {
      // date already selected -> remove from array
      if (dates.length === 1) {
        setDates([])
      } else {
        switch (dates.indexOf(selectedDate)) {
          case 0:
            setDates([dates[1]])
            break
          case 1:
            setDates([dates[0]])
            break
          default:
            break
        }
      }
    }
  }

  // const selectDates = nextDate => {
  //     const datesCopy = [...dates]
  //     if (!(datesCopy.includes(nextDate))) {
  //         setDates([...dates, nextDate])
  //     } else {
  //         if (dates.length <= 1) {
  //             setDates([])
  //         } else {
  //             setDates(datesCopy.slice(0, datesCopy.indexOf(nextDate))
  //                 .concat([datesCopy].slice(datesCopy.indexOf(nextDate)+1)))
  //         }
  //     }
  // }

  const dropCloseHandler = () => {
    setCheckInSelect(false)
    setCheckIn([...dates].sort().shift())
    setCheckOut([...dates].sort().pop())
  }

  let nrOfguestsOptions = []
  for (let i = 0; i < maxGuests; i++) {
    nrOfguestsOptions.push(`${i + 1}`)
  }

  const checkInMoment = moment(checkIn)
  const checkOutMoment = moment(checkOut)
  const nrOfDays = checkOutMoment.diff(checkInMoment, "days")

  return (
    <FormContainer delay={delay} bgColor={bgColor}>
      {!formCarrySubmStatus && !processingForm && (
        <form
          onSubmit={formSubmitHandler}
          style={{ height: "100%", margin: 0 }}
        >
          <StForm gridTemplate="repeat(3, 11.11%) 22.22% 11.11% 22.22% 11.11% / repeat(4, 1fr)">
            <StFormField row="1/2" col="1/span 4">
              <StTextInput
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </StFormField>
            <StFormField row="2/3" col="1/span 4">
              <StTextInput
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </StFormField>
            <StFormField row="3/4" col="1/span 4">
              <StTextInput
                name="phoneNr"
                type="text"
                placeholder="Tel nr"
                value={phoneNr}
                onChange={e => setPhoneNr(e.target.value)}
              />
            </StFormField>
            <StFormField row="4/5" col="1/span 2">
              Adults
              <StSelect
                name="adults"
                options={nrOfguestsOptions}
                value={adults}
                onChange={({ option }) => setAdults(option)}
              />
            </StFormField>
            <StFormField row="4/5" col="3/span 2">
              Children
              <StSelect
                name="children"
                options={
                  maxGuests - adults === 1
                    ? ["0", "1"]
                    : ["0"].concat(
                        nrOfguestsOptions.slice(1, maxGuests - parseInt(adults))
                      )
                }
                value={children}
                onChange={({ option }) => setChildren(option)}
              />
            </StFormField>
            <FlexRow row="5/6" col="1/span 4">
              <BlackBtn
                style={{ maxWidth: "25%" }}
                type="button"
                ref={checkInRef}
                // placeholder="Check in"
                // value={checkIn}
                onClick={() => setCheckInSelect(true)}
                // onChange={e => setCheckIn(e.target.value)}
              >
                <span style={{ marginRight: "8px" }}>
                  <FaCalendarAlt />
                </span>
                Dates
              </BlackBtn>
              {checkInSelect && (
                <StDrop
                  onClickOutside={dropCloseHandler}
                  onEsc={dropCloseHandler}
                  align={{ middle: "bottom", left: "left" }}
                  target={checkInRef.current}
                  background="white"
                >
                  <>
                    <CalInstructions bgColor={bgColor}>
                      Select your Check-in &amp; Check-out dates
                      <CloseBtn
                        onClick={dropCloseHandler}
                        pos="top: 8px; right: 8px;"
                      >
                        &times;
                      </CloseBtn>
                    </CalInstructions>
                    <Calendar
                      showAdjacentDays={false}
                      // disabled={bookedDates}
                      dates={dates}
                      size={
                        window.matchMedia("(max-width: 700px)").matches
                          ? "small"
                          : "medium"
                      }
                      // onSelect={nextDate => checkIn !== nextDate? setCheckIn(nextDate): setCheckIn('')}
                      onSelect={selectDates}
                    />
                    <CloseBtn
                      bgColor={bgColor}
                      style={{ position: "static", margin: "auto" }}
                      onClick={dropCloseHandler}
                    >
                      Done
                    </CloseBtn>
                  </>
                </StDrop>
              )}
              <span
                style={{
                  maxWidth: "25%",
                  fontSize: "0.8rem",
                  lineHeight: "1rem",
                }}
              >
                <strong>
                  In:
                  <br />
                </strong>
                {`${checkInMoment.format("DD MMM YY")}`}
              </span>
              <span
                style={{
                  maxWidth: "25%",
                  fontSize: "0.8rem",
                  lineHeight: "1rem",
                }}
              >
                <strong>
                  Out:
                  <br />
                </strong>{" "}
                {`${checkOutMoment.format("DD MMM YY")}`}
              </span>
              <span
                style={{
                  maxWidth: "20%",
                  fontSize: "0.8rem",
                  lineHeight: "1rem",
                }}
              >
                <strong>
                  Days:
                  <br />
                </strong>{" "}
                {` ${nrOfDays}`}
              </span>
            </FlexRow>
            <StFormField row="6/7" col="1/span 4">
              <StTextArea
                placeholder="Comments"
                value={comments}
                onChange={e => setComments(e.target.value)}
              />
            </StFormField>
            <BlackBtn
                style={{
                  gridRow: "7/8",
                  gridColumn: "1/span2",
                  width: "80%",
                  justifySelf: "center",
                  alignSelf: "center",
                }}
                type="submit"
              >
                <span style={{ marginRight: "8px" }}>
                  <FaPaperPlane />
                </span>
                Send
              </BlackBtn>
          </StForm>
        </form>
      )}
      {formCarrySubmStatus && (formCarrySubmStatus !== "error") ? (
        <>
          <h2 style={{ padding: 15 }}>
            Thank you for your enquiry. We will get back to you shortly.
          </h2>
          <BlackBtn style={{ margin: "auto" }} onClick={resetForm}>
            Enquire Again?
          </BlackBtn>
        </>
      ) : formCarrySubmStatus === "error" && (
        <>
          <h2 style={{ padding: 15 }}>There was an error.</h2>
          <BlackBtn style={{ margin: "auto" }} onClick={resetForm}>
            Enquire Again?
          </BlackBtn>
        </>
      )}
      {processingForm && <h2 style={{ padding: 15 }}>Sending Enquiry, Please Wait...</h2>}
    </FormContainer>
  )
}
