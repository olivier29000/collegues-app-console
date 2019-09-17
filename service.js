



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


module.exports.rechercheCollegue = rechercheCollegue;
module.exports.authentification = authentification;