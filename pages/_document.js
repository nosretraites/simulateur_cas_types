import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Roboto:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" />
        <script defer data-domain="nosretraites-simulateur-cas-types.netlify.app" src="https://plausible.io/js/plausible.js"></script>
      </Head>
      <title>Simulateur Collectif Nos retraites</title>
      <body>
          <Main />
          <NextScript />
      </body>
    </Html>
  )
}
