import styles from './TwitterButton.module.scss';
import computeData from './computeData';
import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

export default function TwitterButton(props) {


    const [twitterMessage, setTwitterMessage] = useState("");
    // currentDepartureAge
    // macDepartureAge
    // lowerWage
    const [socialsData, setSocialsData] = useState();
    useEffect(() => {
        if (!props.socialsData) return;
        setSocialsData(props.socialsData);
        twitterContentGenerator();
    }, [props])

    function twitterContentGenerator() {
        if (!(socialsData && socialsData.currentDepartureAge && socialsData.currentDepartureAge)) return "";
        let string =
            `J'ai simulé les conséquences de la réforme sur le simulateur @nosretraites` + '\n\n' +
            `Aujourd'hui, je peux partir à la retraite à ${socialsData.macDepartureAge}.` +
            ` Avec la réforme, je devrais partir à ${socialsData.currentDepartureAge}${socialsData.lowerWage ? ' avec une retraite plus faible' : ''}.` + '\n\n' +
            `https://nosretraites-simulateur-cas-types.netlify.app`;

        setTwitterMessage(string);
    };

    function FormattedTwitterMessage() {
        if (!(socialsData && socialsData.currentDepartureAge && socialsData.currentDepartureAge)) return <></>;
        return <div className={styles.contentWrapper}>
            <p>J'ai simulé les conséquences de la réforme sur le simulateur <span className={styles.link}>@nosretraites</span></p>
            <p>
                <span>Aujourd'hui, je peux partir à la retraite à {socialsData.currentDepartureAge}.</span>
                <span>Avec la réforme, je devrais partir à {socialsData.macDepartureAge}{socialsData.lowerWage ? ' avec une retraite plus faible' : ''}.</span>
            </p>
            <p className={styles.link}>https://nosretraites-simulateur-cas-types.netlify.app</p>
        </div>
    }

    return (
        <div className={styles.mockupTweetWrapper}>
            <svg className={styles.topLeft} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" /></svg>
            <svg className={styles.botRight} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" /></svg>

            <h3 className={styles.title}>
                <span>Je partage mes résultats</span>
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
            <div className={styles.SocialsButtonsRow}>
                {/* <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&layout=button_count&size=large&width=132&height=28&appId" width="132" height="28" style="border:none;overflow:hidden" scrolling="no" frameBorder="0" allowFullScreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe> */}
                {/* <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore" rel="noreferrer">Partager</a></div> */}
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterMessage)}`}
                    className={styles.shareButton} data-size="large" target="_blank" rel="noreferrer">
                    Partager sur Twitter
                </a>
            </div>

        </div>
    )
}