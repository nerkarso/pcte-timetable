import { initGA, logPageView } from 'googleAnalytics';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'styles/Welcome.scss';

export default function Error({ location }) {
  const message = location.state ? location.state.message : 'Page not found';

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView(`Error: ${message}`);
  }, [message]);

  return (
    <section className="welcome">
      <div className="welcome__body">
        <h1 className="welcome__title">Error</h1>
        <p className="welcome__subtitle">{message}</p>
        <Link to="/welcome" className="button button--default">
          Return
        </Link>
      </div>
    </section>
  );
}
