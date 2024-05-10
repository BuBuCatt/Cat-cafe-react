export default class CartObj{
    #uid;
    #cart = new Map();
    constructor(uid){
        this.#uid = uid;
       
    }


    addProduct(productObj){
        console.log("Adding product mid:", productObj.mid);
        let prObj = this.findProduct(productObj.mid);
        console.log("Found product:", prObj);
        
        if(prObj==-1)//if not this product in cart set the product
            this.#cart.set(productObj.mid,productObj);
        else{
            let newAmount = prObj.amount +1  ;
          
            console.log("New amount before modify:",newAmount);
            this.#cart.set('Mid'+prObj.mid,this.modifyProduct(prObj,newAmount));
            console.log("Product after modify:", this.#cart.get(productObj.mid));
        }
        console.log("Cart after adding:", Array.from(this.#cart.values()));
        this.toSave();
     }


    addSponsorProduct(productObj){ // need a unique id 
        console.log("Adding addSponsorProduct sid:", productObj.sid);
        let prObj = this.findSponsor(productObj.sid);
        console.log("Found product:", prObj);
        
        if(prObj==-1)//if not this product in cart set the product
            this.#cart.set('Sid'+productObj.sid,productObj);
        
        console.log("Cart after adding:", Array.from(this.#cart.values()));
        this.toSaveSponsor();
     }
     


     modifyProduct(productObj,newAmount){
    //     productObj.amount = newAmount;
    //     return productObj;
    }

    findProduct(mid){
        if(this.#cart.has('Mid'+mid))
            return this.#cart.get('Mid'+mid);
        else
            return -1;
    }

    findSponsor(sid){
        if(this.#cart.has('Sid'+sid))
            return this.#cart.get('Sid'+sid);
        else
            return -1;
    }

    removeProduct(){
        this.#cart.forEach(item=>
            this.#cart.delete(item.id)
        )
    }

    cleanCart () {
        // return this.#cart.clear();
    }

    removeEachProduct(id){

        // let prObj = this.findProduct(id);
        // if (prObj !== -1) {
        //     this.#cart.delete(id);
        // }

    }

  
    get cart(){
        let output = [];
        for(let prObj of this.#cart.values()){

            output.push({id:prObj.id,sid:prObj.sid,mid:prObj.mid,pname:prObj.menuName,price:prObj.menuPrice,amount:prObj.amount,total:prObj.total()});
        }
        return output;
    }

    
    invoiceTotal(){
        // let sum = 0;
        // for(let prObj of this.#cart.values()){
        //     sum += prObj.total();
        // }
        // return Number(sum.toFixed(2));
    }
    toSave(){
        // let output = [];
        // for(let prObj of this.#cart.values()){
        //     output.push({mid:prObj.mid,amount:prObj.amount});
        // }
        // localStorage.setItem(this.#uid,JSON.stringify(output));
    }
    
    toSaveSponsor(){ // for sponsor save method
        let output = [];
        for(let prObj of this.#cart.values()){
            output.push({mid: prObj.sid, amount: prObj.selectedAmount});
        }
        localStorage.setItem(this.#uid,JSON.stringify(output));
    }

    increaseQuantity(mid) {
        // const product = this.#cart.get(mid);
        // if (product) {
        //     product.amount += 1;
        //     this.#cart.set(mid, this.modifyProduct(product, product.amount));
        // }
    }
    
    decreaseQuantity(mid) {
        // const product = this.#cart.get(mid);
        // if (product && product.amount > 1) {
        //     product.amount -= 1;
        //     this.#cart.set(mid, this.modifyProduct(product, product.amount));
        // } else {
        //     this.removeProduct(mid); // Optionally remove the item if its count goes to zero
        // }
    }
    
}


// Cafe products class

export class ProductObj{
    #id;
    #mid;
    #sid;
    #menuName; // not equal to pname
    #menuPrice;
    #amount;

    
    constructor(id,mid,sid,menuName,menuPrice,amount=1){
        this.#id = id;
        this.#mid = mid;
        this.#sid = sid;
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
    get mid(){
        return this.#mid;
    }
    get sid(){
        return this.#sid;
    }
    get id(){
        return this.#id;
    }
    get menuName() {
        return this.#menuName;
    }
    get menuPrice() {
        return this.#menuPrice;
    }
  
    total(){
        return Number((this.#menuPrice * this.#amount).toFixed(2));
    }
}