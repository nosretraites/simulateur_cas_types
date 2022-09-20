import { useEffect, useState } from 'react';
import styles from '../styles/form.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { query, isReady } = router;
  const [birthDate, setBirthDate] = useState(1969);
  const [careerStartAge, setCareerStartAge] = useState(21);
  const [isMainParent, setMainParent] = useState("false");
  const [yearOfCareerInterruption, setYearOfCareerInterruption] = useState(0);
  const [isPublicCareer, setIsPublicCareer] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [countOfChildrenBefore2004, setCountOfChildrenBefore2004] = useState(0);

  const handleNaissanceChange = e => setBirthDate(e.target.value)
  const handleCareerStartAgeChange = e => setCareerStartAge(e.target.value)
  const handleMainParentChange = e => setMainParent(e.target.value)
  const handleNumberOfChildrenChange = e => setNumberOfChildren(e.target.value);
  const handlePublicCareerChange = e => setIsPublicCareer(e.target.value)
  const handleCareerInterruptionChange = e => setYearOfCareerInterruption(e.target.value)
  const handleChild2004Change = e => setCountOfChildrenBefore2004(e.target.value)

  const onSubmitForm = e => {
    e.preventDefault();
    openResultsPage();
  };

  const openResultsPage = e => {
    router.push({
      pathname: '/resultats',
      query: { birthDate, careerStartAge, isMainParent, numberOfChildren, yearOfCareerInterruption, isPublicCareer, countOfChildrenBefore2004 }
    })
  };

  const initFromQueryParams = () => {
    const { birthDate, careerStartAge, isMainParent, numberOfChildren, yearOfCareerInterruption, isPublicCareer, countOfChildrenBefore2004 } = query;

    if (birthDate !== undefined) {
      setBirthDate(birthDate);
    }
    if (careerStartAge !== undefined) {
      setCareerStartAge(careerStartAge);
    }
    if (isMainParent !== undefined) {
      setMainParent(isMainParent);
    }
    if (numberOfChildren !== undefined) {
      setNumberOfChildren(numberOfChildren);
    }

    if (yearOfCareerInterruption !== undefined) {
      setYearOfCareerInterruption(yearOfCareerInterruption);
    }

    if (isPublicCareer !== undefined) {
      setIsPublicCareer(isPublicCareer);
    }

    if (countOfChildrenBefore2004 !== undefined) {
      setCountOfChildrenBefore2004(countOfChildrenBefore2004);
    }
  }



  const verifyInputs = () => {
    if (numberOfChildren <= 0) {
      setMainParent('false');
    }

    if (isMainParent !== 'true') {
      setIsPublicCareer('true');
    }
    if (isPublicCareer !== 'false') {
      setCountOfChildrenBefore2004(0);
    }
  }

  useEffect(() => {
    if (isReady) {
      return verifyInputs();
    }
  }, [isReady, birthDate, careerStartAge, isMainParent, numberOfChildren, yearOfCareerInterruption, isPublicCareer, countOfChildrenBefore2004]),


    useEffect(() => {
      if (isReady) {
        return initFromQueryParams();
      }
    }, [isReady, query])


  return (
    <form className={styles.formElement} onSubmit={onSubmitForm}>
      <h2>Quel effet aurait la retraite à 65 ans (réforme Macron) ?</h2>
      <br />
      <div className={styles.inputElement}>
        <label htmlFor="birthDate">Année de naissance</label>
        <input id="birthDate" min="1900" max="2022" required type="number" placeholder="1970" value={birthDate} onChange={handleNaissanceChange} />
      </div>

      <div className={styles.inputElement}>
        <label htmlFor="careerStartAge">Âge de début de carrière</label>
        <input id="careerStartAge" required min="12" max="40" type="number" value={careerStartAge} onChange={handleCareerStartAgeChange} />
      </div>

      <div className={styles.inputElement}>
        <label htmlFor="yearOfCareerInterruption">Nombre d&lsquo;années non validées</label>
        <input id="yearOfCareerInterruption" required min="0" max="40" type="number" value={yearOfCareerInterruption} onChange={handleCareerInterruptionChange} />
      </div>

      <div className={styles.inputElement}>
        <label htmlFor="numberOfChildren">Nombre d&lsquo;enfants</label>
        <input id="numberOfChildren" required min="0" max="20" type="number" value={numberOfChildren} onChange={handleNumberOfChildrenChange} />
      </div>

      {numberOfChildren > 0 ?
        <fieldset className={styles.fieldsetElement} required onChange={handleMainParentChange}>
          <legend>Vous êtes le parent qui a accouché de vos enfants ou pris le plus long congé d&apos;adoption ?</legend>
          <input type="radio" id="isMainParent-true" defaultChecked={isMainParent == "true"} name="isMainParent" value="true"></input>
          <label htmlFor="isPublicCareer-true">Oui</label>
          <input type="radio" id="isMainParent-false" defaultChecked={isMainParent == "false"} name="isMainParent" value="false"></input>
          <label htmlFor="isMainParent-false">Non</label>
        </fieldset>
        : ""}
      {isMainParent === 'true' ?
        <fieldset className={styles.fieldsetElement} required onChange={handlePublicCareerChange}>
          <legend>Êtes vous fonctionnaire ?</legend>
          <input type="radio" id="isPublicCareer-true" defaultChecked={isPublicCareer == "true"} name="isPublicCareer" value="true"></input>
          <label htmlFor="isPublicCareer-true">Oui</label>
          <input type="radio" id="isPublicCareer-false" defaultChecked={isPublicCareer == "false"} name="isPublicCareer" value="false"></input>
          <label htmlFor="isPublicCareer-false">Non</label>
        </fieldset>
        : ""}

      {numberOfChildren > 0 && isMainParent === 'true' && isPublicCareer === 'false' ?
        <div className={styles.inputElement}>
          <label htmlFor="children2004">Nombre d&lsquo;enfants nés avant 2004</label>
          <input id="children2004" required min="0" max={numberOfChildren} type="number" value={countOfChildrenBefore2004} onChange={handleChild2004Change} />
        </div>
        : ""}

      <button className={`blockButton ${styles.submitButton}`} type="submit">Je calcule l&apos;effet de la réforme</button>

      <Link href="/informations">
        <a className={`inlineButton ${styles.informationButton}`} >Plus d&apos;informations sur le simulateur</a>
      </Link>
    </form>
  )
}
