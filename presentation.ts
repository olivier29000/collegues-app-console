import {Collegue} from './domains'
import { Menu, ItemMenu } from './menu';
import { startMenu } from './interfaceUtlisateur';


// récupération du module `readline`
const readline = require('readline');

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const serviceRequire = require('./service.ts');
const service=new serviceRequire.Service();

function authentif() {
    rl.question('Pour vous connecter, indiquez votre nom d\'utilisateur\n', (nomUtilisateur:any) =>
        rl.question('Pour vous connecter, indiquez votre mot de passe\n', (motDePasse:any) =>
            service.authentification(nomUtilisateur, motDePasse)
                .then((authentification:any) => startMenu())
                .catch((err:any) => {
                    console.log(`Le nom d'utilisateur et/ou le mot de passe sont incorrects. Code http de la réponse: ${err.statusCode}` )
                    authentif()})
        )
    )
}



function start() {

    
    

    rl.question('1. Rechercher un collègue par nom \n2. Créer un collègue\n3. Modifier l\'email\n4. Modifier la photo\n99. Sortir\n', (saisie:string) => {
        if (saisie == '1') {
            rl.question('Quel nom voulez vous rechercher?\n', (nomCollegue:string) => {
                console.log(`Recherche en cours du nom ${nomCollegue}`);
        
                const p: Promise<Collegue[]> = service.rechercheCollegueParNomNew(nomCollegue);
                service.rechercheCollegueParNomNew(nomCollegue)
                    .then((tabCollegues:Collegue[]) => {
                        if (tabCollegues.length == 0) {
                            console.log(`le nom "${nomCollegue}" n\'existe pas`)
                            start();
                        } else {
                            tabCollegues.forEach((col:Collegue) => console.log(col.toString()));
                            start();
                        }
                    })
                    .catch((err:any) => console.log(err)
                    )
            });
        }
        if (saisie == '2') {
            rl.question('Indiquez le nom du collegue que vous voulez ajouter\n', (nomCollegue:string) => {
                rl.question('Indiquez le prenom du collegue que vous voulez ajouter\n', (prenomCollegue:string) => {
                    rl.question('Indiquez la date de naissance du collegue que vous voulez ajouter\n', (dateDeNaissanceCollegue:string) => {
                        rl.question('Indiquez l\'url de la photo du collegue que vous voulez ajouter\n', (urlPhotoCollegue:string) => {
                            service.insertionCollegueNew(new Collegue('',nomCollegue, prenomCollegue,'email', dateDeNaissanceCollegue, urlPhotoCollegue))
                                .then((listeDesMatricules:string[]) => {
                                    console.log(listeDesMatricules)
                                    start();
                                }, (error:any) =>
                                        // cas reject
                                        console.log(error)
                                )
                        });
                    });
                });
            });
        }
        if (saisie == '3') {
            rl.question('Indiquez le nom du collegue à qui vous voulez modifier l\'email\n', (nomCollegue:any) => {
                rl.question('Quel nouvel email voulez vous indiquer pour ce collegue\n', (email:any) => {
                    console.log(`Recherche en cours du nom ${nomCollegue}`);
                    service.rechercheCollegueParNomNew(nomCollegue)
                        .then((tabCollegues:Collegue[]) => {
                            if (tabCollegues.length == 0) {
                                console.log(`le nom "${nomCollegue}" n\'existe pas`)
                            } else if (tabCollegues.length == 1) {
                                service.modifierEmailCollegueNew(tabCollegues[0].matricule, email)
                                    .then((collegue:any) => console.log(collegue));
                                start();
                            } else {
                                tabCollegues.forEach((col:Collegue) => console.log(col.toString()));
                                rl.question(`Il existe ${tabCollegues.length} collègues avec ce nom\nIndiquez le matricule du collegue à qui vous voulez modifier l\'email\n`, (matricule:any) => {
                                    service.modifierEmailCollegueNew(matricule, email)
                                        .then((collegue:Collegue) => console.log(collegue.toString()));
                                    start();
                                });
                            }
                        })
                });
            });
        }
        if (saisie == '4') {
            rl.question('Indiquez le nom du collegue à qui vous voulez modifier la photo\n', (nomCollegue:any) => {
                rl.question('Quel nouvel photo voulez vous indiquer pour ce collegue\n', (photo:any) => {
                    console.log(`Recherche en cours du nom ${nomCollegue}`);
                    service.rechercheCollegueParNomNew(nomCollegue)
                        .then((tabCollegues:any) => {
                            if (tabCollegues.length == 0) {
                                console.log('ce nom n\'existe pas')
                            } else if (tabCollegues.length == 1) {
                                service.modifierPhotoCollegueNew(tabCollegues[0].matricule, photo)
                                    .then((collegue:any) => console.log(collegue));
                                start();
                            }else {
                                tabCollegues.forEach((col:any) => console.log(col));
                                rl.question(`Il existe ${tabCollegues.length} collègues avec ce nom\nIndiquez le matricule du collegue à qui vous voulez modifier la photo\n`, (matricule:any) => {
                                    service.modifierPhotoCollegueNew(matricule, photo)
                                        .then((collegue:Collegue) => console.log(collegue.toString()));
                                    start();
                                });
                            }
                        })

                });
            });
        }
        if (saisie == '99') {
            console.log(`Vous avez saisi : ${saisie}`);
            console.log('Aurevoir ');
            rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
        }
    });
}

export {authentif};
export {start};
//module.exports.start = start;
//module.exports.authentif = authentif;



