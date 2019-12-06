import React, { useState, useEffect } from "react"
import {
  FormContainer,
  StForm,
  StFormField,
  StTextInput,
  StTextArea,
} from "../components/layout/contentBody"
import { BlackBtn } from "./layout/contentBody"
import { FaPaperPlane } from "react-icons/fa"
import moment from "moment"
import { getFirebase } from "../fireb"
import axios from "axios"

let db = null

export default ({ delay, bgColor, width }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNr, setPhoneNr] = useState("")
  const [comments, setComments] = useState("")
  const [processingForm, setProcessingForm] = useState(false)
  const [formCarrySubmStatus, setFormCarrySubmStatus] = useState(null)

  useEffect(() => {
    const lazyApp = import("firebase/app")
    const lazyDatabase = import("firebase/database")

    Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
      db = getFirebase(firebase).database()
    })
  }, [])

  const formSubmitHandler = e => {
    setProcessingForm(true);
    e.preventDefault()
    const timeStamp = moment().format()
    db.ref(`contactSubmissions/${timeStamp}`).set({
      name,
      email,
      phoneNr,
      comments,
    })
    // .then(() => { // Temp until Formcarry is set up for Middelberg Manor. Remove then block after setup
    //   setFormCarrySubmStatus("success")
    //   setProcessingForm(false)
    // })

    axios
      .post(
        "https://formcarry.com/s/nW_ia5zmWNF",
        {
          Name: name,
          email: email,
          Phone: phoneNr,
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
    setComments("")
    setProcessingForm(false)
    setFormCarrySubmStatus(null)
  }

  return (
    <FormContainer delay={delay} bgColor={bgColor} width={width}>
      {!formCarrySubmStatus && !processingForm && (
        <StForm
          onSubmit={formSubmitHandler}
          gridTemplate="repeat(3, 16.66%) 1fr 16.66% / repeat(4, 1fr)"
        >
          <StFormField row="1/2" col="1/span 4">
            <StTextInput
              name="name"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </StFormField>
          <StFormField row="2/3" col="1/span 4">
            <StTextInput
              name="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </StFormField>
          <StFormField row="3/4" col="1/span 4">
            <StTextInput
              name="phoneNr"
              placeholder="Tel nr"
              value={phoneNr}
              onChange={e => setPhoneNr(e.target.value)}
            />
          </StFormField>
          <StFormField row="4/5" col="1/span 4">
            <StTextArea
              placeholder="Comments"
              value={comments}
              onChange={e => setComments(e.target.value)}
            />
          </StFormField>
          <BlackBtn
            style={{
              gridRow: "5/6",
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
      )}
      {formCarrySubmStatus && (formCarrySubmStatus !== "error") ? (
        <>
          <h2 style={{ padding: 15 }}>
            Thank you for contacting us. We will get back to you shortly.
          </h2>
          <BlackBtn style={{ margin: "auto" }} onClick={resetForm}>
            Send another message
          </BlackBtn>
        </>
      ) : formCarrySubmStatus === "error" && (
        <>
          <h2 style={{ padding: 15 }}>There was an error.</h2>
          <BlackBtn style={{ margin: "auto" }} onClick={resetForm}>
            Try Again?
          </BlackBtn>
        </>
      )}
      {processingForm && <h2 style={{ padding: 15 }}>Sending Message, Please Wait...</h2>}
    </FormContainer>
  )
}
