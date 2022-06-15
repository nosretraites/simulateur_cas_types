import styles from './TwitterButton.module.scss';
import { useEffect, useState } from 'react';

export default function TwitterButton(props) {

    const [twitterMessage, setTwitterMessage] = useState("")

    useEffect(() => {
        twitterContentGenerator()
    }, [])

    function twitterContentGenerator() {

        let finalStr = "âge %7C  Avant  %7C Après%0A"
        let string = `J'ai simulé la réforme des retraites Macron.%0A${props.selectedName} ${props.numberOfChildren === "0" ? "🧓" : props.numberOfChildren === "1" ? "👩‍👧" : "👩‍👦‍👦"} né${props.gender === "2" ? "e" : ""} en ${props.birthDate}, début de carrière ${props.careerStartAge} ans:%0A%0A`
        let mention = "%0A @nosretraites";
        for (let index = 0; index < props.result.length; index++) {
            const element = props.result[index];
            if (index !== 0 && index !== props.result.length) {
                finalStr += "%0A"
            }
            if(element.AgeLiq === "61") {
                finalStr += `${element.AgeLiq}  %7C`;
            } else {
                finalStr += `${element.AgeLiq} %7C`;
            }
            
            //Cell Base
            finalStr += `${((parseFloat(element.Tauxplein) > 0 && parseFloat(element.Tauxplein) && !(parseFloat(element.Surcote) !== 0 ) && !(parseFloat(element.Decote) !== 0 ))) ? '🥳' : (parseFloat(element.Surcote) > 0 && parseFloat(element.Surcote)) ? "✅💰 " : (parseFloat(element.Decote) > 0 && parseFloat(element.Decote)) ? "✅😑" : '❌😣'} %7C`;
            
            //Cell Macron
            finalStr += `${((parseFloat(element.Tauxplein_Mac) > 0 && parseFloat(element.Tauxplein_Mac) && !(parseFloat(element.Surcote_Mac) !== 0 ) && !(parseFloat(element.Decote_Mac) !== 0 ))) ? '🥳' : (parseFloat(element.Surcote_Mac) > 0 && parseFloat(element.Surcote_Mac)) ? "✅💰" : (parseFloat(element.Decote_Mac) > 0 && parseFloat(element.Decote_Mac)) ? "✅😑" : '❌😣'}`

        }

        string += finalStr += mention += "%0Ahttps://nosretraites-simulateur-cas-types.netlify.app/"
        setTwitterMessage(string);
    };


    return (
        <div className={styles.SharedButton}>
            <span className={styles.SharedText}>Partagez vos résultats </span><a href={`https://twitter.com/intent/tweet?text=${twitterMessage}`}
                data-size="large" target="_blank" rel="noreferrer"><img src={'TwitterShareIcon.svg'} width={"100px"} alt={"Partage Twitter"} /></a>
        </div>
    )
}