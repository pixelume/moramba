import React from 'react';
import {Wrapper, Body, ContentBlock50, ContentBlock100, CenterBlock} from '../components/layout/contentBody';
import Div100vh from 'react-div-100vh';
import noPageImg from '../Assets/Images/404.svg';
// import aboutImg from '../Assets/Images/about_us.jpg';
import styled, {css} from 'styled-components';
import {fadeInLt, fadeInRt} from '../animations';
// import SwipeScrollWrapper from '../components/layout/swipeScrollWrapper';
import { Link } from 'gatsby';

const StContentBlock50 = styled(ContentBlock50)`
    ${props => props.animDirection === 'right'
        ? css`animation: ${fadeInLt} 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;`
        : css`animation: ${fadeInRt} 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;`}
    animation-delay: ${props => props.delay || '0s'};
`
export default () => {
    return (
        <Div100vh>
            {/* <SwipeScrollWrapper enqSbOpen={false}> */}
                <Wrapper color="#ead1ff">
                    <Body>
                        <CenterBlock>
                            <h1 style={{fontSize: "6rem"}}>404</h1>
                            <ContentBlock100 columnOnPortrait>
                                <StContentBlock50 padding="10px" animDirection="right" delay="0.7s">
                                    <img style={{width: "100%"}} src={noPageImg} alt="404"/>
                                </StContentBlock50>
                                <StContentBlock50 delay="0.8s" flexFlow="column">
                                    <h2 style={{padding: 10, textAlign: 'left'}}>
                                        Oops... Whatever page you were looking for is not here, never was, never will be...
                                    </h2>
                                    <h3 style={{padding: 10, textAlign: 'left', width: "100%"}}>
                                        Go to our <Link to="/">Home Page</Link> in stead?
                                    </h3>
                                </StContentBlock50>
                            </ContentBlock100>
                        </CenterBlock>
                    </Body>
                </Wrapper>
            {/* </SwipeScrollWrapper> */}
        </Div100vh>
    )
}