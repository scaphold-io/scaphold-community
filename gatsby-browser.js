import ReactGA from 'react-ga';
import { config } from 'config'; // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize(config.googleAnalyticsId);
} else {
  ReactGA.initialize('UA-87277684-1');
}

exports.onRouteUpdate = (state, page, pages) => {
  if (ReactGA) {
    ReactGA.pageview(state.pathname);
  }
};
