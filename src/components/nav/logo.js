import React, { useContext } from "react"
import styled from "styled-components"
import homeIcn from "../../Assets/Images/logo-v5-optimised.svg"
import { DataContext } from "../layoutComp"
import AniLink from "gatsby-plugin-transition-link/AniLink";

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
`

// const Title = styled.h2`
//     margin-bottom: 0px;
//     font-size: 1.9rem;
//     @media (max-width: 700px) {
//         font-size: 1.5rem;
//     }
// `
const Image = styled.img`
    height: 50px;
    @media(orientation: portrait) {
    ${props => props.location !== '/' && 'height: 30px;'}
    }
    transition: height 0.5s ease-out;
    align-self: flex-start;
    margin: 0px 10px 0px 0px;
`
// const TitleDiv = styled.div`
//     display: inline-block;
//     @media(orientation: portrait) {
//     ${props => props.location !== '/' && 'display: none'};
//     }
// `

export default () => {
    const {/*  displayTitle,  */homeLinkRef, location } = useContext(DataContext)
    // const titleArr = displayTitle.split(' ');
    return (
        <span ref={homeLinkRef}>
            <AniLink swipe direction="down" to="/">
                <Logo>
                    <Image src={homeIcn} alt="Moramba Self Catering Accommodation" location={location.pathname}/>
                    {/* <TitleDiv location={location.pathname}>
                        <Title>
                            <span style={{color: "#74abcc", fontWeight: "bold"}}>{titleArr.shift() + ' '}</span>{titleArr.map((word, idx) => idx !== titleArr.length -1? word + ' ': word)}
                        </Title>
                        <h1 style={{fontSize: '0.8rem', marginBottom: 0, color: "grey", textAlign: "justify", width: "100%"}}>Middelberg Manor</h1>
                    </TitleDiv> */}
                </Logo>
            </AniLink>
        </span>
    )
}
