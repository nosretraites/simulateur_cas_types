import { useEffect, useState } from 'react';
import styles from '../styles/form.module.scss';
import TwitterButton from '../components/TwitterButton.js';
import Cell from '../components/Cell.js';
import ProfileCard from '../components/ProfileCard.js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { computeSituation } from '../utils/calculationUtils';

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
    if (query.birthDate !== undefined) {
      setBirthDate(query.birthDate);
    }
    if (query.careerStartAge !== undefined) {
      setCareerStartAge(query.careerStartAge);
    }
    if (query.gender !== undefined) {
      setGender(query.gender);
    }
    if (query.numberOfChildren !== undefined) {
      setNumberOfChildren(query.numberOfChildren);
    }
  }

  useEffect(() => {
      if (isReady) {
        initFromQueryParams();
      }
  }, [isReady, query]);
  useEffect(() => {
    computeResults();  
}, [birthDate, careerStartAge, gender, numberOfChildren]);

  function computeResults(){
    const results = computeSituation( {birthDate, careerStartAge, gender, numberOfChildren} );
    setCellArray(results);
    setIsLoaded(true)
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
