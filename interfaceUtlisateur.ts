import { Collegue } from './domains'
import { Menu, ItemMenu } from './menu';

// récupération du module `readline`
const readline = require('readline');

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const serviceRequire = require('./service.ts');
const service = new serviceRequire.Service();

const m1 = new ItemMenu('Rechercher un collègue par nom', choix1);
const m2 = new ItemMenu('Créer un collègue', choix2);
const m3 = new ItemMenu('Modifier l\'email', choix3);
const m4 = new ItemMenu('Modifier la photo', choix4);
const m5 = new ItemMenu('Quitter', choix5);

const menu = new Menu([m1, m2, m3, m4, m5]);



export const startMenu = () => {

    // affichage du menu
    let index = 1;
    for (let menuItem of menu.listItemMenu) {
        console.log(index + '--' + menuItem.toString());
        index++;
    }

    rl.question('choix : ', (choix: number) => {
        const itemChoisi = menu.listItemMenu[choix - 1];
        itemChoisi.fonction();
    });
}

function choix1() {
    rl.question('Quel nom voulez vous rechercher?\n', (nomCollegue: string) => {
        console.log(`Recherche en cours du nom ${nomCollegue}`);

        const p: Promise<Collegue[]> = service.rechercheCollegueParNomNew(nomCollegue);
        service.rechercheCollegueParNomNew(nomCollegue)
            .then((tabCollegues: Collegue[]) => {
                if (tabCollegues.length == 0) {
                    console.log(`le nom "${nomCollegue}" n\'existe pas`)
                    startMenu();
                } else {
                    tabCollegues.forEach((col: Collegue) => console.log(col.toString()));
                    startMenu();
                }
            })
            .catch((err: any) => console.log(err)
            )
    });
}

function choix2() {
    rl.question('Indiquez le nom du collegue que vous voulez ajouter\n', (nomCollegue: string) => {
        rl.question('Indiquez le prenom du collegue que vous voulez ajouter\n', (prenomCollegue: string) => {
            rl.question('Indiquez la date de naissance du collegue que vous voulez ajouter\n', (dateDeNaissanceCollegue: string) => {
                rl.question('Indiquez l\'url de la photo du collegue que vous voulez ajouter\n', (urlPhotoCollegue: string) => {
                    service.insertionCollegueNew(new Collegue('', nomCollegue, prenomCollegue, 'email', dateDeNaissanceCollegue, urlPhotoCollegue))
                        .then((listeDesMatricules: string[]) => {
                            console.log(listeDesMatricules)
                            startMenu();
                        }, (error: any) =>
                                // cas reject
                                console.log(error)
                        )
                });
            });
        });
    });
}

function choix3() {
    rl.question('Indiquez le nom du collegue à qui vous voulez modifier l\'email\n', (nomCollegue: any) => {
        rl.question('Quel nouvel email voulez vous indiquer pour ce collegue\n', (email: any) => {
            console.log(`Recherche en cours du nom ${nomCollegue}`);
            service.rechercheCollegueParNomNew(nomCollegue)
                .then((tabCollegues: Collegue[]) => {
                    if (tabCollegues.length == 0) {
                        console.log(`le nom "${nomCollegue}" n\'existe pas`)
                    } else if (tabCollegues.length == 1) {
                        service.modifierEmailCollegueNew(tabCollegues[0].matricule, email)
                            .then((collegue: any) => console.log(collegue));
                        startMenu();
                    } else {
                        tabCollegues.forEach((col: Collegue) => console.log(col.toString()));
                        rl.question(`Il existe ${tabCollegues.length} collègues avec ce nom\nIndiquez le matricule du collegue à qui vous voulez modifier l\'email\n`, (matricule: any) => {
                            service.modifierEmailCollegueNew(matricule, email)
                                .then((collegue: Collegue) => console.log(collegue.toString()));
                            startMenu();
                        });
                    }
                })
        });
    });
}

function choix4() {
    rl.question('Indiquez le nom du collegue à qui vous voulez modifier la photo\n', (nomCollegue: any) => {
        rl.question('Quel nouvel photo voulez vous indiquer pour ce collegue\n', (photo: any) => {
            console.log(`Recherche en cours du nom ${nomCollegue}`);
            service.rechercheCollegueParNomNew(nomCollegue)
                .then((tabCollegues: any) => {
                    if (tabCollegues.length == 0) {
                        console.log('ce nom n\'existe pas')
                    } else if (tabCollegues.length == 1) {
                        service.modifierPhotoCollegueNew(tabCollegues[0].matricule, photo)
                            .then((collegue: any) => console.log(collegue));
                        startMenu();
                    } else {
                        tabCollegues.forEach((col: any) => console.log(col));
                        rl.question(`Il existe ${tabCollegues.length} collègues avec ce nom\nIndiquez le matricule du collegue à qui vous voulez modifier la photo\n`, (matricule: any) => {
                            service.modifierPhotoCollegueNew(matricule, photo)
                                .then((collegue: Collegue) => console.log(collegue.toString()));
                            startMenu();
                        });
                    }
                })

        });
    });
}
function choix5() {
    
    console.log('Aurevoir ');
    rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
}
