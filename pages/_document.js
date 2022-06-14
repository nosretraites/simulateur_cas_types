import { Html, Head, Main, NextScript } from 'next/document';


export default function Document() {
  return (
    <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Roboto:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet"/> 
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
          <NextScript/>
        </main>
      </body>
    </Html>
  )
}
