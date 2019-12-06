import React, {useContext} from 'react';
import {Wrapper, Body, CenterBlock, ContentBlock100, ContentBlock50} from '../components/layout/contentBody';
import Div100vh from 'react-div-100vh';
import SwipeScrollWrapper from '../components/layout/swipeScrollWrapper';
import ContactForm from '../components/contactForm';
import styled, {css} from 'styled-components';
import {fadeInLt, fadeInRt} from '../animations';
import { DataContext } from '../components/layoutComp';
import {FaMapMarkerAlt, FaPhone} from 'react-icons/fa';

const StContentBlock50 = styled(ContentBlock50)`
    ${props => props.animDirection === 'right'
        ? css`animation: ${fadeInLt} 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;`
        : css`animation: ${fadeInRt} 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;`}
    animation-delay: ${props => props.delay || '0s'};
`

const AddressItem = styled.span`
    display: block;
    padding: 0px 10px;
`

export default () => {
    const {title, address, phone1, phone2} = useContext(DataContext);
    return (
        // <Layout>
            <Div100vh>
                <SwipeScrollWrapper enqSbOpen={false}>
                    <Wrapper>
                        <Body>
                            <CenterBlock width="60%" height="100%">
                                {/* <h1>Contact Us</h1> */}
                                <ContentBlock100 columnOnPortrait justifyOnColumn="flex-end" alignItems="center">
                                    <StContentBlock50 delay="0.8s">
                                        <div style={{border: '10px solid #ffd1d1', borderRadius: 15}}>
                                        <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.387216940325!2d25.586476315390417!3d-33.98258653240516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e7ad20da85be073%3A0x3c66fd549478ce19!2sMoramba+Self+Catering!5e0!3m2!1sen!2sza!4v1557923715293!5m2!1sen!2sza" width="325" height="219" frameBorder="0"/*  style={{border: 0}} */ allowFullScreen></iframe>
                                        </div>
                                    </StContentBlock50>
                                    <StContentBlock50 padding="10px" animDirection="right" delay="0.7s" flexFlow="column">
                                            <ContactForm width="100%" bgColor="#ffd1d1"/>
                                    </StContentBlock50>
                                </ContentBlock100>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', flexWrap: 'wrap', position: 'relative', bottom: 10}}>
                                    <AddressItem>{title}</AddressItem> <AddressItem><FaMapMarkerAlt/> {address}</AddressItem> <AddressItem><FaPhone/> {phone1}</AddressItem><AddressItem><FaPhone/> {phone2}</AddressItem>
                                </div>
                            </CenterBlock>
                        </Body>
                    </Wrapper>
                </SwipeScrollWrapper>
            </Div100vh>
        // </Layout>
    )
}