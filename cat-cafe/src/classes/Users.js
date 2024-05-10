export  class User{
    constructor(id,username,email,type,sessionID){
        this.id = id;
        this.username = username;
        this.email = email;
        this.type = type;
        this.sessionID = sessionID;
    }
    displayInfo(){
        return this;
    }
}

export class Customer extends User{
    constructor(id,username,email,budget){
        super(id,username,email);
        this.budget = Number(budget);
    }
    displayInfo(){
        return this;
    }
}

export class Admin extends User{
    constructor(id,username,email,type,sessionID){
        super(id,username,email);
        this.type = type;
        this.sessionID = sessionID;
    }
    displayInfo(){
        return this;
    }
}

export default User;