export class User {
    public name: string;
    public surname: string;
    public alias: string;
    public correo: string;
    public uid: string;
    
    constructor(name: string, surname: string, alias: string, correo: string, uid: string){
        this.name = name;
        this.surname = surname;
        this.alias = alias;
        this.correo = correo;
        this.uid = uid;
    }
}


