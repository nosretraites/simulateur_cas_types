import React, { useEffect, useState } from 'react';
import styles from './ProfileCard.module.scss';
import Link from 'next/link';



export default function ProfileCard(props) {
    const [yearsWithBase, setYearWithBase] = useState(0);
    const {selectedName, selectedPicto, birthDate, careerStartAge, isMainParent, numberOfChildren, yearOfCareerInterruption, isPublicCareer, countOfChildrenBefore2004, data}= props;

    useEffect(() => {
        console.log("setYearWithBase",data)
        setYearWithBase(data[0].DTP/4);
    }, [data]);


    return (
        <div className={styles.Container}>
            <div>
                <img src={selectedPicto} width={"150px"} />
            </div>
            <div className={styles.InformationBox}>
                <span>Votre situation ressemble à celle de :</span>
                <span className={styles.Name}>{selectedName}</span>
                <span>Né{!isMainParent ? "e" : ""} en {birthDate} {!isMainParent? "" : parseInt(numberOfChildren) !== 0 ? parseInt(numberOfChildren) === 1 ? "- 1 enfant" : "- " + parseInt(numberOfChildren) + " enfants" : ""}</span>
                <span>Durée requise : {yearsWithBase} annuités</span>
                <span>Début de carrière à {careerStartAge} ans</span>
                <Link href={{pathname: '/', query: { birthDate, careerStartAge, isMainParent, numberOfChildren, yearOfCareerInterruption, isPublicCareer, countOfChildrenBefore2004 }}}>
                    <a className="inlineButton">Retourner au formulaire</a>
                </Link>
            </div>
        </div>
    )
}
