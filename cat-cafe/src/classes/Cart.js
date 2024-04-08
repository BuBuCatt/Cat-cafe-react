export default class CartObj{
    #uid;
    #cart = new Map();
    constructor(uid){
        this.#uid = uid;
       
    }


    addProduct(productObj){
        console.log("Adding product:", productObj);
        let prObj = this.findProduct(productObj.mid);
        console.log("Found product:", prObj);
        
        if(prObj==-1)//if not this product in cart set the product
            this.#cart.set(productObj.mid,productObj);
        else{
            let newAmount = prObj.amount +1  ;
          
            console.log("New amount before modify:",newAmount);
            this.#cart.set(prObj.mid,this.modifyProduct(prObj,newAmount));
            console.log("Product after modify:", this.#cart.get(productObj.mid));
        }
        console.log("Cart after adding:", Array.from(this.#cart.values()));
     }


     modifyProduct(productObj,newAmount){
        productObj.amount = newAmount;
        return productObj;
    }
    findProduct(mid){
        if(this.#cart.has(mid))
            return this.#cart.get(mid);
        else
            return -1;
    }
    removeProduct(mid){
       
            // this.#cart.delete(mid);
            return this.#cart.has(mid) ? this.#cart.get(mid) : -1;
        
    }

    removeEachProduct(mid){

        let prObj = this.findProduct(mid);
        if (prObj !== -1) {
            this.#cart.delete(mid);
        }

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


    increaseQuantity(mid) {
        const product = this.#cart.get(mid);
        if (product) {
            product.amount += 1;
            this.#cart.set(mid, this.modifyProduct(product, product.amount));
        }
    }
    
    decreaseQuantity(mid) {
        const product = this.#cart.get(mid);
        if (product && product.amount > 1) {
            product.amount -= 1;
            this.#cart.set(mid, this.modifyProduct(product, product.amount));
        } else {
            this.removeProduct(mid); // Optionally remove the item if its count goes to zero
        }
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
    get mid(){
        return this.#mid;
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