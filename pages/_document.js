import { Html, Head, Main, NextScript } from 'next/document';


export default function Document() {
  return (
    <Html>
      <Head>
        <title>Simulateur Collectif Nos retraites</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Roboto:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <header className="globalHeader">
          <h1 className='title'>Simulateur de retraite</h1>
          <h3 className="subtitle">
            du Collectif Nos retraites
          </h3>
        </header>
        <main role="main" className="globalMain">
          <Main />
          <NextScript />
        </main>
        <div className='twitter-div'>Suivez nous sur <a href='https://twitter.com/nosretraites' target="_blank" rel="noreferrer"><img src="twitter-icon.svg" width={"50px"} /></a></div>
        <div className='twitter-div'><a href='https://blogs.mediapart.fr/collectif-nos-retraites/blog/110622/retraite-65-ans-quest-ce-qui-changerait-avec-le-projet-macron' target="_blank" rel="noreferrer">Retrouvez nos cas-types commentés sur notre blog médiapart</a></div>
      </body>
    </Html>
  )
}
