import React, { useEffect, useState } from 'react';
import styles from './Summary.module.scss';


export default function Summary(props) {
    const REFORM_AGE = 65;

    const [possibleRetirementNowData, setPossibleRetirementNowData] = useState();
    const [fullRetirementNowData, setFullRetirementNowData] = useState();
    const [possibleRetirementMacData, setPossibleRetirementMacData] = useState();
    const [fullRetirementMacData, setFullRetirementMacData] = useState();
    const [reformAgeData, setReformAgeData] = useState();
    const [loaded, setLoaded] = useState(false);
    const { selectedName, data } = props;


    useEffect(() => {
        async function init() {
            console.log('DATA SUMMARY', data);
            await setVariables(data);
        }
        init();
    }, [data]);

    // Compare the differences between the actual and the next reform
    async function setVariables(data) {
        //TMP variables to prevent waiting for the useState hool
        let possibleRetirementNowDataTmp, fullRetirementNowDataTmp, possibleRetirementMacDataTmp, fullRetirementMacDataTmp, reformAgeTmp;
        for (let row of data) {
            if (!possibleRetirementNowDataTmp && row.base.isPossible) {
                possibleRetirementNowDataTmp = row;
            }
            if (!fullRetirementNowDataTmp && row.base.isTauxPlein) {
                fullRetirementNowDataTmp = row;
            }
            if (!possibleRetirementMacDataTmp && row.macron.isPossible) {
                possibleRetirementMacDataTmp = row;
            }
            if (!fullRetirementMacDataTmp && row.macron.isTauxPlein) {
                fullRetirementMacDataTmp = row;
            }

            if (row.AgeLiq === REFORM_AGE) {
                reformAgeTmp = row;
            }

            // Definitely setting state data
            setPossibleRetirementNowData(possibleRetirementNowDataTmp);
            setFullRetirementNowData(fullRetirementNowDataTmp);
            setPossibleRetirementMacData(possibleRetirementMacDataTmp);
            setFullRetirementMacData(fullRetirementMacDataTmp);
            setReformAgeData(reformAgeTmp);
        };
        setLoaded(true);
    }

    function generateFirstSentence() {
        // Départ à la retraite possible actuel
        let strings = [];
        strings.push(<span>Actuellement, {selectedName} pourrait partir à la retraite dès {possibleRetirementNowData.AgeLiq} ans.</span>);

        // Si différence d'année de départ avec la réforme, l'afficher
        if (possibleRetirementNowData.AgeLiq < possibleRetirementMacData.AgeLiq) {
            strings.push(<span>Avec la réforme Macron , <strong>elle devrait attendre jusqu'à {possibleRetirementMacData.AgeLiq} ans pour avoir le droit de partir.</strong></span>);
        }
        // Sinon, afficher la potentiel différence de surcote/décôte
        else {
            const { base, macron } = possibleRetirementMacData;
            const delta = (base.surcote - base.decote) - (macron.surcote - macron.decote);
            if (delta > 0) {
                strings.push(<span> <strong> Avec la réforme Macron , elle pourra partir au même âge mais perdra {delta}% de surcôte (bonus).</strong></span>);
            }
        }
        return <p>{strings}</p>;
    }

    function generateSecondSentence() {
        let strings = [];

        const deltaSurcote = (reformAgeData.base.surcote - reformAgeData.base.decote) - (reformAgeData.macron.isPossible ? reformAgeData.macron.surcote - reformAgeData.macron.decote:-100);

        // Si aucune différence de sur/décote à l'age de départ, on n'affiche pas cette phrase
        if (deltaSurcote <= 0) return <></>;

        const getSurcoteDecoteString = (data) => {
            const delta = data.surcote - data.decote;
            if (delta === 0) return <>n'aurait pas de décote ni de surcote.</>
            return delta > 0 ? <>aurait une surcote de {delta}%.</> : <>aurait une décote de {Math.abs(delta)}%.</>
        }
        // Décote surcote actuelle
        strings.push(<span>Actuellement, si {selectedName} travaille jusqu'à {REFORM_AGE} ans, elle {getSurcoteDecoteString(reformAgeData.base)}</span>);
        // si on peut partir, Décote surcote Macron
        if (possibleRetirementMacData.AgeLiq <= REFORM_AGE) {
            strings.push(<span> <strong> Avec la réforme Macron, elle {getSurcoteDecoteString(reformAgeData.macron)}</strong></span>);
        }
        // Si on peut pas partir
        else{
            strings.push(<span> <strong> Avec la réforme Macron, elle ne pourra pas partir avant {possibleRetirementMacData.AgeLiq} ans.</strong></span>);
        }

        return <p>{strings}</p>;
    }



    if (loaded) {
        return (
            <div className={styles.Summary}>
                {generateFirstSentence()}
                {generateSecondSentence()}
            </div>
        )
    }
    return (<div></div>)
}
