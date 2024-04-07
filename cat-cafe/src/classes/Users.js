class User{
    constructor(id,username,email){
        this.id = id;
        this.username = username;
        this.email = email;
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

export class Staff extends User{
    constructor(id,fname,lname,email,type){
        super(id,fname,lname,email);
        this.type = type;
    }
    displayInfo(){
        return this;
    }
}

export default User;