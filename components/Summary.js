import React, { useEffect, useState } from 'react';
import styles from './Summary.module.scss';


export default function Summary(props) {
    const REFORM_AGE = 64;


    const [possibleRetirementNowData, setPossibleRetirementNowData] = useState();
    const [fullRetirementNowData, setFullRetirementNowData] = useState();
    const [possibleRetirementMacData, setPossibleRetirementMacData] = useState();
    const [fullRetirementMacData, setFullRetirementMacData] = useState();
    const [reformAgeData, setReformAgeData] = useState();
    const [refreshKey, setRefreshKey] = useState();
    const [loaded, setLoaded] = useState(false);
    const { selectedName, data } = props;
    const [firstSentence, setFirstSentence] = useState();
    const [secondSentence, setSecondSentence] = useState();
    const [tauxPleinSentence, setTauxPleinSentence] = useState();

    useEffect(() => {
        if(! (possibleRetirementNowData && possibleRetirementMacData && fullRetirementNowData && fullRetirementMacData)) return;
        setFirstSentence(computeFirstSentence());
        setSecondSentence(computeSecondSentence());
        setTauxPleinSentence(computeTauxPleinSentence());
    },[refreshKey]);

    useEffect(() => {
        async function init() {
        await setVariables(data);
        };
        init();
    }, [props.data]);    



    function getAgeAndMonthString(year) {
        const string = `${Math.floor(year)} ans`
        if (year % 1 === 0) {
            return string;
        }
        else {
            // Convert the digits into number of months
            const months = Math.round(year % 1 * 12);
            return `${string} et ${months} mois`
        }
    }

    // Compare the differences between the actual and the next reform
    async function setVariables(data) {
        //TMP variables to prevent waiting for the useState hool
        let possibleRetirementNowDataTmp;
        let fullRetirementNowDataTmp;
        let possibleRetirementMacDataTmp;
        let fullRetirementMacDataTmp;
        let reformAgeTmp;

        for (let row of data) {
            if (!possibleRetirementNowDataTmp && row.base.isPossible) {
                possibleRetirementNowDataTmp = row;
            }
            if (!fullRetirementNowDataTmp && (row.base.isTauxPlein || row.base.surcote)) {
                fullRetirementNowDataTmp = row;
            }
            if (!possibleRetirementMacDataTmp && row.macron.isPossible) {
                possibleRetirementMacDataTmp = row;
            }
            if (!fullRetirementMacDataTmp && (row.macron.isTauxPlein || row.macron.surcote)) {
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
        const key=(Math.random() + 1).toString(36).substring(7);
        setRefreshKey(key);
    }

    function computeFirstSentence() {
        // Départ à la retraite possible actuel
        let strings = [];


        const currentDepartureAge = possibleRetirementNowData.base.CL_EffectiveDate ? possibleRetirementNowData.base.CL_EffectiveDate : possibleRetirementNowData.AOD_now;
        const currentDepartureAgeString = getAgeAndMonthString(currentDepartureAge);
        const macDepartureAge = possibleRetirementMacData.macron.CL_EffectiveDate ? possibleRetirementMacData.macron.CL_EffectiveDate : possibleRetirementMacData.AOD_mac;
        const macDepartureAgeString = getAgeAndMonthString(macDepartureAge);

        //  data to send back to the socials section
        const callbackData = {
            currentDepartureAge: currentDepartureAgeString,
            macDepartureAge: macDepartureAgeString,
            lowerWage: false
        }

        strings.push(<p>Actuellement, {selectedName} peut partir à la retraite dès {currentDepartureAgeString}.</p>);

        // Si différence d'année de départ avec la réforme, l'afficher
        if (currentDepartureAge < macDepartureAge) {
            strings.push(<p>Avec la réforme, <strong>{props.isMainParent ? "elle" : "il"} devra attendre jusqu'à {macDepartureAgeString} pour avoir le droit de partir.</strong></p>);
        }
        // Sinon, afficher la potentiel différence de surcote/décôte
        else {
            const { base, macron } = possibleRetirementMacData;
            const delta = (base.surcote - base.decote) - (macron.surcote - macron.decote);

            if (delta > 0) {

                // Update the callback data
                callbackData.lowerWage = true;


                strings.push(<span> <strong> Avec la réforme Macron, {props.isMainParent ? "elle" : "il"} pourra partir au même âge mais perdra {delta}% de surcôte.</strong></span>);
            }
            else {
                strings.push(<span> Avec la réforme, {props.isMainParent ? "elle" : "il"} pourra partir au même âge.</span>);
            }
        }

        if (props && props.socialDataCallback) {
            props.socialDataCallback(callbackData);
        }

        return <div className={styles.firstSentence}>{strings}</div>;
    }

    function computeSecondSentence() {
        let strings = [];

        const deltaSurcote = (reformAgeData.base.surcote - reformAgeData.base.decote) - (reformAgeData.macron.isPossible ? reformAgeData.macron.surcote - reformAgeData.macron.decote : -100);

        // Si aucune différence de sur/décote à l'age de départ, on n'affiche pas cette phrase
        if (deltaSurcote <= 0) return <></>;

        const getSurcoteDecoteString = (data) => {
            const delta = data.surcote - data.decote;
            if (delta === 0) return <>n'a pas de décote ni de surcote.</>
            return delta > 0 ? <>a une surcote de {delta}%.</> : <>a une décote de {Math.abs(delta)}%.</>
        }
        const getSurcoteDecoteMacronString = (data) => {
            const delta = data.surcote - data.decote;
            if (delta === 0) return <>perdra cette surcote.</>
            return delta > 0 ? <>n'aura qu'une surcote de {delta}%.</> : <>aura une décote de {Math.abs(delta)}%.</>
        }
        // Décote surcote actuelle
        strings.push(<span>Actuellement, si {selectedName} travaille jusqu'à {REFORM_AGE} ans, {props.isMainParent ? "elle" : "il"} {getSurcoteDecoteString(reformAgeData.base)}</span>);
        // si on peut partir, Décote surcote Macron
        if (possibleRetirementMacData.AgeLiq <= REFORM_AGE) {
            strings.push(<span> <strong> Avec la réforme, {props.isMainParent ? "elle" : "il"} {getSurcoteDecoteMacronString(reformAgeData.macron)}</strong></span>);
        }
        // Si on peut pas partir
        else {
            strings.push(<span> <strong> Avec la réforme, {props.isMainParent ? "elle" : "il"} ne pourra pas partir avant {possibleRetirementMacData.AgeLiq} ans.</strong></span>);
        }

        return <p>{strings}</p>;
    }

    
    function computeTauxPleinSentence() {
        if(!(fullRetirementNowData && fullRetirementMacData)) return;
        let strings = [];
        const currentDepartureAge = fullRetirementNowData.base.CL_EffectiveDate ? fullRetirementNowData.base.CL_EffectiveDate : fullRetirementNowData.AgeLiq;
        const currentDepartureAgeString = getAgeAndMonthString(currentDepartureAge);
        const macDepartureAge = fullRetirementMacData.macron.CL_EffectiveDate ? fullRetirementMacData.macron.CL_EffectiveDate : fullRetirementMacData.AgeLiq;
        const macDepartureAgeString = getAgeAndMonthString(macDepartureAge);
        if(currentDepartureAge >= macDepartureAge){
            return <p>Dans les deux cas, {props.isMainParent ? "elle" : "il"} pourra partir à taux plein à {currentDepartureAgeString}.</p>
        }

        if(currentDepartureAge < macDepartureAge){
            return <p>Actuellement, {props.isMainParent ? "elle" : "il"} peut partir à taux plein à {currentDepartureAgeString}. Après la réforme, {props.isMainParent ? "elle" : "il"} devra attendre {macDepartureAgeString}.</p>
        }
    }



    if (loaded) {
        return (
            <div className={styles.Summary}>
                {firstSentence}
                {tauxPleinSentence}
                {secondSentence}

            </div>
        )
    }
    return (<div></div>)
}
