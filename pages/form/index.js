import { useEffect, useState } from 'react';
import styles from './form.module.scss';
import * as csv from "csvtojson"
import fetch from 'isomorphic-unfetch';
// import TwitterButton from '../components/TwitterButton.js';
import { Cell } from './component/Cell'

export default function Home() {
  const [birthDate, setBirthDate] = useState(1970);
  const [careerStartAge, setCareerStartAge] = useState(21);
  const [gender, setGender] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [cellArray, setCellArray] = useState([]);

  const handleNaissanceChange = e => setBirthDate(e.target.value)
  const handleCareerStartAgeChange = e => setCareerStartAge(e.target.value)
  const handleGenderChange = e => setGender(e.target.value)
  const handleNumberOfChildrenChange = e => setNumberOfChildren(e.target.value);
  const onSubmitForm = e => {
    fetchDatas();
    e.preventDefault();
  };

  async function fetchDatas() {
    const apiUrl = `https://raw.githubusercontent.com/nosretraites/simulateur_cas_types_data/main/data/${birthDate}.csv`;
    const response = await fetch(apiUrl);

    if (response.status === 200) {

      const body = await response.text();

      return csv().fromString(body).then((data) => {

        const reducer = data.reduce((acc, val) => {
          const {
            Naissance,
            Debut,
            Sexe,
            Enfants
          } = val;

          const birthDateArray = acc[Naissance] || {};
          const careerStartArray = birthDateArray[Debut] || {};
          const genderArray = careerStartArray[Sexe] || {};
          const numberOfChildrenArray = genderArray[Enfants] || [];

          numberOfChildrenArray.push(val);

          genderArray[Enfants] = numberOfChildrenArray;
          careerStartArray[Sexe] = genderArray
          birthDateArray[Debut] = careerStartArray
          acc[Naissance] = birthDateArray;
          return acc
        }, {});

        const slice = reducer[birthDate] && reducer[birthDate][careerStartAge] && reducer[birthDate][careerStartAge][gender] && reducer[birthDate][careerStartAge][gender][numberOfChildren];

        setCellArray(slice || [])
      });

    }

  }

  useEffect(() => {
    fetchDatas()
  }, [])



  return (

    // <form className={styles.formElement} onSubmit={onSubmitForm}>

    //   <div className={styles.inputElement}>
    //     <label htmlFor="birthDate">Année de naissance</label>
    //     <input id="birthDate" min="1900" max="2022" required type="number" placeholder="1970" value={birthDate} onChange={handleNaissanceChange} />
    //   </div>

    //   <div className={styles.inputElement}>
    //     <label htmlFor="careerStartAge">Âge de début de carrière</label>
    //     <input id="careerStartAge" required min="12" max="40" type="number" value={careerStartAge} onChange={handleCareerStartAgeChange} />
    //   </div>

    //   <div className={styles.inputElement}>
    //     <label htmlFor="numberOfChildren">Nombre d&lsquo;enfants</label>
    //     <input id="numberOfChildren" required min="0" max="20" type="number" value={numberOfChildren} onChange={handleNumberOfChildrenChange} />
    //   </div>

    //   {numberOfChildren > 0 ?
    //     <div className={styles.inputElement}>
    //       <label htmlFor="gender">Vous êtes le parent qui a accouché de vos enfants ou pris le plus long congé d&apos;adoption</label>
    //       <select required onChange={handleGenderChange}>
    //         <option value={1}>Non</option>
    //         <option value={2}>Oui</option>
    //       </select>
    //     </div>
    //     : ""}

    //   <button className={styles.submitButton} type="submit">Je calcule ma situation</button>

    //   <button type="button" className={styles.modalButton}>Plus d&apos;informations sur le simulateur</button>

    // </form>

    <div>
      <table>
        <thead>
          <tr>
            <th className={styles.Box}>La retraite à</th>
            <th className={styles.Box}>Avec la loi actuelle</th>
            <th className={styles.Box}>Avec le projet Macron</th>
          </tr>
        </thead>
        <tbody>
          {cellArray.map((cellData, i) => (
            <Cell data={cellData} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
