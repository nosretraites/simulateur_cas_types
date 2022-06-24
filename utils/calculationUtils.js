import legalParameters from './legalParametersByYearOfBirth.json';

export function computeSituation(userInputs) {
    const { birthDate, careerStartAge, gender, numberOfChildren } = userInputs;
    // MANQUE CES ARGUMENTS
    // Public
    // Interrupt
    // Enfants_pre2004
    const interruptedCareer = 0;
    const publicCareer = 0;
    const Enfants_pre2004 = 0;

    const situationArray = [];

    // Au dessus d'une année de naissance 1969, toutes les valeurs sont similaires
    const referenceBirthDate = birthDate >= 1974 ? 1973 : birthDate;

    // On ne garde que les paramètres liés à l'année de naissance
    const parameters = legalParameters[referenceBirthDate];

    //On crée un tableau avec tous les âges de liquidations possibles de 58 à 67
    const possibleRetirementAges = [60, 61, 62, 63, 64, 65, 66, 67];


    // Retour les possibilités de retraite pour les deux législations (actuel & Macron) pour un age de départ donné
    const returnResultsForRetirementAge = (AgeLiquid) => {
        // VARIABLES INTERMÉDIAIRES DE CALCUL
        // * DC: durée de cotisation
        // * DV: durée d'assurance validée  qui peut être supérieure à DC en cas de majoration
        // * CL: Dummy carrière longue
        let DC, DV, CL;

        // La durée cotisée est égal à l'âge de liquidation moins l'âge de début de carrière moins les années d'interruption (sans aucune validation)
        // ATTENTION on multiplie par 4 ici pour exprimer les durées en trimestres (alors que les âges sont en années)
        DC = (AgeLiquid - careerStartAge - interruptedCareer) * 4;
        DV = DC;

        // *Le départ pour carrière longue est autorisé si l'age de début de carrière est de 19 ans et si la durée de cotisation est supérieure à la durée pour taux plein
        CL = careerStartAge < 20 && DC >= parameters.DTP ? 1 : 0;

        // CALCUL DE LA MAJORATION DE DURÉE D'ASSURANCE POUR ENFANT
        // Privé et Public
        // Dans le privé on donne 8 trimestres de validation suplémentaire par enfants, mais il ne compte que si la durée validée est inférieure ou égale à DTP. Dans le public c'est deux trimestres par enfants nés après 2004
        if (gender = 2 && DV <= parameters.DTP) {
            if (publicCareer = 0) {
                DV = DC + (8 * numberOfChildren);
            }
            else {
                DV = DC + (2 * (numberOfChildren - Enfants_pre2004));
            }
        }

        // Si ce système donne une durée validée supérieure à DTP, alors la durée validée est égal au max de la durée requise (DTP) et de la durée cotisée
        if (DV >= parameters.DTP) {
            DV = Math.max(parameters.DTP, DC);
        }

        // Ensuite on donne pour chaque âge une réponse pour les 4 variables de sorties, dans les deux législations
        let Possible, Tauxplein, Decote, Surcote = 0;
        let Possible_Mac, Tauxplein_Mac, Decote_Mac, Surcote_Mac = 0;
        // Autorisé à partir si l'âge de liquidation est supérieur à l'AOD ou si carrière longue et âge supérieur à l'âge carrière longue avec un cas spé pour carrière démarrée avant 16 ans

        const computeForLegislation = (DC, DV, CL, isCurrentLegislation = false) => {
            let [Possible, Tauxplein, Decote, Surcote] = Array(4).fill(0);;

            const suffix = isCurrentLegislation ? 'now' : 'mac';

            // Décote
            if (AgeLiquid < parameters[`AOD_${suffix}`]) {
                Possible = 0;
            }
            else {
                Possible = 1;
            }
            if (CL === 1 && AgeLiquid >= parameters[`AgeCL_${suffix}`]) {
                Possible = 1;
            }
            if (CL === 1 && careerStartAge < 16 && AgeLiquid > parameters[`AgeCL_${suffix}`] - 1) {
                Possible = 1;
            }
            // Décote
            if (Possible) {
                Decote = Math.min(parameters.DTP - DV, (parameters.ATP - AgeLiquid) * 4, 12);
                if (Decote < 0) Decote = 0;
            }

            // Surcote
            if (Possible) {
                Surcote = Math.min(DC - parameters.DTP, (AgeLiquid - parameters[`AOD_${suffix}`]) * 4);
                if (Surcote < 0) Surcote = 0;
            }

            // Taux plein
            if (Possible) {
                if (Decote === 0 ) {
                    Tauxplein = 1;
                }
            }

            return { Possible, Tauxplein, Decote, Surcote };

        }

        // Calcul des résultats pour les 2 législations
        const results_now = computeForLegislation(DC, DV, CL, true);
        const results_Mac = computeForLegislation(DC, DV, CL, false);

        const returnObj = {};

        for (let variableKey in results_now) {
            returnObj[`${variableKey}`] = results_now[variableKey];
        }
        for (let variableKey in results_Mac) {
            returnObj[`${variableKey}_Mac`] = results_Mac[variableKey];
        }

        return returnObj;
    }

    possibleRetirementAges.forEach((age) => {
        let result = returnResultsForRetirementAge(age);
        result = { ...result, ...userInputs, ...parameters, AgeLiq: age };

        situationArray.push(result);
    })

    return situationArray;
}