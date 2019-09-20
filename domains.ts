class Collegue{

    constructor(public matricule:string,public nom:string,public prenoms:string,public email:string,public dateDeNaissance:string,public photoUrl:string){

    }

   

    toString():string{
        return `${this.matricule} / ${this.nom} / ${this.prenoms} / ${this.email} / ${this.dateDeNaissance}`
    }
    

}

export {Collegue}