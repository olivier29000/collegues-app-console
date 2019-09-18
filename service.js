



// création d'une requête avec activation de suivi de Cookies.
var request = require('request').defaults({ jar: true });

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

module.exports.modifierPhotoCollegue = modifierPhotoCollegue;
module.exports.modifierEmailCollegue = modifierEmailCollegue;
module.exports.rechercheCollegueParNom = rechercheCollegueParNom;
module.exports.insertionCollegue = insertionCollegue;
module.exports.rechercheCollegue = rechercheCollegue;
module.exports.authentification = authentification;