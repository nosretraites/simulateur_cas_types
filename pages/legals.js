import styles from '../styles/form.module.scss';
import Link from 'next/link';

export default function legals() {

    return (
      <article>
      <div className={styles.informationPage}>
        <h2>Mentions légales</h2>
        <p>Ce site est édité par le collectif Nos retraites.</p>
        <p>Ce site est hébergé par /Hébergeur/ dans /région/ </p>
        <p>Le site ne recueille pas d’informations personnelles, et n’est pas assujetti à déclaration à la CNIL. Les informations renseignées dans le formulaire ne sont utilisées que pour simuler un profil de retraites, elles ne sont en aucun cas stockées.</p>
        <Link href="/">
          <a type="button" className={`blockButton`}>Retourner au simulateur</a>
        </Link>
      </div>
      </article>
    )

}
