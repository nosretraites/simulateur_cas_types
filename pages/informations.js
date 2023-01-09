import styles from '../styles/form.module.scss';
import Link from 'next/link';

export default function Informations() {

    return (
      <article>
      <div className={styles.informationPage}>
        <p>Ce générateur de cas-type est une <strong>version bêta, simplifiée,</strong> d’autres fonctionnalités et précisions seront développées par la suite.</p>
        <p>Le profil présenté est celui d’une <strong>personne salariée du privé sans interruption de carrière</strong> (ce qui n’est pas le cas de tout le monde dans la vraie vie).</p>
        <p>Nous avons pris pour hypothèse de réforme les éléments communiqués pendant la campagne électorale d’Emmanuel Macron lors de l’élection présidentielle :</p>
        <ul>
          <li>Un décalage de l’âge légal de trois ans au rythme de 4 mois par an à partir de la génération 1961 jusqu’à la génération 1969.</li>
          <li>Un décalage de l’âge de départ anticipé pour carrière longue de deux ans (pour arriver à 62 ans). Nous avons simplifié en ne retenant pas pour l’instant le cas des personnes qui ont commencé avant 16 ans.</li>
          <li>Nous avons appliqué les majorations de durée d’assurance pour enfant en appliquant la règle suivante en vigueur dans le privé : chaque accouchement ou adoption donne droit à 4 trimestres, et chaque enfant élevé donne également droit à 4 trimestres. Ces trimestres ne comptent que pour atteindre le taux plein (et ne donnent pas accès à la surcote ni au départ anticipé pour carrière longue).</li>
        </ul>
        <p>Pour simplifier, nous avons attribué toutes les majorations de durée d’assurance à la même personne (la personne qui accouche ou qui a pris les congés d’adoption), mais en pratique, une partie peut être partagé entre les deux parents.</p>
        <Link href="/">
          <a type="button" className={`blockButton`}>Retourner au simulateur</a>
        </Link>
      </div>
      </article>
    )

}
