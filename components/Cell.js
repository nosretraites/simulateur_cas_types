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
    const noRetirment = <span className={styles.RedMark}>❌ Retraite interdite</span>;
    const allowRetirment = <span className={styles.GreenMark}>✅ Taux plein</span>;
    const decoteMessage = (value) => <span className={styles.GreenMark}>✅ decote -{displayTwoDecimalsMax(value)}%</span>;
    const surcoteMessage = (value) => <span className={styles.GreenMark}>✅ surcote +{displayTwoDecimalsMax(value)}%</span>;

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
