import ReactGA from 'react-ga';

/**
 * Add Google Analytics
 * https://coderrocketfuel.com/article/add-google-analytics-to-a-next-js-and-react-website
 */

export const initGA = () => {
  ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.set({
    page: window.location.pathname
  });
  ReactGA.pageview(window.location.pathname);
};
