import '../styles/variables.scss';
import '../styles/typography.scss';
import '../styles/globals.scss';
import '../styles/footer.scss';

import Footer from '../components/Footer';
import Link from 'next/link';


function MyApp({ Component, pageProps }) {

  return <>
    <main role="main" className="globalMain">
        <Link href="/">
      <header className="globalHeader">
            <h1 className='title'>Simulateur de retraite</h1>
            <h3 className="subtitle">
              du Collectif Nos retraites
            </h3>
      </header>
        </Link>
      <Component {...pageProps} />
    </main>
    <Footer />
  </>

}

export default MyApp
