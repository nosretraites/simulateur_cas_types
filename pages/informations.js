import styles from '../styles/form.module.scss';
import Link from 'next/link';

export default function Informations() {

  return (
    <article>
      <div className={styles.informationPage}>
        <h2>Précisions sur le simulateur</h2>
        <p>Ce générateur de cas-type est une <strong>version bêta, simplifiée,</strong> d’autres fonctionnalités et précisions seront développées par la suite.</p>
        <p>Mise à jour par rapport à la version précédente :</p>
        <ul>
          <li> Adaptation à la réforme annoncée le 10 janvier 2023.</li>
          <li>Intégration du profil fonctionnaire d’Etat.</li>
          <li>Intégration des interruptions de carrières.</li>
          <li>Correction des formules de calcul de la décote et de la surcote.</li>
        </ul>
        <p>Le profil présenté est celui d’une <strong>personne salariée du privé ou fonctionnaire d'Etat</strong>.</p>
        <p>Nous avons pris pour base le dossier de presse communiqué par le gouvernement le 10 janvier 2023 :</p>
        <ul>
          <li>Un décalage de l’âge légal de trois ans au rythme de 3 mois par an à partir de la génération 1961 (en fait la réforme est prévue pour s’appliquer pour les personnes nées à partir de septembre 1961) jusqu’à la génération 1968.</li>
        <li>Un décalage de la durée requise accéléré pour atteindre 43 annuités pour la génération 1965.</li>
        <li>Un décalage de l’âge de départ anticipé pour carrière longue de deux ans (pour arriver à 62 ans), pour les personnes ayant commencé à travailler avant 20 ans.</li>
        <li>Une possibilité de partir à la retraite à partir de 60 ans si on a cotisé un an de plus que la durée requise (début de carrière avant 18 ans).</li>
        <li>Nous avons simplifié en ne retenant pas pour l’instant le cas des personnes qui ont commencé avant 16 ans.</li>
        <li>Nous avons appliqué les majorations de durée d’assurance pour enfant en appliquant la règle suivante en vigueur dans le privé : chaque accouchement ou adoption donne droit à 4 trimestres, et chaque enfant élevé donne également droit à 4 trimestres. Ces trimestres ne comptent que pour atteindre le taux plein (et ne donnent pas accès à la surcote ni au départ anticipé pour carrière longue).</li>
        <li>Dans le public nous avons compté 2 trimestres par enfant pour les enfants nés à compter de 2004, 4 trimestres par enfant pour les enfants nés avant.</li>
        </ul>
        <p>Pour simplifier, nous avons attribué toutes les majorations de durée d’assurance à la même personne (la personne qui accouche ou qui a pris les congés d’adoption), mais en pratique, une partie peut être partagée entre les deux parents.</p>
        <p>A noter que la surcote se calcule ainsi : +1,25% par trimestre validé en plus de ceux qui nous ont permis d'atteindre le taux plein.</p>
        <p>La décote fonctionne sur le même principe : -1,25% par trimestre manquant jusqu'à la durée requise ou jusqu'à 67 ans (le minimum des deux).</p>
        <p>Les interruptions de carrière du simulateur concernent des périodes sans aucune validation. En pratique, certaines interruptions de carrière peuvent donner lieu à des validations (congé parental par exemple), et ne doivent donc pas être comptées comme des interruptions de carrière dans le simulateur.</p>
        <p><strong>Ce simulateur est dans une phase de test</strong>, n’hésitez pas à nous signaler toute chose qui vous paraîtrait curieuse.</p>
        <Link href="/">
          <a type="button" className={`blockButton`}>Retourner au simulateur</a>
        </Link>
      </div>
    </article>
  )

}
