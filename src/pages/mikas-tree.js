import React, { useContext } from "react"
import { DataContext } from "../components/layoutComp"
import { graphql } from "gatsby"
import PageLayout from "../components/layout/pageLayout"
import WithIcons from "../components/layout/withIcons"

export default ({ data }) => {
  const { unitDataArr } = useContext(DataContext)
  const mikasTree = unitDataArr
    .filter(unit => unit.name === "Mikas Tree")
    .pop()
  const { name, maxGuests, priceFrom, description } = mikasTree
  const imgObjArray = data.allFile.nodes
  // const bookedDates = data.allIcal.nodes.map(node => node.end);
  return (
    <PageLayout
      bgColor="#DAB4B4"
      unitName={name}
      icons={<WithIcons icons={mikasTree} />}
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
    allFile(filter: {relativeDirectory: {eq: "mikasTree"}}) {
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