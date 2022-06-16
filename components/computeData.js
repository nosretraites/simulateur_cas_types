export default function computeData(element) {
  const data = {
    base: {
      isPossible: parseFloat(element.Possible) ? true : false,
      isFullTime: parseFloat(element.Tauxplein) ? true : false,
      isDecote: parseFloat(element.Decote),
      isSurcote: parseFloat(element.Surcote),
    },
    macron: {
      isPossible: parseFloat(element.Possible_Mac) ? true : false,
      isFullTime: parseFloat(element.Tauxplein_Mac) ? true : false,
      isDecote: parseFloat(element.Decote_Mac),
      isSurcote: parseFloat(element.Surcote_Mac),
    }
  }


  let worst = false
  // Évitement d'une succession de ternaires car les messages
  // sont à conditionner avec les mêmes critères 
  if (!data.macron.isPossible && data.base.isPossible) {
      worst = true
  } else if (data.macron.isPossible && data.base.isPossible) {
      if (!data.macron.isFullTime && data.base.isFullTime) {
          worst = true
      } else if (data.macron.isDecote > data.base.isDecote) {
          worst = true
      } else if (data.macron.isFullTime && data.base.isFullTime) {
          if (data.macron.isSurcote < data.base.isSurcote) {
            worst = true
        }
      }
  }
  data.macron.worst = worst;

  return data
}
