import styles from './TwitterButton.module.scss';
import computeData from './computeData';
import { useEffect, useState } from 'react';

export default function TwitterButton(props) {

    const [twitterMessage, setTwitterMessage] = useState("")

    useEffect(() => {
        twitterContentGenerator()
    }, [props])

    function twitterContentGenerator() {

        let finalStr = "Âge| Avant | Après\n"
        let string = `J'ai simulé la réforme des retraites Macron.\n${!props.isMainParent ? "👴" : props.numberOfChildren === "0" ? "🧓" : props.numberOfChildren === "1" ? "👩‍👧" : "👩‍👦‍👦"} né${props.isMainParent ? "e" : ""} en ${props.birthDate}, début de carrière ${props.careerStartAge} ans :\n\n`
        let mention = "\n@nosretraites";
        for (let index = 0; index < props.result.length; index++) {
            const element = props.result[index];
            if (index !== 0 && index !== props.result.length) {
                finalStr += "\n"
            }
            if (element.AgeLiq === "61") {
                finalStr += `${element.AgeLiq} |`;
            } else {
                finalStr += `${element.AgeLiq} |`;
            }

            const { base, macron } = computeData(element);

            //Cell Base
            finalStr += `${(!base.isPossible) ? '❌😣' : (base.isDecote) ? '✅😕' : (base.isFullTime ? '✅🙂' : '✅🙂')}|`;

            //Cell Macron
            finalStr += `${(!macron.isPossible) ? (macron.worst ? '❌😨' : '❌😣') : ((base.isDecote) ? '✅😕' : ((macron.worst) ? '✅😑' : '✅🙂'))}`;
        }

        string += finalStr += mention += "\nhttps://nosretraites-simulateur-cas-types.netlify.app"
        setTwitterMessage(string);
    };

    function FormattedTwitterMessage() {
        const strings = [];
        strings.push(<div key="intro">
            <p>J'ai simulé la réforme des retraites Macron.</p>
            <p>{!props.isMainParent ? "👴" : props.numberOfChildren === "0" ? "🧓" : props.numberOfChildren === "1" ? "👩‍👧" : "👩‍👦‍👦"} né{props.isMainParent ? "e" : ""} en {props.birthDate}, début de carrière {props.careerStartAge} ans :</p>
            <br />
        </div>);
        strings.push(<p key="tableHeader">Âge | Avant | Après</p>);

        for (let index = 0; index < props.result.length; index++) {
            const element = props.result[index];

            const { base, macron } = computeData(element);

            //Cell Base
            const baseCell = `${(!base.isPossible) ? '❌😣' : (base.isDecote) ? '✅😕' : (base.isFullTime ? '✅🙂' : '✅🙂')}`;

            //Cell Macron
            const macronCell = `${(!macron.isPossible) ? (macron.worst ? '❌😨' : '❌😣') : ((base.isDecote) ? '✅😕' : ((macron.worst) ? '✅😑' : '✅🙂'))}`;

            strings.push(<p key={index}>
                {element.AgeLiq}   | {baseCell} | {macronCell}
            </p>
            )
        }
        strings.push(<br key="filler" />);
        strings.push(<p className={styles.link} key="mention">@nosretraites</p>);
        strings.push(<p className={styles.link} key="link">https://nosretraites-simulateur-cas-types.netlify.app</p>);

        return <>{strings}</>;
    }


    return (
        <div className={styles.mockupTweetWrapper}>
                <svg className={styles.topLeft} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>
                <svg className={styles.botRight} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>

            <h3 className={styles.title}>
                <span>Je partage mes résultats<br/>sur Twitter</span>
            </h3>
            <div className={styles.mockupTweet}>
                <img src={props.selectedPicto} width={"48px"} />

                <div className={styles.mockupTweetContent}>
                    <p className={styles.header}>
                        <span className={styles.profileName}>{props.selectedName}</span><span className={styles.profileHandle}>@{props.selectedName} · 1min</span>
                    </p>
                    <FormattedTwitterMessage />
                </div>
            </div>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterMessage)}`}
                className={styles.shareButton} data-size="large" target="_blank" rel="noreferrer">
                Partager sur Twitter
            </a>
        </div>
    )
}