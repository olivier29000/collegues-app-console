



// création d'une requête avec activation de suivi de Cookies.
var request = require('request').defaults({ jar: true });



function getListeDesCollegues() {

    // la méthode retourne un objet promesse
    return new Promise(function (resolve, reject) {

            request('http://rechercherid?email='+email, {}, function(err, id) {
                // callback(id); plus d'utilisation de callback

                // gestion des erreurs
                if(err) {
                    reject(err); // en cas d'erreur
                } else {
                    resolve(id); // en cas de succès
                }
            });

        });
}


function authentification(callBackAuth) {
    request('http://localhost:8081/auth',
        {
            method: 'POST',
            json: true,
            body: {
                nomUtilisateur: 'u1',
                motDePasse: 'pass1'
            }
        },
        function (err, res, body) {
            // traiter résultat de la requête 
            if (res.statusCode == 200) {

                callBackAuth(res.statusCode);
            }

        }
    );

}

function rechercheCollegue(callBackRechercheCollegue) {

    request('http://localhost:8081/collegues', { json: true }, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }

        // body contient les données récupérées
        //console.log('Ok', body);
        callBackRechercheCollegue(body)


    });


}


function insertionCollegue(nomCollegue,prenomCollegue,dateDeNaissanceCollegue,urlPhotoCollegue,callBackInsertionCollegue) {
    request('http://localhost:8081/collegues',
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
        function (err, res, body) {
            // traiter résultat de la requête 
            if (res.statusCode == 200) {

                callBackInsertionCollegue(res.statusCode);
            }

        }
    );

}

function rechercheCollegueParNom(nom,callBackRechercheCollegueParNom) {

    request('http://localhost:8081/collegues?nom=' + nom, { json: true }, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }

        // body contient les données récupérées
        //console.log('Ok', body);
        callBackRechercheCollegueParNom(body)


    });


}

function rechercheCollegueParNomNew(nom,callBackRechercheCollegueParNomNew) {

    request('http://localhost:8081/collegues?nom_collegue=' + nom, { json: true }, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }

        // body contient les données récupérées
        //console.log('Ok', body);
        callBackRechercheCollegueParNomNew(body)


    });


}

function rechercheCollegueParMatriculeNew(matricule,callBackRechercheCollegueParMatriculeNew) {

    request('http://localhost:8081/collegues/' + matricule, { json: true }, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }

        // body contient les données récupérées
        //console.log('Ok', body);
        callBackRechercheCollegueParMatriculeNew(body)


    });


}


function modifierEmailCollegue(matricule, nouvelEmail, callBackModifierEmailCollegue) {
    request('http://localhost:8081/collegues/'+matricule,
        {
            method: 'POST',
            json: true,
            body: {
                email: nouvelEmail,
                
            }
        },
        function (err, res, body) {
            // traiter résultat de la requête 
            if (res.statusCode == 200) {

                callBackModifierEmailCollegue(res.statusCode);
            }

        }
    );

}

function modifierPhotoCollegue(matricule, urlPhoto, callBackModifierPhotoCollegue) {
    request('http://localhost:8081/collegues/'+matricule,
        {
            method: 'POST',
            json: true,
            body: {
                photoUrl: urlPhoto,
                
            }
        },
        function (err, res, body) {
            // traiter résultat de la requête 
            if (res.statusCode == 200) {

                callBackModifierPhotoCollegue(res.statusCode);
            }

        }
    );

}


module.exports.rechercheCollegueParMatriculeNew = rechercheCollegueParMatriculeNew;
module.exports.rechercheCollegueParNomNew = rechercheCollegueParNomNew;
module.exports.modifierPhotoCollegue = modifierPhotoCollegue;
module.exports.modifierEmailCollegue = modifierEmailCollegue;
module.exports.rechercheCollegueParNom = rechercheCollegueParNom;
module.exports.insertionCollegue = insertionCollegue;
module.exports.rechercheCollegue = rechercheCollegue;
module.exports.authentification = authentification;