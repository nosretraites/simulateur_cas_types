import {useState, useCallback, useEffect} from 'react'
import * as csv from "csvtojson"
import fetch from 'isomorphic-unfetch'


import Cell from '../components/cell'

export default function Home() {
  const [naissance, setNaissance] = useState(1969)
  const [ageDebutCarriere, setAgeDebutCarriere] = useState(21)
  const [sexe, setSexe] = useState('féminin')
  const [nombreEnfants, setNombreEnfants] = useState(0)

  const [result, setResult] = useState([])

  const handleNaissanceChange = e => setNaissance(e.target.value)
  const handleAgeDebutCarriereChange = e => setAgeDebutCarriere(e.target.value)
  const handleSexeChange = e => setSexe(e.target.value)
  const handleNombreEnfantsChange = e => setNombreEnfants(e.target.value)


  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/nosretraites/simulateur_cas_types_data/main/data/${naissance}.csv`)
    .then(response => {
      return response.text()
    })
    .then(body => {
      console.log(body)
      csv()
      .fromString(body)
      .then((data) => {
        const map = data.reduce((accum, value) => {
          const naissanceMap = accum[value.Naissance] || {}
          const debutMap = naissanceMap[value.Debut] || {}
          const sexeMap = debutMap[value.Sexe] || {}
          const nombreEnfantsMap = sexeMap[value.Enfants] || []

          nombreEnfantsMap.push(value)

          sexeMap[value.Enfants] = nombreEnfantsMap
          debutMap[value.Sexe] = sexeMap
          naissanceMap[value.Debut] = debutMap
          accum[value.Naissance] = naissanceMap
          return accum
        }, {})

        const sexeKey = sexe == "féminin" ? 2 : 1
        const slice = map[naissance] && map[naissance][ageDebutCarriere] && map[naissance][ageDebutCarriere][sexeKey] && map[naissance][ageDebutCarriere][sexeKey][nombreEnfants]
        console.log(slice)
        setResult(slice || [])
      })
    })

  }, [naissance, ageDebutCarriere, sexe, nombreEnfants])

  return (
    <>
      <h1>Simulateur</h1>
      <div>
        <div>
          <label htmlFor="naissance">Année de naissance</label>
          <input id="naissance" min="1900" max="2100" type="number" value={naissance} onChange={handleNaissanceChange} />
        </div>
        <div>
          <label htmlFor="ageDebutCarriere">Âge de début de carrière</label>
          <input id="ageDebutCarriere" min="12" max="40" type="number" value={ageDebutCarriere} onChange={handleAgeDebutCarriereChange} />
        </div>
        <div>
          <label htmlFor="sexe">Sexe</label>
          <select onChange={handleSexeChange}>
            <option value="féminin">Féminin</option>
            <option value="masculin">Masculin</option>
          </select>

        </div>
        <div>
          <label htmlFor="nombreEnfants">Nombre d&lsquo;enfants</label>
          <input id="nombreEnfants" min="0" max="20" type="number" value={nombreEnfants} onChange={handleNombreEnfantsChange} />
        </div>
      </div>
      <div>
        <div className="profil">
          <div>Né{sexe == "féminin" ? "e" : ""} en {naissance}{nombreEnfants > 0 ? (nombreEnfants == 1 ? " - 1 enfant" : ` - ${nombreEnfants} enfants`) : ""}</div>
          <div>Début de carrière : {ageDebutCarriere} ans</div>
        </div>
        <div className="resultats">
          <table>
            <thead>
              <tr><th>La retraite à</th><th>Loi actuelle</th><th>Macron</th></tr>
            </thead>
            <tbody>
            { result.map((r, i) => (
              <tr key={r.AgeLiq}>
                <td className="age">{r.AgeLiq} ans</td>
                <td><Cell dataset={result} index={i}/></td>
                <td><Cell dataset={result} index={i} macron/></td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
