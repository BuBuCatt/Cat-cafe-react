import http from "../http-common";

class CartService{
    getCart(uid, sid){
        console.log("getting user cart items");
        return http.get(
            `http://localhost/webdev5/PHP_project/paths.php/cart?uid=${uid}&sid=${sid}`,
            {
                headers: {
                    "Content-Type": 'application/json',
                }
            }
        );
    }

    resetCart(uid,sid){
        console.log("deleting all cart items from user "+uid);
        return http.delete(
            `http://localhost/webdev5/PHP_project/paths.php/resetCart?uid=${uid}&sid=${sid}`
        );
    }

    addItem(data){
        console.log("adding new item to user cart");
        return http.post(
            `http://localhost/webdev5/PHP_project/paths.php/addCartItem`,
            data
        );
    }

    removeCartItem(cid, uid, sid){
        console.log("removing item amount from cart database");
        return http.delete(
            `http://localhost/webdev5/PHP_project/paths.php/removeCartItem?cid=${cid}&uid=${uid}&sid=${sid}`
        );
    }
    
}

export default new CartService();