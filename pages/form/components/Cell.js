import React, { useEffect, useState } from 'react';
import styles from "./Cell.module.scss";

export default function Cell({ data }) {

  const [displayBaseMessage, setDisplayBaseMessage] = useState("");
  const [displayMacronMessage, setDisplayMacronMessage] = useState("");
  const [age, setAge] = useState("")

  useEffect(() => {
    const noRetirment = <span className={styles.RedMark}>❌ Retraite interdite</span>;
    const allowRetirment = <span className={styles.GreenMark}>✅ Taux plein</span>;
    const decoteMessage = (value) => <span className={styles.GreenMark}>✅ decote -{value}%</span>;
    const surcoteMessage = (value) => <span className={styles.GreenMark}>✅ surcote +{value}%</span>;
    setAge(`${data.AgeLiq} ans`)

    const dataToDisplay = {
      base: {
        isPossible: parseFloat(data.Possible) ? true : false,
        isFullTime: parseFloat(data.Tauxplein) ? true : false,
        isDecote: parseFloat(data.Decote),
        isSurcote: parseFloat(data.Surcote),
      },
      macron: {
        isPossible: parseFloat(data.Possible_Mac) ? true : false,
        isFullTime: parseFloat(data.Tauxplein_Mac) ? true : false,
        isDecote: parseFloat(data.Decote_Mac),
        isSurcote: parseFloat(data.Surcote_Mac),
      }
    }

    if (dataToDisplay.macron.isPossible) {
      if (!dataToDisplay.macron.isFullTime) {
        if (dataToDisplay.macron.isDecote !== 0 && dataToDisplay.macron.isDecote) {
          setDisplayMacronMessage(decoteMessage(dataToDisplay.macron.isDecote))
        }
      }

      if (dataToDisplay.macron.isFullTime) {
        displayMessageMacron = allowRetirment

        if (dataToDisplay.macron.isSurcote !== 0 && dataToDisplay.macron.isSurcote) {
          setDisplayMacronMessage(surcoteMessage(dataToDisplay.macron.isSurcote))
        }
      }
    } else {
      setDisplayMacronMessage(noRetirment)
    }

    if (dataToDisplay.base.isPossible) {
      if (!dataToDisplay.base.isFullTime) {
        if (dataToDisplay.base.isDecote !== 0 && dataToDisplay.base.isDecote) {
          setDisplayBaseMessage(decoteMessage(dataToDisplay.base.isDecote))
        }
      }

      if (dataToDisplay.base.isFullTime) {
        setDisplayBaseMessage(allowRetirment)

        if (dataToDisplay.base.isSurcote !== 0 && dataToDisplay.base.isSurcote) {
          setDisplayBaseMessage(surcoteMessage(dataToDisplay.base.isSurcote))
        }
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
