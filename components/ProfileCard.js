import React, { useEffect, useState } from 'react';
import styles from './ProfileCard.module.scss';
import Link from 'next/link';


const listOfNamesMan = ["Nathan", "Lucas", "Léo", "Gabriel", "Timéo", "Enzo", "Louis", "Raphaël", "Arthur", "Hugo", "Jules", "Ethan", "Adam", "Nolan", "Tom", "Noah", "Théo", "Sacha", "Maël", "Mathis", "Abdela", "Mohamed", "Yassin", "Jean-Karim", "Björn"];
const listOfNamesWoman = ["Emma", "Lola", "Chloé", "Inès", "Léa", "Manon", "Jade", "Louise", "Léna", "Lina", "Zoé", "Lilou", "Camille", "Sarah", "Eva", "Alice", "Maëlys", "Louna", "Romane", "Juliette", "Sophie", "Inaya", "Aliya", "Noûr", "Elodie"];
const listOfPictosMan = ["m1.png", "m2.png", "m3.png", "m4.png", "m5.png", "m6.png", "m7.png"];
const listOfPictosWoman = ["w1.png", "w2.png", "w3.png", "w4.png", "w5.png", "w6.png", "w7.png", "w8.png", "w9.png", "w10.png", "w11.png"];

export default function ProfileCard({ gender, birthDate, numberOfChildren, careerStartAge, data }) {
    const [selectedName, setSelectedName] = useState("");
    const [selectedPicto, setSelectedPicto] = useState("");
    const [yearsWithMacron, setYearWithMacron] = useState(0);
    const [yearsWithBase, setYearWithBase] = useState(0);

    function pickAWinner() {
        const index = data.findIndex((element) => (element.Possible_Mac !== "0" || element.Possible_Mac));
        const years = data[index]
        setYearWithMacron(years.AOD_Macron - careerStartAge);
        setYearWithBase(years.AOD - careerStartAge);
        if (gender === 1) {
            console.log(listOfNamesMan.length)
            let nameNumberMan = Math.floor(Math.random() * listOfNamesMan.length);
            setSelectedName(listOfNamesMan[nameNumberMan]);
            const numberPicto = Math.floor(Math.random() * listOfPictosMan.length)
            console.log(numberPicto)
            setSelectedPicto(listOfPictosMan[numberPicto])
        } else {
            let nameNumberWoman = Math.floor(Math.random() * listOfNamesWoman.length);
            setSelectedName(listOfNamesWoman[nameNumberWoman]);
            const numberPicto = Math.floor(Math.random() * listOfPictosWoman.length);
            setSelectedPicto(listOfPictosWoman[numberPicto])
        }
    }


    useEffect(() => {
        return pickAWinner();
    }, [gender])

    return (
        <div className={styles.Container}>
            <div>
                <img src={selectedPicto} width={"150px"} />
            </div>
            <div className={styles.InformationBox}>
                <span className={styles.Name}>{selectedName}</span>
                <span>Né{gender !== 1 ? "e" : ""} en {birthDate} {numberOfChildren !== 0 ? numberOfChildren === 1 ? "- 1 enfant" : "- " + numberOfChildren + " enfants" : ""}</span>
                <span>Durée requise avec la loi actuelle : {yearsWithBase} annuités</span>
                {/* <span>Durée requise avec Macron : {yearsWithMacron} annuités</span> */}
                <span>Début de carrière {careerStartAge} ans</span>
                <Link href={{pathname:'/',query : { birthDate, careerStartAge, gender, numberOfChildren }}}>
                    <a className="inlineButton">Retourner au formulaire</a>
                </Link>
            </div>
        </div>
    )
}
