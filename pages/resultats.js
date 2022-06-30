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
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [isMainParent, setMainParent] = useState(false);
  const [yearOfCareerInterruption, setYearOfCareerInterruption] = useState(0);
  const [isPublicCareer, setIsPublicCareer] = useState('');
  const [countOfChildrenBefore2004, setCountOfChildrenBefore2004] = useState(0);

  const [cellArray, setCellArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedPicto, setSelectedPicto] = useState("");


  const initFromQueryParams = () => {
    if (query.birthDate !== undefined) {
      setBirthDate(Number(query.birthDate));
    }
    if (query.careerStartAge !== undefined) {
      setCareerStartAge(Number(query.careerStartAge));
    }
    if (query.numberOfChildren !== undefined) {
      setNumberOfChildren(Number(query.numberOfChildren));
    }
    if (query.isMainParent !== undefined) {
      setMainParent(Boolean(query.isMainParent));
    }
    if (query.numberOfChildren !== undefined) {
      setNumberOfChildren(Number(query.numberOfChildren));
    }

    if (query.yearOfCareerInterruption !== undefined) {
      setYearOfCareerInterruption(Number(query.yearOfCareerInterruption));
    }

    if (query.isPublicCareer !== undefined) {
      setIsPublicCareer(Boolean(query.isPublicCareer));
    }

    if (query.countOfChildrenBefore2004 !== undefined) {
      setCountOfChildrenBefore2004(Number(query.countOfChildrenBefore2004));
    }
  }

  useEffect(() => {
    if (isReady) {
      initFromQueryParams();
    }
  }, [isReady, query]);
  useEffect(() => {
    if (isReady) {
      computeResults();
    }
  }, [isReady, birthDate, careerStartAge, isMainParent, numberOfChildren, yearOfCareerInterruption, isPublicCareer, countOfChildrenBefore2004]);

  function computeResults() {
    const results = computeSituation({ birthDate, careerStartAge, isMainParent, numberOfChildren, yearOfCareerInterruption, isPublicCareer, countOfChildrenBefore2004 });
    setCellArray(results);
    setIsLoaded(true)
  }


  function pickAWinner() {
    if (!isMainParent) {
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
  }, [isMainParent])

  if (isLoaded) {
    return (
      <div>
        <ProfileCard selectedName={selectedName}
          selectedPicto={selectedPicto}
          isMainParent={isMainParent}
          birthDate={birthDate}
          numberOfChildren={numberOfChildren}
          careerStartAge={careerStartAge}
          yearOfCareerInterruption={yearOfCareerInterruption}
          isPublicCareer={isPublicCareer}
          countOfChildrenBefore2004={countOfChildrenBefore2004}
          data={cellArray} />
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

          <TwitterButton birthDate={birthDate} result={cellArray} careerStartAge={careerStartAge} isMainParent={isMainParent} selectedName={selectedName} numberOfChildren={numberOfChildren} />
        </div>

      </div>

    )
  }
}
