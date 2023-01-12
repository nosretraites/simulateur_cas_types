import React, { useEffect, useState } from 'react';
import styles from './ProfileCard.module.scss';
import Link from 'next/link';



export default function ProfileCard(props) {
    const [yearsWithBaseNow, setYearWithBaseNow] = useState(0);
    const [yearsWithBaseMacron, setYearWithBaseMacron] = useState(0);
    const { selectedName, selectedPicto, birthDate, careerStartAge, isMainParent, numberOfChildren, yearOfCareerInterruption, isPublicCareer, countOfChildrenBefore2004, data } = props;

    useEffect(() => {
        setYearWithBaseNow(data[0].DTP_now / 4);
        setYearWithBaseMacron(data[0].DTP_mac / 4);
    }, [data]);


    return (
        <div className={styles.wrapper}>
            <h3 className={styles.Title}>Votre situation ressemble à celle de :</h3>

            <div className={styles.ProfileCard}>
                <div className={styles.ProfileCardHeader}>

                    <img src={selectedPicto} className={styles.selectedPicto} />
                    <p className={styles.Name}>{selectedName}</p>
                    <p>Né{isMainParent ? "e" : ""} en {birthDate} {!isMainParent ? "" : parseInt(numberOfChildren) !== 0 ? parseInt(numberOfChildren) === 1 ? "- 1 enfant" : "- " + parseInt(numberOfChildren) + " enfants" : ""}</p>
                    <p>Début de carrière à {careerStartAge} ans</p>
                    <Link href={{ pathname: '/', query: { birthDate, careerStartAge, isMainParent, numberOfChildren, yearOfCareerInterruption, isPublicCareer, countOfChildrenBefore2004 } }}>
                        <a className="inlineButton">Retourner au formulaire</a>
                    </Link>
                </div>
                <div className={styles.ProfileCardContent}>

                {props.children}
                </div>
            </div>
        </div>
    )
}
