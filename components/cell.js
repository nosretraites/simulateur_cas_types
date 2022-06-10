export default function Cell({dataset, data, index, macron}) {
  const row = data || (dataset && dataset[index])

  const possibleBase = parseFloat(row.Possible)
  const possibleMacron = parseFloat(row.Possible_Mac)
  const possible = macron ? possibleMacron : possibleBase

  const tauxPleinBase = parseFloat(row.Tauxplein)
  const tauxPleinMacron = parseFloat(row.Tauxplein_Mac)
  const tauxPlein = macron ? tauxPleinMacron : tauxPleinBase

  const decoteBase = parseFloat(row.Decote)
  const decoteMacron = parseFloat(row.Decote_Mac)
  const decote = macron ? decoteMacron : decoteBase

  const surcoteBase = parseFloat(row.Surcote)
  const surcoteMacron = parseFloat(row.Surcote_Mac)
  const surcote = macron ? surcoteMacron : surcoteBase

  let pire = false
  // Évitement d'une succession de ternaires car les messages
  // sont à conditionner avec les mêmes critères 
  if (!possibleMacron && possibleBase) {
    pire = true
  } else if (possibleMacron && possibleBase) {
    if (!tauxPleinMacron && tauxPleinBase) {
      pire = true
    } else if (decoteMacron > decoteBase) {
      pire = true
    } else if (tauxPleinMacron && tauxPleinBase) {
      if (surcoteMacron < surcoteBase) {
        pire = true
      }
    }
  }
  pire = macron ? pire : false

  return (
    <div className={`cell ${macron ? (pire ? "worst" : "same") : ""}`}>
      { possible ? (
        <>
          <img src="yes.svg"/>
          <div>{ tauxPlein ? (surcote ? `surcote +${surcote}` : "taux plein") : `décote -${decote}`}</div>
        </>
      ) : (
        <>
          <img src="no.svg"/>
          <div>retraite interdite</div>
        </>
      ) }
    </div>
  )
}
