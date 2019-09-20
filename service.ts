



// création d'une requête avec activation de suivi de Cookies.


import r from 'request-promise-native';
import { Collegue } from './domains';

const request=r.defaults({ jar: true });
//var request = require('request-promise-native').defaults({ jar: true });



class Service {

    private url:string;

    constructor(){
        this.url='http://localhost:8081';
    }

    authentification(nomUtilisateur:string, motDePasse:string): Promise<any> {
        return request(`${this.url}/auth`,
            {
                method: 'POST',
                json: true,
                body: {
                    nomUtilisateur: nomUtilisateur,
                    motDePasse: motDePasse
                }
            }
        ).promise();
    }

    insertionCollegueNew(collegue:Collegue):Promise<any> {
        console.log('------------ DEBUG ---- ',this.url, collegue);
        return request(`${this.url}/collegues`,
            {
                method: 'POST',
                json: true,
                body: collegue
            },
        ).promise();
    }

    rechercheCollegueParNomNew(nom:string):Promise<Collegue[]> {
        return request(`${this.url}/collegues?nom_collegue=${nom}`, { json: true }
        )
            .then((listeDesMatricules) => listeDesMatricules.map((Matricule:string) => this.rechercheCollegueParMatriculeNew(Matricule))
            )
            .then((listeDePromesses$) => Promise.all(listeDePromesses$)
            )
            .then((col:any[])=>col.map(c=>new Collegue(c.matricule,c.nom,c.prenoms,c.email,c.dateDeNaissance,c.photoUrl)));
    }

    rechercheCollegueParMatriculeNew(matricule:string):Promise<Collegue>{

        return request(`${this.url}/collegues/${matricule}`, { json: true }).promise();
    }

    modifierEmailCollegueNew(matricule:string, nouvelEmail:string):Promise<Collegue>{
        return request(`${this.url}/collegues/${matricule}`,
            {
                method: 'POST',
                json: true,
                body: {
                    email: nouvelEmail,
                }
            }
        )
        .promise().then((col:any)=>(new Collegue(col.matricule,col.nom,col.prenoms,col.email,col.dateDeNaissance,col.photoUrl)));
    }

    modifierPhotoCollegueNew(matricule:string, urlPhoto:string):Promise<Collegue> {
        return request(`${this.url}/collegues/${matricule}`,
            {
                method: 'POST',
                json: true,
                body: {
                    photoUrl: urlPhoto,
                }
            }
        ).promise().then((col:any)=>(new Collegue(col.matricule,col.nom,col.prenoms,col.email,col.dateDeNaissance,col.photoUrl)));
    }
}

export {Service}
//module.exports.Service = Service;
