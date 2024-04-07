import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Cartcompo(props){
    const navigate = useNavigate();
    useEffect(()=>{
        // if(props.commonVal==null){
        //     navigate("/login");
        // }
    },[]);
    const saveHandler = ()=>{
        props.shoppingCart.toSave();
        alert("Cart saved!!!!!!:D");
    }

    const goHomeHandler = () => {
        navigate("/"); // Navigate to the home page
    }

    return(
        <div
            className="row justify-content-start align-items-center g-2 mt-2">
            <div className="col"><button
            type="button"
            className="btn btn-outline-primary" onClick={saveHandler}>
            Save
        </button>
        <button type="button" className="btn btn-outline-primary" onClick={goHomeHandler}>
                    Back to Home
        </button>
        {/* <Tablecompo header={["Product ID","Product Name","Price","Amount","Total"]} contents={props.shoppingCart.cart} /> */}
        </div>
        </div>
        )
}