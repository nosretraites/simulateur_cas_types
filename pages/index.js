import { useState, useEffect } from 'react';
import * as csv from "csvtojson"
import fetch from 'isomorphic-unfetch';
import TwitterButton from '../components/TwitterButton.js';


import Cell from '../components/cell'

export default function Home() {
  const [birthDate, setBirthDate] = useState(1969);
  const [careerStartAge, setCareerStartAge] = useState(21);
  const [gender, setGender] = useState(2);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  const [cellArray, setCellArray] = useState([]);

  const handleNaissanceChange = e => setBirthDate(e.target.value)
  const handleCareerStartAgeChange = e => setCareerStartAge(e.target.value)
  const handleGenderChange = e => setGender(e.target.value)
  const handleNumberOfChildrenChange = e => setNumberOfChildren(e.target.value);

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
    fetchDatas();
  }, [birthDate, careerStartAge, gender, numberOfChildren])


  return (
    <>
      <header>
        <h1>Simulateur retraite</h1>
        <div>
          du Collectif Nos retraites
        </div>
      </header>
      <article>
        <div>
          <div>
            <label htmlFor="birthDate">Année de naissance</label>
            <input id="birthDate" min="1900" max="2100" type="number" value={birthDate} onChange={handleNaissanceChange} />
          </div>
          <div>
            <label htmlFor="careerStartAge">Âge de début de carrière</label>
            <input id="careerStartAge" min="12" max="40" type="number" value={careerStartAge} onChange={handleCareerStartAgeChange} />
          </div>
          <div>
            <label htmlFor="gender">Sexe</label>
            <select onChange={handleGenderChange}>
              <option value={2}>Féminin</option>
              <option value={1}>Masculin</option>
            </select>

          </div>
          <div>
            <label htmlFor="numberOfChildren">Nombre d&lsquo;enfants</label>
            <input id="numberOfChildren" min="0" max="20" type="number" value={numberOfChildren} onChange={handleNumberOfChildrenChange} />
          </div>
        </div>
        <div>
          <div className="profil">
            <div>Né{gender == 2 && "e"} en {birthDate}{numberOfChildren > 0 ? (numberOfChildren == 1 ? " - 1 enfant" : ` - ${numberOfChildren} enfants`) : ""}</div>
            <div>Début de carrière : {careerStartAge} ans</div>
          </div>
          <div className="resultats">
            <table>
              <thead>
                <tr><th>La retraite à</th><th>Avec la loi actuelle</th><th>Avec le projet Macron</th></tr>
              </thead>
              <tbody>
                {cellArray.map((r, i) => (
                  <tr key={r.AgeLiq}>
                    <td className="age">{r.AgeLiq} ans</td>
                    <td><Cell dataset={cellArray} index={i} /></td>
                    <td><Cell dataset={cellArray} index={i} macron /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
          <TwitterButton birthDate={birthDate} result={cellArray} careerStartAge={careerStartAge} gender={gender}/>
      </article>
    </>
  )
}
