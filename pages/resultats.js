import { useEffect, useState } from 'react';
import styles from '../styles/form.module.scss';
import * as csv from "csvtojson"
import fetch from 'isomorphic-unfetch';
import TwitterButton from '../components/TwitterButton.js';
import Cell from '../components/Cell.js';
import ProfileCard from '../components/ProfileCard.js';
import { useRouter } from 'next/router';
import Link from 'next/link';

const listOfNamesMan = ["Nathan", "Lucas", "Léo", "Gabriel", "Timéo", "Enzo", "Louis", "Raphaël", "Arthur", "Hugo", "Jules", "Ethan", "Adam", "Nolan", "Tom", "Noah", "Théo", "Sacha", "Maël", "Mathis", "Abdela", "Mohamed", "Yassin", "Jean-Karim", "Björn"];
const listOfNamesWoman = ["Emma", "Lola", "Chloé", "Inès", "Léa", "Manon", "Jade", "Louise", "Léna", "Lina", "Zoé", "Lilou", "Camille", "Sarah", "Eva", "Alice", "Maëlys", "Louna", "Romane", "Juliette", "Sophie", "Inaya", "Aliya", "Noûr", "Elodie"];
const listOfPictosMan = ["m1.png", "m2.png", "m3.png", "m4.png", "m5.png", "m6.png", "m7.png"];
const listOfPictosWoman = ["w1.png", "w2.png", "w3.png", "w4.png", "w5.png", "w6.png", "w7.png", "w8.png", "w9.png", "w10.png", "w11.png"];

export default function Resultats() {

  const router = useRouter();
  const { query, isReady } = router;
  const [birthDate, setBirthDate] = useState(1969);
  const [careerStartAge, setCareerStartAge] = useState(21);
  const [gender, setGender] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [cellArray, setCellArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedPicto, setSelectedPicto] = useState("");


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
    fetchDatas(birthDate);
  }

  useEffect(() => {
      if (isReady) {
        initFromQueryParams();
      }
  }, [query]);

  async function fetchDatas(date) {
    const apiUrl = `https://raw.githubusercontent.com/nosretraites/simulateur_cas_types_data/main/data/${date.toString()}.csv`;
    console.log(apiUrl)
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

        const slice = reducer[date] && reducer[date][careerStartAge] && reducer[date][careerStartAge][gender] && reducer[date][careerStartAge][gender][numberOfChildren];
        setCellArray(slice || [])
      }).then(() => {
        setIsLoaded(true)

      });

    }

  }


  function pickAWinner() {
    if (gender === "1") {
      let nameNumberMan = Math.floor(Math.random() * listOfNamesMan.length);
      setSelectedName(listOfNamesMan[nameNumberMan]);
      const numberPicto = Math.floor(Math.random() * listOfPictosMan.length);
      setSelectedPicto(listOfPictosMan[numberPicto])
    } else {
      let nameNumberWoman = Math.floor(Math.random() * listOfNamesWoman.length);
      setSelectedName(listOfNamesWoman[nameNumberWoman]);
      const numberPicto = Math.floor(Math.random() * listOfPictosWoman.length);
      setSelectedPicto(listOfPictosWoman[numberPicto])
    }
  }

  useEffect(() => {
    pickAWinner();
  }, [gender])

  if (isLoaded) {
    return (
      <div>
       <ProfileCard selectedName={selectedName} selectedPicto={selectedPicto} gender={gender} birthDate={query.birthDate} numberOfChildren={numberOfChildren} careerStartAge={careerStartAge} data={cellArray} />
        <table width={"100%"}>
          <thead>
            <tr>
              <th className={styles.Box}>La retraite à</th>
              <th className={styles.Box}>Avec la loi actuelle</th>
              <th className={styles.Box}>Avec le projet Macron</th>
            </tr>
          </thead>
          <tbody>
            {cellArray.map((cellData, i) => (
              <Cell data={cellData} key={i} />
            ))}
          </tbody>
        </table>
        <Link href="/informations">
          <a className={`inlineButton`} >Précisions sur les calculs</a>
        </Link>

        <div className={styles.SharedIcon}>

          <TwitterButton birthDate={birthDate} result={cellArray} careerStartAge={careerStartAge} gender={gender} selectedName={selectedName} numberOfChildren={numberOfChildren}/>
        </div>

      </div>

    )
  }
}
