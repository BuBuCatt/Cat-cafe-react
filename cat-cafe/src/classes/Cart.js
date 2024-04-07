export default class CartObj{
    #uid;
    #cart = new Map();
    constructor(uid){
        this.#uid = uid;
    }
    addProduct(productObj){
        let prObj = this.#findProduct(productObj.mid);
        if(prObj==-1)
            this.#cart.set(productObj.mid,productObj);
        else{
            let newAmount = prObj.amount;
            this.#cart.set(prObj.mid,this.modifyProduct(prObj,++newAmount));
        }
    }
    modifyProduct(productObj,newAmount){
        productObj.amount = newAmount;
        return productObj;
    }
    #findProduct(mid){
        if(this.#cart.has(mid))
            return this.#cart.get(mid);
        else
            return -1;
    }
    removeProduct(mid){
        this.#cart.delete(mid);
    }
    get cart(){
        let output = [];
        for(let prObj of this.#cart.values()){

            output.push({mid:prObj.mid,pname:prObj.menuName,price:prObj.menuPrice,amount:prObj.amount,total:prObj.total()});
        }
        return output;
    }
    invoiceTotal(){
        let sum = 0;
        for(let prObj of this.#cart.values()){
            sum += prObj.total();
        }
        return Number(sum.toFixed(2));
    }
    toSave(){
        let output = [];
        for(let prObj of this.#cart.values()){
            output.push({mid:prObj.mid,amount:prObj.amount});
        }
        localStorage.setItem(this.#uid,JSON.stringify(output));
    }
}


// Cafe products class

export class ProductObj{
    #mid;
    #menuName; // not equal to pname
    #menuPrice;
    #amount;
    constructor(mid,menuName,menuPrice,amount=1){
        this.#mid = mid;
        this.#menuName = menuName;
        this.#menuPrice = Number(menuPrice);
        this.#amount = Number(amount);
    }
    get amount(){
        return this.#amount;
    }
    set amount(newAmount){
        if(newAmount==0) throw new Error("Amount can not be zero");
        this.#amount = newAmount;
    }
    get pid(){
        return this.#mid;
    }
    get pname(){
        return this.#menuName;
    }
    get price(){
        return this.#menuPrice;
    }
    total(){
        return Number((this.#menuPrice * this.#amount).toFixed(2));
    }
}