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


    const XMarkSvg = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-x" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">    <path stroke="none" d="M0 0h24v24H0z" fill="none" />    <circle cx="12" cy="12" r="9" />    <path d="M10 10l4 4m0 -4l-4 4" />  </svg>;
    const checkMarkSvg = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">    <path stroke="none" d="M0 0h24v24H0z" fill="none" />    <circle cx="12" cy="12" r="9" />    <path d="M9 12l2 2l4 -4" />  </svg>;
    const noRetirment = <div className={styles.RedMark}><span>{XMarkSvg}</span><span> Retraite interdite</span></div>;
    const allowRetirment = (color = "GreenMark") => <div className={styles[color]}><span>{checkMarkSvg}</span><span> Taux plein</span></div>;
    const decoteMessage = (value, color = "GreenMark") => <div className={styles[color]}><span>{checkMarkSvg}</span><span> Decote -{displayTwoDecimalsMax(value)}%</span></div>;
    const surcoteMessage = (value, color = "GreenMark") => <div className={styles[color]}><span>{checkMarkSvg}</span><span> Surcote +{displayTwoDecimalsMax(value)}%</span></div>;

    // Init age text
    setAge(`${data.AgeLiq} ans`)

    const dataToDisplay = computeData(data);

    // Get the corresponding cell content for a specific reform
    function getReformCellContent(reformName) {
      if (dataToDisplay[reformName].isPossible) {
        if (dataToDisplay[reformName].decote !== 0 && dataToDisplay[reformName].decote) {
          let color = "GreenMark";
          // Orange color if the value is less beneficial
          if (reformName === 'macron' && dataToDisplay.macron.decote > dataToDisplay.base.decote) {
            color = 'OrangeMark';
          }
          return decoteMessage(dataToDisplay[reformName].decote, color);
        }

        if (dataToDisplay[reformName].surcote !== 0 && dataToDisplay[reformName].surcote) {
          let color = "GreenMark";
          // Orange color if the value is less beneficial
          if (reformName === 'macron' && dataToDisplay.macron.surcote < dataToDisplay.base.surcote) {
            color = 'OrangeMark';
          }
          return surcoteMessage(dataToDisplay[reformName].surcote, color);
        }

        if (dataToDisplay[reformName].isTauxPlein) {
          let color = "GreenMark";
          // Orange color if the value is less beneficial
          if (reformName === 'macron' && dataToDisplay.base.surcote) {
            color = 'OrangeMark';
          }
          return allowRetirment(color)
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
