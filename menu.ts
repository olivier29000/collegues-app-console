export class Menu{
    
    constructor(public listItemMenu :ItemMenu[]){

    }

    toString():string{
        let retour:string="";
        for(let itemMenu of this.listItemMenu) {
            retour+=itemMenu.toString();
        }
        return retour;
    }
}

export class ItemMenu {
    constructor(public libelle:string,public fonction:Function){

    }

    toString():string{
        return this.libelle+"\n";
    }
}