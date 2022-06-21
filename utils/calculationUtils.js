import legalParameters from './legalParametersByYearOfBirth.json';

function computeSituation({ birthDate, careerStartAge, gender, numberOfChildren }) {
    // MANQUE CES ARGUMENTS
    // Public
    // Interrupt
    // Enfants_pre2004

    // Au dessus d'une année de naissance 1969, toutes les valeurs sont similaires
    const referenceBirthDate = birthDate >= 1970 ? 1969 : birthDate;

    // On ne garde que les paramètres liés à l'année de naissance
    const parameters = legalParameters[referenceBirthDate];

    //On crée un tableau avec tous les âges de liquidations possibles de 58 à 67
    const possibleRetirementAges = {};

    for (let age = 60; age < 68; age++) {
        possibleRetirementAges[age] = {

        }
    }


    // On assigne les valeurs rentrées aux variables

    // VARIABLES INTERMÉDIAIRES DE CALCUL
    // * DC: durée de cotisation
    // * DV: durée d'assurance validée  qui peut être supérieure à DC en cas de majoration
    // * CL: Dummy carrière longue


    // La durée cotisée est égal à l'âge de liquidation moins l'âge de début de carrière moins les années d'interruption (sans aucune validation)
    // ATTENTION on multiplie par 4 ici pour exprimer les durées en trimestres (alors que les âges sont en années)

    // *Le départ pour carrière longue est autorisé si l'age de début de carrière est de 19 ans et si la durée de cotisation est supérieure à la durée pour taux plein


    // CALCUL DE LA MAJORATION DE DURÉE D'ASSURANCE POUR ENFANT
    // Privé et Public
    // Dans le privé on donne 8 trimestres de validation suplémentaire par enfants, mais il ne compte que si la durée validée est inférieure ou égale à DTP. Dans le public c'est deux trimestres par enfants nés après 2004


    // Si ce système donne une durée validée supérieure à DTP, alors la durée validée est égal au max de la durée requise (DTP) et de la durée cotisée

    // Ensuite on donne pour chaque âge une réponse pour les 4 variables de sorties, dans les deux législations

    // Autorisé à partir si l'âge de liquidation est supérieur à l'AOD ou si carrière longue et âge supérieur à l'âge carrière longue avec un cas spé pour carrière démarrée avant 16 ans

    // Décote

    // Surcote

    // Taux plein
}