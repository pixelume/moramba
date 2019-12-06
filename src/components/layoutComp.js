import React, { useState, createContext, useRef } from "react"
// import styled from 'styled-components';
import Header from "./layout/header"
import Footer from "./layout/footer"
// import ContentBody from './layout/contentBody'
import MainNav from "./nav/mainNav"
import Logo from "./nav/logo"
import { graphql, useStaticQuery } from "gatsby"
// import { Helmet } from "react-helmet"
import SEO from './seo';
import "./layoutComp.css"
// import unitsData from "../Data/unitsData"

export const DataContext = createContext()

export default ({ children, location }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const year = new Date().getFullYear()
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          displayTitle
          author
          address
          phone1
          phone2
          navData {
            label
            link
          }
          unitDataArr {
            name
            maxGuests
            priceFrom
            parking
            dstv
            wifi
            kitchen
            description
            fireplace
            livingRoom
            pool
          }
        }
      }
    }
  `)

  const {
    title,
    displayTitle,
    author,
    address,
    phone1,
    phone2,
    navData,
    unitDataArr
  } = data.site.siteMetadata
  const pageLinkRefs = navData.map(() => useRef(null))
  const homeLinkRef = useRef(null)

  return (
    <>
      {/* <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Indie+Flower"
          rel="stylesheet"
        />
      </Helmet> */}
      <SEO/>
      <DataContext.Provider
        value={{
          unitDataArr,
          title,
          displayTitle,
          address,
          phone1,
          phone2,
          author,
          navData,
          pageLinkRefs,
          homeLinkRef,
          location,
        }}
      >
        <Header
          location={location}
          content={
            <>
              <Logo /* title={title} */ />
              <MainNav /* location={location} */
                /* menuData={navData} */
                barsClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              />
            </>
          }
        />
        {children}
        <Footer
          content={
            <div>
              © {data.site.siteMetadata.author} {year}
            </div>
          }
        />
      </DataContext.Provider>
    </>
  )
}
