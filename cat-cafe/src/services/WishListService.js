import http from "../http-common";

class WishListService{
    getWishList(uid){
        console.log("getting wishlist cats items");
        return http.get(
            `http://localhost/webdev5/PHP_project/paths.php/whishlist?uid=${uid}`,
            {
                headers: {
                    "Content-Type": 'application/json',
                }
            }
        );
    }

    addItem(data){
        console.log("adding new cats to wishlist");
        return http.post(
            `http://localhost/webdev5/PHP_project/paths.php/addCartItem`,
            data
        );
    }
    


    removeCartItem(uid, sid, cid){
        console.log("removing item from cart database");
        return http.delete(
            `http://localhost/webdev5/PHP_project/paths.php/removeCartItem?cid=${cid}&uid=${uid}&sid=${sid}`
        );
    }   
}

export default new WishListService();