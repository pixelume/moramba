import React, {useEffect, useContext, useCallback} from 'react'; 
import { Swipeable } from 'react-touch';
import { swipe } from '../../pages/index';
import {DataContext} from '../layoutComp';

export default ({children, enqSbOpen}) => {
    const {pageLinkRefs, homeLinkRef, location, navData} = useContext(DataContext);
    const locations = navData.map(item => item.link);

    const swipeUpHandler = () => {
        if (!enqSbOpen) {
            const nextPageIndex = locations.indexOf(location.pathname) + 1;
            if (nextPageIndex < locations.length) {
                pageLinkRefs[nextPageIndex].current.firstChild.click();
            }
        }
    }
    const swipeDownHandler = () => {
        if (!enqSbOpen) {
            const nextPageIndex = locations.indexOf(location.pathname) - 1
            if (nextPageIndex >= 0) {
                pageLinkRefs[nextPageIndex].current.firstChild.click();
            } else {
                homeLinkRef.current.firstChild.click();
            }
        }
    }
    const scrollHandler = useCallback(e => {
        if (e.deltaY < 0) {
            swipeDownHandler()
        }
        else {
            swipeUpHandler()
        }
    }, [])
    useEffect(() => {
        window.addEventListener("mousewheel", scrollHandler);
        return () => window.removeEventListener("mousewheel", scrollHandler);
    })
    
    useEffect(() => {
        if (enqSbOpen) {
            window.removeEventListener("mousewheel", scrollHandler)
        }
        else {
            window.addEventListener("mousewheel", scrollHandler)
        }
    }, [enqSbOpen])

    return (
        <Swipeable config={swipe} onSwipeUp={swipeUpHandler} onSwipeDown={swipeDownHandler}>
            {children}
        </Swipeable>
    )
}
