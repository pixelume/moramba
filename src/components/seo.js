import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export default () => {

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          keywords
        }
      }
    }
  `)

  const {title, description, keywords} = data.site.siteMetadata;

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={title}
      meta={[
        {
          name: "description",
          content: description
        },
        {
          name: "keywords",
          content: keywords
        },
        // {
        //   name: "google-site-verification",
        //   content: "WrHQWV-vPEPU1h8u_SMH4jP5_oEAMrtbMm2htN59kFc"
        // },
      ]
    }
    />
  )
}
