import http from "../http-common";

class CartService{
    getCart(uid, sid){
        console.log("getting user " +uid+" cart items");
        return http.get(
            `http://localhost/webdev5/PHP_project/paths.php/cart?uid=${uid}&sid=${sid}`,
            {
                headers: {
                    "Content-Type": 'application/json',
                }
            }
        );
    }

    addItem(data){
        console.log("adding new item to user cart");
        return http.post(
            `http://localhost/webdev5/PHP_project/paths.php/addCartItem`,
            data
        );
    }
    
    changeQuantity(data){
        console.log("update item quantity");
        return http.post(
            `http://localhost/webdev5/PHP_project/paths.php/changeCartItemQuantity`,
            data
        );
    }

    resetCart(uid,sid){
        console.log("deleting all cart items from user "+uid);
        return http.delete(
            `http://localhost/webdev5/PHP_project/paths.php/resetCart?uid=${uid}&sid=${sid}`
        );
    }

    removeCartItem(uid, sid, cid){
        console.log("removing item from cart database");
        return http.delete(
            `http://localhost/webdev5/PHP_project/paths.php/removeCartItem?cid=${cid}&uid=${uid}&sid=${sid}`
        );
    }   
}

export default new CartService();