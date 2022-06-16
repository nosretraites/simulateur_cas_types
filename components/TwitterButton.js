import styles from './TwitterButton.module.scss';
import computeData from './computeData';
import { useEffect, useState } from 'react';

export default function TwitterButton(props) {

    const [twitterMessage, setTwitterMessage] = useState("")

    useEffect(() => {
        twitterContentGenerator()
    }, [])

    function twitterContentGenerator() {

        let finalStr = "Âge | Avant | Après\n"
        let string = `J'ai simulé la réforme des retraites Macron.\n ${props.numberOfChildren === "0" ? "🧓" : props.numberOfChildren === "1" ? "👩‍👧" : "👩‍👦‍👦"} né${props.gender === "2" ? "e" : ""} en ${props.birthDate}, début de carrière ${props.careerStartAge} ans:\n\n`
        let mention = "\n@nosretraites";
        for (let index = 0; index < props.result.length; index++) {
            const element = props.result[index];
            if (index !== 0 && index !== props.result.length) {
                finalStr += "\n"
            }
            if(element.AgeLiq === "61") {
                finalStr += `${element.AgeLiq} |`;
            } else {
                finalStr += `${element.AgeLiq} |`;
            }

            const { base, macron } = computeData(element);
            
            //Cell Base
            finalStr += `${(!base.isPossible) ? '❌😣' : (base.isDecote) ? '✅😑' : (base.isFullTime ? '✅😏' : '✅😎')}|`;
            
            //Cell Macron
            //finalStr += `${((parseFloat(element.Tauxplein_Mac) > 0 && parseFloat(element.Tauxplein_Mac) && !(parseFloat(element.Surcote_Mac) !== 0 ) && !(parseFloat(element.Decote_Mac) !== 0 ))) ? '✅🥳' : (parseFloat(element.Surcote_Mac) > 0 && parseFloat(element.Surcote_Mac)) ? "✅💰" : (parseFloat(element.Decote_Mac) > 0 && parseFloat(element.Decote_Mac)) ? "✅😑" : '❌😣'}`
            finalStr += `${(!macron.isPossible) ? '❌😣' : (macron.worst ? '✅📉' : '✅=')}`

        }

        string += finalStr += mention += "\nhttps://nosretraites-simulateur-cas-types.netlify.app"
        setTwitterMessage(string);
    };


    return (
        <div className={styles.SharedButton}>
            <span className={styles.SharedText}>Partagez vos résultats </span><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterMessage)}`}
                data-size="large" target="_blank" rel="noreferrer"><img src={'TwitterShareIcon.svg'} width={"100px"} alt={"Partage Twitter"} /></a>
                <pre>{twitterMessage}</pre>
        </div>
    )
}