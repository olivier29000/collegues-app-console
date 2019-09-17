// récupération du module `readline`
var readline = require('readline');


// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var service = require('./service.js');

function start() {

    service.authentification(function (callBackAuth) {


        console.log(callBackAuth)


        // récupération de la saisie utilisateur
        rl.question('1. Rechercher un collègue par nom \n99. Sortir\n', function (saisie) {


            if (saisie == 1) {
                rl.question('Quel nom voulez vous rechercher?', function (nomCollegue) {
                    console.log(`Vous avez saisi : ${saisie}`);
                    console.log(`Recherche en cours du nom ${nomCollegue}`);

                    service.rechercheCollegue(function (callBackRechercheCollegue) {
                        callBackRechercheCollegue.forEach(collegue => {
                            if (collegue.nom == nomCollegue) {
                                console.log(collegue)
                            }
                        });
                    }
                        

                    );
                start();
            });


    }
            if (saisie == 99) {
        console.log(`Vous avez saisi : ${saisie}`);
        console.log('Aurevoir ');
        rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
    }





});
    });
}


module.exports.start = start;


