import React, { useEffect, useState } from 'react';
import styles from "./Cell.module.scss";
import computeData from './computeData';

export default function Cell({ data }) {

  const [displayBaseMessage, setDisplayBaseMessage] = useState("");
  const [displayMacronMessage, setDisplayMacronMessage] = useState("");
  const [age, setAge] = useState("")

  const displayTwoDecimalsMax = (number) => {
    return Math.ceil(number * 100) / 100;
  }

  useEffect(() => {
    const noRetirment = <span className={styles.RedMark}>❌ Retraite interdite</span>;
    const allowRetirment = <span className={styles.GreenMark}>✅ Taux plein</span>;
    const decoteMessage = (value) => <span className={styles.GreenMark}>✅ decote -{displayTwoDecimalsMax(value)}%</span>;
    const surcoteMessage = (value) => <span className={styles.GreenMark}>✅ surcote +{displayTwoDecimalsMax(value)}%</span>;
    setAge(`${data.AgeLiq} ans`)

    const dataToDisplay = computeData(data);

    if (dataToDisplay.macron.isPossible) {
      if (dataToDisplay.macron.decote !== 0 && dataToDisplay.macron.decote) {
        setDisplayMacronMessage(decoteMessage(dataToDisplay.macron.decote))
      }

      if (dataToDisplay.macron.surcote !== 0 && dataToDisplay.macron.surcote) {
        setDisplayMacronMessage(surcoteMessage(dataToDisplay.macron.surcote))
      }

      if (dataToDisplay.macron.isTauxPlein) {
        setDisplayMacronMessage(allowRetirment)
      }
    } else {
      setDisplayMacronMessage(noRetirment)
    }

    if (dataToDisplay.base.isPossible) {

      if (dataToDisplay.base.decote !== 0 && dataToDisplay.base.decote) {
        setDisplayBaseMessage(decoteMessage(dataToDisplay.base.decote))
      }

      if (dataToDisplay.base.surcote !== 0 && dataToDisplay.base.surcote) {
        setDisplayBaseMessage(surcoteMessage(dataToDisplay.base.surcote))
      }

      if (dataToDisplay.base.isTauxPlein) {
        setDisplayBaseMessage(allowRetirment)
      }

    } else {
      setDisplayBaseMessage(noRetirment)
    }
  }, [data])



  return (
    <tr>
      <td className={styles.BoxCenter}>{age}</td>
      <td className={styles.Box}>{displayBaseMessage}</td>
      <td className={styles.Box}>{displayMacronMessage}</td>
    </tr>
  )
}
