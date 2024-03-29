import legalParameters from './legalParametersByYearOfBirth.json';

export function computeSituation(userInputs) {
    let { birthDate, careerStartAge, isMainParent, numberOfChildren, yearOfCareerInterruption, isPublicCareer, countOfChildrenBefore2004 } = userInputs;

    // MANQUE CES ARGUMENTS
    // Interrupt
    // const yearOfCareerInterruption = 0;
    // const isPublicCareer = true;
    // const countOfChildrenBefore2004 = 0;

    const situationArray = [];

    const CURRENT_LEGISLATION_SUFFIX = "now";
    const MACRON_LEGISLATION_SUFFIX = "mac";

    // On ne garde que les paramètres liés à l'année de naissance
    const parameters = legalParameters[birthDate];

    //On crée un tableau avec tous les âges de liquidations possibles de 60 à 67          // 60 et pas 58 (même si idéalement 58 serait une bonne idée)
    const possibleRetirementAges = [58, 59, 60, 61, 62, 63, 64, 65, 66, 67];


    // Retour les possibilités de retraite pour les deux législations (actuel & Macron) pour un age de départ donné
    const returnResultsForRetirementAge = (retirementAge) => {
        // VARIABLES INTERMÉDIAIRES DE CALCUL
        // * DC: durée de cotisation
        // * DV: durée d'assurance validée  qui peut être supérieure à DC en cas de majoration
        // * CL: Dummy carrière longue
        let DC, DV;

        // La durée cotisée est égal à l'âge de liquidation moins l'âge de début de carrière moins les années d'interruption (sans aucune validation)
        // ATTENTION on multiplie par 4 ici pour exprimer les durées en trimestres (alors que les âges sont en années)
        DC = (retirementAge - careerStartAge - yearOfCareerInterruption) * 4;
        DV = DC;

        // *Le départ pour carrière longue est autorisé si l'age de début de carrière est de 19 ans et si la durée de cotisation est supérieure à la durée pour taux plein
        let CL = {};

        CL.now = careerStartAge < 20 && DC >= parameters.DTP_now;
        CL.mac = careerStartAge < 20 && DC >= parameters.DTP_mac;

        // 1 annuité de majoration pour les CL avant 18 ans
         const DTP_mac18 = parameters.DTP_mac + 4;
         // A partir de la génération 1961 && age minimum de départ, 60 ans
         if(birthDate > 1960 && retirementAge >= 60){
        CL.mac18 = careerStartAge < 18 && DC >= DTP_mac18;
         }


        // CALCUL DE LA MAJORATION DE DURÉE D'ASSURANCE POUR ENFANT
        // Privé et Public
        // Dans le privé on donne 8 trimestres de validation suplémentaire par enfants, mais il ne compte que si la durée validée est inférieure ou égale à DTP. Dans le public c'est deux trimestres par enfants nés après 2004
        if (isMainParent) {
            if (isPublicCareer) {
                DV = DC;
                // Les enfants nés avant 2004 donnent à la mère 4 trimestres considérés comme cotisés
                DV += 4 * countOfChildrenBefore2004;
                // Dans la fonction publique d'Etat c'est 2 trim validés par enfant né après 2004 
                DV += 2 * (numberOfChildren - countOfChildrenBefore2004);
            }
            else {
                DV = DC + (8 * numberOfChildren);
            }
        }

        // Ensuite on donne pour chaque âge une réponse pour les 4 variables de sorties, dans les deux législations
        // Autorisé à partir si l'âge de liquidation est supérieur à l'AOD ou si carrière longue et âge supérieur à l'âge carrière longue avec un cas spé pour carrière démarrée avant 16 ans

        const computeForLegislation = (suffix = 'now') => {
            let isPossible = false;
            let isTauxPlein = false;
            let CL_EffectiveDate = 0;
            let decote = 0;
            let surcote = 0;

            // isPossible
            if (retirementAge < parameters[`AOD_${suffix}`]) {
                isPossible = false;
            }
            else {
                isPossible = true;
            }

            // GESTION DES CL 18 seulement pour la nouvelle réforme
            if (suffix === "mac" && CL.mac18) {
                isPossible = true;

                // Meven: Sert uniquement pour le résumé textuel
                //Si on aurait été déjà été à la retraite sans dispositif CL, ne pas préciser que c'est une CL
                if (retirementAge < parameters[`AOD_${suffix}`]) {
                    // Nombre de trimestres fait en plus du nb de trimestres min
                    const surplusTrimestre = DC - DTP_mac18;
                    // Départ minimum 60 ans
                    CL_EffectiveDate = Math.max(60,retirementAge - (surplusTrimestre / 4));
                }
            }
            // GESTION DES CL CLASSIQUES
            else if (CL[suffix] && retirementAge >= parameters[`AgeCL_${suffix}`]) {
                isPossible = true;

                // Meven: Sert uniquement pour le résumé textuel
                //Si on aurait été déjà été à la retraite sans dispositif CL, ne pas préciser que c'est une CL
                if (retirementAge <= parameters[`AOD_${suffix}`]) {
                    // Nombre de trimestres fait en plus du nb de trimestres min
                    const surplusTrimestre = DC - parameters[`DTP_${suffix}`];
                    CL_EffectiveDate =  Math.max(parameters[`AgeCL_${suffix}`],retirementAge - (surplusTrimestre / 4));
                }
            }
            //////////// PAs  sur de ce que dit cette condition on peut l'enlever je pense
            // if (CL[suffix] && careerStartAge < 15 && retirementAge > parameters[`AgeCL_${suffix}`] - 1) {
            //     isPossible = true;
            // }


            // Décote
            if (isPossible) {
                decote = Math.min(parameters[`DTP_${suffix}`] - DV, (parameters.ATP - retirementAge) * 4, 20) * 1.25;
                if (decote < 0) decote = 0;
            }

            // surcote
            if (isPossible) {
                surcote = Math.min(DV - parameters[`DTP_${suffix}`], Math.floor((retirementAge - parameters[`AOD_${suffix}`]) * 4)) * 1.25;
                if (surcote < 0) surcote = 0;
            }

            // Taux plein
            if (isPossible) {
                if (decote === 0 && surcote === 0) {
                    isTauxPlein = true;
                }
            }

            return { isPossible, isTauxPlein, CL_EffectiveDate, decote, surcote };

        }


        const returnObj = {};
        // Calcul des résultats pour les 2 législations
        returnObj.base = computeForLegislation('now');
        returnObj.macron = computeForLegislation('mac');

        return returnObj;
    }

    possibleRetirementAges.forEach((age) => {
        let result = returnResultsForRetirementAge(age);
        result = { ...result, ...userInputs, ...parameters, AgeLiq: age };

        situationArray.push(result);
    })

    return situationArray;
}