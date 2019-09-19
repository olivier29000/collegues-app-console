// récupération du module `readline`
const readline = require('readline');


// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const serviceRequire = require('./service.js');
const service=new serviceRequire.Service();

function authentif() {
    rl.question('Pour vous connecter, indiquez votre nom d\'utilisateur\n', nomUtilisateur =>
        rl.question('Pour vous connecter, indiquez votre mot de passe\n', motDePasse =>
            service.authentification(nomUtilisateur, motDePasse)
                .then(authentification => start())
                .catch(err => console.log(err))
        )
    )
}

function start() {
    rl.question('1. Rechercher un collègue par nom \n2. Créer un collègue\n3. Modifier l\'email\n4. Modifier la photo\n99. Sortir\n', saisie => {
        if (saisie == 1) {
            rl.question('Quel nom voulez vous rechercher?\n', nomCollegue => {
                console.log(`Recherche en cours du nom ${nomCollegue}`);
                service.rechercheCollegueParNomNew(nomCollegue)
                    .then(tabCollegues => {
                        if (tabCollegues.length == 0) {
                            console.log(`le nom "${nomCollegue}" n\'existe pas`)
                            start();
                        } else {
                            tabCollegues.forEach(col => console.log(col));
                            start();
                        }
                    })
                    .catch(err => console.log(err)
                    )
            });
        }
        if (saisie == 2) {
            rl.question('Indiquez le nom du collegue que vous voulez ajouter\n', nomCollegue => {
                rl.question('Indiquez le prenom du collegue que vous voulez ajouter\n', prenomCollegue => {
                    rl.question('Indiquez la date de naissance du collegue que vous voulez ajouter\n', dateDeNaissanceCollegue => {
                        rl.question('Indiquez l\'url de la photo du collegue que vous voulez ajouter\n', urlPhotoCollegue => {
                            service.insertionCollegueNew(nomCollegue, prenomCollegue, dateDeNaissanceCollegue, urlPhotoCollegue)
                                .then(listeDesMatricules => {
                                    console.log(listeDesMatricules)
                                    start();
                                }, error =>
                                        // cas reject
                                        console.log(error)
                                )
                        });
                    });
                });
            });
        }
        if (saisie == 3) {
            rl.question('Indiquez le nom du collegue à qui vous voulez modifier l\'email\n', nomCollegue => {
                rl.question('Quel nouvel email voulez vous indiquer pour ce collegue\n', email => {
                    console.log(`Recherche en cours du nom ${nomCollegue}`);
                    service.rechercheCollegueParNomNew(nomCollegue)
                        .then(tabCollegues => {
                            if (tabCollegues.length == 0) {
                                console.log(`le nom "${nomCollegue}" n\'existe pas`)
                            } else if (tabCollegues.length == 1) {
                                service.modifierEmailCollegueNew(tabCollegues[0].matricule, email)
                                    .then(collegue => console.log(collegue));
                                start();
                            } else {
                                tabCollegues.forEach(col => console.log(col));
                                rl.question(`Il existe ${tabCollegues.length} collègues avec ce nom\nIndiquez le matricule du collegue à qui vous voulez modifier l\'email\n`, matricule => {
                                    service.modifierEmailCollegueNew(matricule, email)
                                        .then(collegue => console.log(collegue));
                                    start();
                                });
                            }
                        })
                });
            });
        }
        if (saisie == 4) {
            rl.question('Indiquez le nom du collegue à qui vous voulez modifier la photo\n', nomCollegue => {
                rl.question('Quel nouvel photo voulez vous indiquer pour ce collegue\n', photo => {
                    console.log(`Recherche en cours du nom ${nomCollegue}`);
                    service.rechercheCollegueParNomNew(nomCollegue)
                        .then(tabCollegues => {
                            if (tabCollegues.length == 0) {
                                console.log('ce nom n\'existe pas')
                            } else if (tabCollegues.length == 1) {
                                service.modifierPhotoCollegueNew(tabCollegues[0].matricule, photo)
                                    .then(collegue => console.log(collegue));
                                start();
                            }else {
                                tabCollegues.forEach(col => console.log(col));
                                rl.question(`Il existe ${tabCollegues.length} collègues avec ce nom\nIndiquez le matricule du collegue à qui vous voulez modifier la photo\n`, matricule => {
                                    service.modifierPhotoCollegueNew(matricule, photo)
                                        .then(collegue => console.log(collegue));
                                    start();
                                });
                            }
                        })

                });
            });
        }
        if (saisie == 99) {
            console.log(`Vous avez saisi : ${saisie}`);
            console.log('Aurevoir ');
            rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
        }
    });
}


module.exports.start = start;
module.exports.authentif = authentif;



