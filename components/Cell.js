import React, { useEffect, useState } from 'react';
import styles from "./Cell.module.scss";
import computeData from './computeData';

export default function Cell({ data }) {

  const [displayBaseMessage, setDisplayBaseMessage] = useState("");
  const [displayMacronMessage, setDisplayMacronMessage] = useState("");
  const [displayMixteMessage, setDisplayMixteMessage] = useState("");
  const [age, setAge] = useState("")

  const displayTwoDecimalsMax = (number) => {
    return Math.ceil(number * 100) / 100;
  }

  useEffect(() => {
    // Different types of cell content
    const noRetirment = <div className={styles.RedMark}><span>❌</span><span> Retraite interdite</span></div>;
    const allowRetirment = <div className={styles.GreenMark}><span>✅</span><span> Taux plein</span></div>;
    const decoteMessage = (value) => <div className={styles.GreenMark}><span>✅</span><span> Decote -{displayTwoDecimalsMax(value)}%</span></div>;
    const surcoteMessage = (value) => <div className={styles.GreenMark}><span>✅</span><span> Surcote +{displayTwoDecimalsMax(value)}%</span></div>;

    // Init age text
    setAge(`${data.AgeLiq} ans`)

    const dataToDisplay = computeData(data);

    // Get the corresponding cell content for a specific reform
    function getReformCellContent(reformName){
      if (dataToDisplay[reformName].isPossible) {
        if (dataToDisplay[reformName].decote !== 0 && dataToDisplay[reformName].decote) {
          return decoteMessage(dataToDisplay[reformName].decote);
        }
  
        if (dataToDisplay[reformName].surcote !== 0 && dataToDisplay[reformName].surcote) {
          return surcoteMessage(dataToDisplay[reformName].surcote);
        }
  
        if (dataToDisplay[reformName].isTauxPlein) {
          return allowRetirment
        }
      } else {
        return noRetirment
      }
    }

    // Compute the cell content for all reforms
    setDisplayMacronMessage(getReformCellContent("macron"));
    setDisplayBaseMessage(getReformCellContent("base"));
  }, [data])



  return (
    <tr>
      <td className={styles.BoxCenter}>{age}</td>
      <td className={styles.Box}>{displayBaseMessage}</td>
      <td className={styles.Box}>{displayMacronMessage}</td>
    </tr>
  )
}
