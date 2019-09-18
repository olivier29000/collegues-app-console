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
        rl.question('1. Rechercher un collègue par nom \n2. Créer un collègue\n3. Modifier l\'email\n4. Modifier la photo\n99. Sortir\n', function (saisie) {
            
            if (saisie == 5) {
                rl.question('Quel nom voulez vous rechercher?', function (nomCollegue) {
                    console.log(`Vous avez saisi : ${saisie}`);
                    console.log(`Recherche en cours du nom ${nomCollegue}`);
                    service.rechercheCollegueParNomNew(nomCollegue, function (callBackRechercheCollegueParNomNew) {
                        if (callBackRechercheCollegueParNomNew.length != 0) {
                            //console.log(callBackRechercheCollegueParNomNew);
                            var matricule=callBackRechercheCollegueParNomNew[0];
                            service.rechercheCollegueParMatriculeNew(matricule, function (callBackRechercheCollegueParMatriculeNew) {
                                    console.log(callBackRechercheCollegueParMatriculeNew)
                                    start();
                            });
                        } else {
                            console.log('ce nom n\'existe pas')
                            start();
                        }
                    });
                });
            }

            if (saisie == 6) {
                rl.question('Indiquez le nom du collegue à qui vous voulez modifier l\'email\n', function (nom) {
                    service.rechercheCollegueParNomNew(nom, function (callBackRechercheCollegueParNomNew) {
                        if (callBackRechercheCollegueParNomNew.length != 0) {
                            //console.log(callBackRechercheCollegueParNomNew);
                            var matricule=callBackRechercheCollegueParNomNew[0];
                            service.rechercheCollegueParMatriculeNew(matricule, function (callBackRechercheCollegueParMatriculeNew) {
                                    //console.log(callBackRechercheCollegueParMatriculeNew)
                                    rl.question('Quel nouvel email voulez vous indiquer pour ce collegue\n', function (email) {
                                        service.modifierEmailCollegue(matricule, email, function (callBackModifierEmailCollegue) {
                                            console.log(callBackModifierEmailCollegue);
                                            start();
                                        });
                                    });
                            });
                        } else {
                            console.log('ce nom n\'existe pas')
                            start();
                        }
                    });
                });
            }

            if (saisie == 7) {
                rl.question('Indiquez le nom du collegue à qui vous voulez modier la photo\n', function (nom) {
                    service.rechercheCollegueParNomNew(nom, function (callBackRechercheCollegueParNomNew) {
                        if (callBackRechercheCollegueParNomNew.length != 0) {
                            //console.log(callBackRechercheCollegueParNomNew);
                            var matricule=callBackRechercheCollegueParNomNew[0];
                            service.rechercheCollegueParMatriculeNew(matricule, function (callBackRechercheCollegueParMatriculeNew) {
                                    //console.log(callBackRechercheCollegueParMatriculeNew)
                                    rl.question('Quel nouvel url de photo voulez vous indiquer pour ce collegue\n', function (urlPhoto) {
                                        service.modifierPhotoCollegue(matricule, urlPhoto, function (callBackModifierPhotoCollegue) {
                                            console.log(callBackModifierPhotoCollegue);
                                            start();
                                        });
                                    });
                            });
                        } else {
                            console.log('ce nom n\'existe pas')
                            start();
                        }
                    });
                });
            }


            if (saisie == 1) {
                rl.question('Quel nom voulez vous rechercher?', function (nomCollegue) {
                    console.log(`Vous avez saisi : ${saisie}`);
                    console.log(`Recherche en cours du nom ${nomCollegue}`);

                    service.rechercheCollegueParNom(nomCollegue, function (callBackRechercheCollegueParNom) {
                        
                        if (callBackRechercheCollegueParNom.length != 0) {
                            console.log(callBackRechercheCollegueParNom);
                            start();
                        } else {
                            console.log('ce nom n\'existe pas')
                            start();
                        }
                        



                    });
                });


            }
            if (saisie == 2) {
                rl.question('Indiquez les informations sur le collegue que vous voulez créer\nQuel est son nom?\n', function (nomCollegue) {

                    rl.question('Quel est son prénom?\n', function (prenomCollegue) {

                        rl.question('Quel est sa date de naissance?\n', function (dateDeNaissanceCollegue) {

                            rl.question('Indiquez une url pour sa photo\n', function (urlPhotoCollegue) {
                                console.log(`nom : ${nomCollegue}`);
                                console.log(`prenom ${prenomCollegue}`);
                                console.log(`date de naissance ${dateDeNaissanceCollegue}`);
                                console.log(`url photo ${urlPhotoCollegue}`);


                                service.insertionCollegue(nomCollegue, prenomCollegue, dateDeNaissanceCollegue, urlPhotoCollegue, function (callBackInsertionCollegue) {
                                    console.log(callBackInsertionCollegue);
                                }


                                );
                                start();
                            });

                        });


                    });


                });




            }

            if (saisie == 3) {
                rl.question('Indiquez le nom du collegue à qui vous voulez modier l\'email\n', function (nom) {

                    service.rechercheCollegueParNom(nom, function (callBackRechercheCollegueParNom) {
                        console.log(callBackRechercheCollegueParNom);
                        if (callBackRechercheCollegueParNom.length != 0) {
                            rl.question('Quel nouvel email voulez vous indiquer pour ce collegue\n', function (email) {



                                var matricule = callBackRechercheCollegueParNom[0].matricule;
                                console.log('ok');
                                console.log(matricule);
                                console.log('ok');
                                service.modifierEmailCollegue(matricule, email, function (callBackModifierEmailCollegue) {
                                    console.log(callBackModifierEmailCollegue);
                                    start();
                                });

                            });

                        } else {
                            console.log('ce nom n\'existe pas')
                            start();
                        }
                        



                    });


                });




            }

            if (saisie == 4) {
                rl.question('Indiquez le nom du collegue à qui vous voulez modier la photo\n', function (nom) {

                    service.rechercheCollegueParNom(nom, function (callBackRechercheCollegueParNom) {
                        console.log(callBackRechercheCollegueParNom);

                        if (callBackRechercheCollegueParNom.length != 0) {
                            rl.question('Quel nouvel url de photo voulez vous indiquer pour ce collegue\n', function (urlPhoto) {





                                var matricule = callBackRechercheCollegueParNom[0].matricule;


                                service.modifierPhotoCollegue(matricule, urlPhoto, function (callBackModifierPhotoCollegue) {
                                    console.log(callBackModifierPhotoCollegue);
                                    start();
                                });


                            });

                        } else {
                            console.log('ce nom n\'existe pas')
                            start();
                        }
                        
                        


                    });


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


