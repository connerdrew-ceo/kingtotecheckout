import ReactGA from "react-ga";
export const initGA = (trackingID) => {
    ReactGA.initialize(trackingID);
}

/**
 * Event - Add custom tracking event.
 * @param {string} step 
 * @param {string} action 
 * @param {string} desc 
 */

export const PageView = () => {
    ReactGA.pageview(window.location.pathname +
        window.location.search);
}

export const Event = (params) => {
    let event = {
        category: 'KingTote-Checkout',
        ...params
    }
    ReactGA.event(event);
};