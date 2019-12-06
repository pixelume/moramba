import React, { useContext } from "react"
import { DataContext } from "../components/layoutComp"
import { graphql } from "gatsby"
import PageLayout from "../components/layout/pageLayout"
import WithIcons from "../components/layout/withIcons"

export default ({ data }) => {
  const { unitDataArr } = useContext(DataContext)
  const mathemba = unitDataArr
    .filter(unit => unit.name === "Mathemba House")
    .pop()
  const { name, maxGuests, priceFrom, description } = mathemba
  const imgObjArray = data.allFile.nodes
  // const bookedDates = data.allIcal.nodes.map(node => node.end);
  return (
    <PageLayout
      bgColor="#b4ccda"
      unitName={name}
      icons={<WithIcons icons={mathemba} />}
      maxGuests={maxGuests}
      priceFrom={priceFrom}
      imgObjArray={imgObjArray}
      // bookedDates={bookedDates}
      description={description}
    />
  )
}

export const pageQuery = graphql`
  query {
    allFile(filter: {relativeDirectory: {eq: "mathemba"}}) {
      nodes {
        childImageSharp {
          fluid(maxHeight: 1280) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`