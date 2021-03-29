import ReactGA from 'react-ga';

/**
 * Add Google Analytics
 * https://coderrocketfuel.com/article/add-google-analytics-to-a-next-js-and-react-website
 */

export const initGA = () => {
  ReactGA.initialize(process.env.REACT_APP_TRACKING_ID, {
    debug: process.env.NODE_ENV !== 'production',
  });
};

export const logPageView = (title) => {
  ReactGA.pageview(
    JSON.stringify({
      path: window.location.pathname,
      title: title || document.title,
    }),
  );
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
