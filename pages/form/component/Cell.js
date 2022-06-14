import React, { useEffect } from 'react';
import  styles from "./Cell.module.scss";

export function Cell({ data }) {

  const noRetirment = <span className={styles.RedMark}>❌ Retraite interdite</span>;
  const allowRetirment = <span className={styles.GreenMark}>✅ Taux plein</span>;
  const decoteMessage = (value) => <span className={styles.GreenMark}>✅ decote -{value}%</span>;
  const surcoteMessage = (value) => <span className={styles.GreenMark}>✅ surcote +{value}%</span>



  let displayBaseMessage = "";
  let displayMessageMacron = "";


  const dataToDisplay = {
    age: data.AgeLiq,
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
        displayMessageMacron = decoteMessage(dataToDisplay.macron.isDecote)
      }
    }

    if (dataToDisplay.macron.isFullTime) {
      displayMessageMacron = allowRetirment

      if (dataToDisplay.macron.isSurcote !== 0 && dataToDisplay.macron.isSurcote) {
        displayMessageMacron = surcoteMessage(dataToDisplay.macron.isSurcote)
      }
    }
  } else {
    displayMessageMacron = noRetirment
  }

  if (dataToDisplay.base.isPossible) {
    if (!dataToDisplay.base.isFullTime) {
      if (dataToDisplay.base.isDecote !== 0 && dataToDisplay.base.isDecote) {
        displayBaseMessage = decoteMessage(dataToDisplay.base.isDecote)
      }
    }

    if (dataToDisplay.base.isFullTime) {
      displayBaseMessage = allowRetirment

      if (dataToDisplay.base.isSurcote !== 0 && dataToDisplay.base.isSurcote) {
        displayBaseMessage = surcoteMessage(dataToDisplay.base.isSurcote)
      }
    }
  } else {
    displayBaseMessage = noRetirment
  }



  return (
    <tr key={key}>
      <td className={styles.BoxCenter}>{data.AgeLiq} ans</td>
      <td className={styles.Box}>{displayBaseMessage}</td>
      <td className={styles.Box}>{displayMessageMacron}</td>
    </tr>
  )
}
