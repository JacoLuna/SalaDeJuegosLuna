export class Message {
    message: string = "";
    time : string = "";
    uid : string = "";

    
    constructor(message: string,time: string,uid: string){
        this.message = message;
        this.time = time;
        this.uid = uid;
    }
}

