export default function computeData(data) {

  let worst = false
  // Évitement d'une succession de ternaires car les messages
  // sont à conditionner avec les mêmes critères 
  if (!data.macron.isPossible && data.base.isPossible) {
      worst = true
  } else if (data.macron.isPossible && data.base.isPossible) {
      if (!data.macron.isTauxPlein && data.base.isTauxPlein) {
          worst = true
      } else if (data.macron.decote > data.base.decote) {
          worst = true
      } else if (data.macron.isTauxPlein && data.base.isTauxPlein) {
          if (data.macron.surcote < data.base.surcote) {
            worst = true
        }
      }
  }
  data.macron.worst = worst;

  return data
}
