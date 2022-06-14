import TwitterShareIcon from './assets/TwitterShareIcon.svg';
import Image from 'next/image';
import styles from './TwitterButton.module.scss';
import { useEffect, useState } from 'react';

export default function TwitterButton(props) {

    const [twitterMessage, setTwitterMessage] = useState("")

    useEffect(() => {
        twitterContentGenerator()
    }, [])

    function twitterContentGenerator() {

        let finalStr = "âge %7C Avant %7C Après%0A"
        let string = `J'ai simulé la réforme des retraites Macron.%0AKenza 👪 né${props.gender === 2 && "e"} en ${props.birthDate}, début de carrière ${props.careerStartAge} ans:%0A%0A`

        for (let index = 0; index < props.result.length; index++) {
            const element = props.result[index];
            if (index !== 0 && index !== props.result.length) {
                finalStr += " %0A"
            }
            finalStr += `${element.AgeLiq} %7C ${element.Possible !== "0" ? '✅' : '❌😣'}${element.Surcote !== "" ? "💰" : ""} %7C ${element.Possible_Mac !== "0" ? '✅' : '❌😣'}${element.Surcote_Mac !== "0" ? "💰" : ""}`
        }

        string += finalStr
        setTwitterMessage(string);
    };


    return (
        <div className={styles.SharedButton}>
            <span className={styles.SharedText}>Partagez vos résultats </span><a href={`https://twitter.com/intent/tweet?text=${twitterMessage}`}
                data-size="large" target="_blank" rel="noreferrer"><Image src={TwitterShareIcon} width={"100px"} alt={"Partage Twitter"} /></a>
        </div>
    )
}