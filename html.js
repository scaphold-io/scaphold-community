import React from 'react';
import Helmet from 'react-helmet';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line
import { TypographyStyle, GoogleFont } from 'react-typography';
import typography from './utils/typography';

const BUILD_TIME = new Date().getTime();

export default class HTML extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const head = Helmet.rewind();

    let css;
    if (process.env.NODE_ENV === 'production') {
      css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />; // eslint-disable-line
    }

    return (
      <html lang="en">
        <head>
          {/* Dynamic meta tags are all handled in pages/index.jsx react-helmet */}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {head.title.toComponent()}
          {head.meta.toComponent()}
          <meta name="keywords" content="create your own app, graphql service, graphql, ReactJS, make apps faster, best backend, best baas, graphql subscriptions, realtime, mobile app development, app development, firebase, firebase alternative, reactjs, angularjs, apollo client, relayjs" />
          {/* Essential META Tags */}
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          {/* Non-Essential, But Recommended */}
          <meta property="og:site_name" content="Scaphold | Community" />
          <meta name="twitter:image:alt" content="Scaphold.io Community Page" />
          {/* Non-Essential, But Required for Analytics */}
          <meta property="fb:app_id" content="1636648986655395" />
          <meta name="twitter:site" content="@ScapholdDotIO" />
          <link rel="shortcut icon" type="image/png" href="https://assets.scaphold.io/images/favicon.png" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
          {/*<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism.min.css" />*/}
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
          <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel="stylesheet" />
          {css}
        </head>
        <body>
          <div id="react-mount" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
          {/* Intercom */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.intercomSettings = {
                  app_id: 'j46v879e'
                };
                (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/j46v879e';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
              `,
            }}
          />
          {/* Facebook Pixel */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '502625266592537', {
                em: localStorage.getItem('currentUserEmail'),
                });
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript><img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=502625266592537&ev=PageView&noscript=1" alt="fb-pixel" /></noscript>
          {/* Google Analytics (in gatsby-browser.js) */}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-graphql.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-sql.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-javascript.min.js" />
        </body>
      </html>
    );
  }
}

HTML.propTypes = {
  body: React.PropTypes.string,
};
