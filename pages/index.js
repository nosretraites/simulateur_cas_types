import { useEffect, useState } from 'react';
import styles from '../styles/form.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { query, isReady } = router;
  const [birthDate, setBirthDate] = useState(1969);
  const [careerStartAge, setCareerStartAge] = useState(21);
  const [gender, setGender] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  const handleNaissanceChange = e => setBirthDate(e.target.value)
  const handleCareerStartAgeChange = e => setCareerStartAge(e.target.value)
  const handleGenderChange = e => setGender(e.target.value)
  const handleNumberOfChildrenChange = e => setNumberOfChildren(e.target.value);

  const onSubmitForm = e => {
    e.preventDefault();
    openResultsPage();
  };

  const openResultsPage = e => {
    router.push({
      pathname: '/resultats',
      query: { birthDate, careerStartAge, gender, numberOfChildren }
    })
  };

  const initFromQueryParams = () => {
    const { birthDate, careerStartAge, gender, numberOfChildren } = query;

    if (birthDate !== undefined) {
      setBirthDate(birthDate);
    }
    if (careerStartAge !== undefined) {
      setCareerStartAge(careerStartAge);
    }
    if (gender !== undefined) {
      setGender(gender);
    }
    if (numberOfChildren !== undefined) {
      setNumberOfChildren(numberOfChildren);
    }
  }

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
          <label htmlFor="numberOfChildren">Nombre d&lsquo;enfants</label>
          <input id="numberOfChildren" required min="0" max="20" type="number" value={numberOfChildren} onChange={handleNumberOfChildrenChange} />
        </div>

        {numberOfChildren > 0 ?
          <div className={styles.inputElement}>
            <label htmlFor="gender">Vous êtes le parent qui a accouché de vos enfants ou pris le plus long congé d&apos;adoption</label>
            <select required value={gender} onChange={handleGenderChange}>
              <option value="1">Non</option>
              <option value="2">Oui</option>
            </select>
          </div>
          : ""}

        <button className={`blockButton ${styles.submitButton}`} type="submit">Je calcule l&apos;effet de la réforme</button>

        <Link href="/informations">
          <a className={`inlineButton ${styles.informationButton}`} >Plus d&apos;informations sur le simulateur</a>
        </Link>
      </form>
  )
}
