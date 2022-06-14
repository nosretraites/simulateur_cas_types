import { useState } from 'react';
import styles from './form.module.scss';

export default function Home() {
  const [birthDate, setBirthDate] = useState(1969);
  const [careerStartAge, setCareerStartAge] = useState(21);
  const [gender, setGender] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  // Allowed values : INFORMATION, FORM, RESULT
  const [pageState, setPageState] = useState('FORM');

  const handleNaissanceChange = e => setBirthDate(e.target.value)
  const handleCareerStartAgeChange = e => setCareerStartAge(e.target.value)
  const handleGenderChange = e => setGender(e.target.value)
  const handleNumberOfChildrenChange = e => setNumberOfChildren(e.target.value);
  const onSubmitForm = e => {
    e.preventDefault();
    openResultsPage();
  };
  const openInformationPage = e => setPageState('INFORMATION');
  const openFormPage = e => setPageState('FORM');
  const openResultsPage = e => setPageState('RESULT');


  if(pageState === 'FORM'){
    return (
      
          <form className={styles.formElement} onSubmit={onSubmitForm}>   
            <div className={styles.inputElement}>
              <label htmlFor="birthDate">Année de naissance</label>
              <input id="birthDate" min="1900" max="2022" required type="number" placeholder="1970" value={birthDate} onChange={handleNaissanceChange} />
            </div>

            <div className={styles.inputElement}>
              <label htmlFor="careerStartAge">Âge de début de carrière</label>
              <input id="careerStartAge" required min="12" max="40" type="number" value={careerStartAge} onChange={handleCareerStartAgeChange} />
            </div>

            <div className={styles.inputElement}>
              <label htmlFor="numberOfChildren">Nombre d&lsquo;enfants</label>
              <input id="numberOfChildren" required min="0" max="20" type="number" value={numberOfChildren} onChange={handleNumberOfChildrenChange} />
            </div>

            { numberOfChildren > 0 ?
            <div className={styles.inputElement}>
              <label htmlFor="gender">Vous êtes le parent qui a accouché de vos enfants ou pris le plus long congé d&apos;adoption</label>
              <select required onChange={handleGenderChange}>
                <option value={1}>Non</option>
                <option value={2}>Oui</option>
              </select>
            </div>
            :""}     

            <button className={`blockButton ${styles.submitButton}`} type="submit">Je calcule ma situation</button>

            <button type="button" className={`inlineButton ${styles.informationButton}`} onClick={openInformationPage}>Plus d&apos;informations sur le simulateur</button>

          </form>
    )
  }
  else if(pageState === 'INFORMATION'){
    return (
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
        <button type="button" className={`blockButton`} onClick={openFormPage}>Retourner au simulateur</button>
      </div>   
    )
  }
  else if(pageState === 'RESULT'){
    return (
      <>
         <p>{pageState}</p>
      </>         
    )
  }

}