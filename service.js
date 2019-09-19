



// création d'une requête avec activation de suivi de Cookies.
var request = require('request-promise-native').defaults({ jar: true });



class Service {

    constructor(){
        this.url='http://localhost:8081';
    }

    authentification(nomUtilisateur, motDePasse) {
        return request(`${this.url}/auth`,
            {
                method: 'POST',
                json: true,
                body: {
                    nomUtilisateur: nomUtilisateur,
                    motDePasse: motDePasse
                }
            }
        );
    }

    insertionCollegueNew(nomCollegue, prenomCollegue, dateDeNaissanceCollegue, urlPhotoCollegue) {
        return request(`${this.url}/collegues`,
            {
                method: 'POST',
                json: true,
                body: {
                    nom: nomCollegue,
                    prenoms: prenomCollegue,
                    dateDeNaissance: dateDeNaissanceCollegue,
                    photoUrl: urlPhotoCollegue
                }
            },
        );
    }

    rechercheCollegueParNomNew(nom) {
        return request(`${this.url}/collegues?nom_collegue=${nom}`, { json: true }
        )
            .then((listeDesMatricules) => listeDesMatricules.map(Matricule => this.rechercheCollegueParMatriculeNew(Matricule))
            )
            .then((listeDePromesses$) => Promise.all(listeDePromesses$)
            );
    }

    rechercheCollegueParMatriculeNew(matricule) {

        return request(`${this.url}/collegues/${matricule}`, { json: true });
    }

    modifierEmailCollegueNew(matricule, nouvelEmail) {
        return request(`${this.url}/collegues/${matricule}`,
            {
                method: 'POST',
                json: true,
                body: {
                    email: nouvelEmail,
                }
            }
        );
    }

    modifierPhotoCollegueNew(matricule, urlPhoto) {
        return request(`${this.url}/collegues/${matricule}`,
            {
                method: 'POST',
                json: true,
                body: {
                    photoUrl: urlPhoto,
                }
            }
        );
    }
}

module.exports.Service = Service;
