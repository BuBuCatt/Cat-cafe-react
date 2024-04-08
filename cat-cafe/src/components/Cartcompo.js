import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cartcompo({ carts,removeItem, resetCart }){

    console.log("Here is cart compo: " + carts);
    console.log("Here is cart compo: " + JSON.stringify(carts, null, 2));

    console.log("carts: ", carts);
console.log("carts.cart: ", carts?.cart);
    carts.cart && carts.cart.forEach(item => {
        console.log("item: ", item);
        console.log("item.menuName: ", item.menuName);
        console.log("item.menuPrice: ", item.menuPrice);
    });

    const navigate = useNavigate();
    useEffect(()=>{
        // if(props.commonVal==null){
        //     navigate("/login");
        // }
    },[]);
    const saveHandler = ()=>{
        carts.toSave();
        alert("Cart saved!!!!!!:D");
    }

    const goHomeHandler = () => {
        navigate("/"); // Navigate to the home page
    }

    const totalCost = carts.cart.reduce((total, item) => total + (item.price * item.amount), 0);


    return(
        <>
    <div className="container mt-4">
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mb-0">Your Cart</h2>
                    <div>
                        <button type="button" className="btn btn-primary me-2" onClick={saveHandler}>
                            Save Cart
                        </button>
                       
                       
                                    
                        <button type="button" className="btn btn-secondary" onClick={goHomeHandler}>
                            Back to Home
                        </button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.cart && carts.cart.length > 0 ? (
                            carts.cart.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.mid}</td>
                                    <td>{item.pname}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.amount}</td>
                                    <td>${(item.price * item.amount).toFixed(2)}</td>

                                    <td>
                                        <button className="btn btn-sm btn-danger" onClick={() => removeItem(item.mid)}>Remove</button>
                                    </td>
                                </tr>

                                
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No items in cart</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                
                <div className="d-grid gap-2 w-50">
                        <p>Total: ${totalCost.toFixed(2)}</p>
                        <button className="btn btn-primary" type="button" onClick={resetCart}>Reset Cart</button>
                </div>
            </div>
        </div>
    </div>
</>

    )
  
 
}