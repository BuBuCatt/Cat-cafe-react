import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Container, Row, Col, Image, Alert } from 'react-bootstrap';
import "../styles/BasicForm.css";
import "../styles/Alert.css"
import { Link, useNavigate } from 'react-router-dom';
import DataService from '../services/DataService';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

export default function ProductForm(props){
  
  const [menuName,setMenuName] = useState("");
  const [menuDescription,setMenuDescription] = useState("");
  const [menuPrice,setMenuPrice] = useState("");
  const [menuCategory,setMenuCategory] = useState("");
  const [menuImage,setMenuImage] = useState("");
  const { loginUser, checkUserType } = useContext(AuthContext);

  const [msg,setMsg] = useState(null);
  const [alertType,setAlertType] = useState("");

  let pageURL = new URL(window.location);
  let pageId = pageURL.searchParams.get('id');

  
  useEffect(()=>{
    if(loginUser == null || checkUserType(loginUser) !== "admin"){
      navigate("/");
    }

    if(pageId){
      // gets product data base on their id
      DataService.searchData('searchProduct', pageId).then(
        (response)=>{
          setMenuName(response.data.menuName);
          setMenuDescription(response.data.menuDescription);
          setMenuPrice(response.data.menuPrice);
          setMenuCategory(response.data.menuCategory);
        },
        (rej)=>{
          console.log(rej);
          let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
          setMsg(msg || 'Unable to retrieve product data. Try again later');
          setAlertType('danger');
          setTimeout(()=> navigate('/adminMenu'),4000)
        }
      )
    }

    if(msg){
      setTimeout(()=> setMsg(null),5000)
    }
    
  },[msg,loginUser])

  const navigate = useNavigate(); 

  const changeHandler = (e,setFunction)=>{
    setFunction(e.target.value)
  }

  const emptyForm = ()=>{
    setMenuName('');
    setMenuDescription('');
    setMenuPrice('');
    setMenuCategory('');
    setMenuImage('');
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("sid", loginUser.sessionID);
    
    if(!pageId){
      DataService.addData('addProduct',formData).then(
        (response)=>{
          setMsg(response.data);
          setAlertType('primary');
          emptyForm();
        },
        (rej)=>{
          let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
          setMsg(msg || "An error occurred while trying to add new product on database");
          setAlertType('danger');
        }
      )
    }
    else {
      formData.append("mid", pageId);
      DataService.editData('editProduct',formData).then(
        (response)=>{
          setMsg(response.data);
          setAlertType('primary');
        },
        (rej)=>{
          let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
          setMsg(msg || "An error occurred while trying to edit product on database.");
          setAlertType('danger');
        }
      )
      // console.log("product with id:"+e.target.id+" edit successfully");
      // navigate('/home');
    }


  }


  return (
    <Container className="d-flex justify-content-center align-items-center main-container" >
      {
        pageId ? (
          <Link to='/adminMenu'>Go back</Link>
        ) : null
      }
      {
        msg ? (
          <Alert className='alert-msg' variant={alertType}>{msg}</Alert>
        ) : null
      }

      <Form onSubmit={submitHandler}>

        <Row className="mb-4">
          <Col className="d-flex justify-content-center">
            <Image src="../../data/img/meow-match-caf-favicon-black.png" alt="Meow Match Café Logo" roundedCircle />
          </Col>
        </Row>

        {/* menuName */}
        <Form.Group controlId="formBasicMenuName" className="mb-3">
          <Form.Control
            type="text"
            name="menuName"
            value={menuName}
            onChange={ e => changeHandler(e,setMenuName)}
            placeholder="Product Name"
            required
          />
        </Form.Group>

        {/* menuCategory */}
        <Form.Group controlId="formBasicMenuCategory" className="mb-3">
          <Form.Select
            name="menuCategory"
            value={menuCategory}
            onChange={e => changeHandler(e,setMenuCategory)}
            placeholder="Category"
            required
          >
            <option value=''>-- Category --</option>
            <option value='Coffee'>Coffee</option>
            <option value='Espresso'>Espresso</option>
            <option value='Frappé'>Frappé</option>
            <option value='Chocolate'>Chocolate</option>
            <option value='Tea'>Tea</option>
            <option value='Pastry'>Pastry</option>
            <option value='Cold Brews'>Cold Brews</option>
            <option value='Vegan'>Vegan</option>
          </Form.Select>
        </Form.Group>

        {/* menuPrice */}
        <Form.Group controlId="formBasicMenuPrice" className="mb-3">
          <Form.Control
            type="number"
            name="menuPrice"
            value={menuPrice}
            onChange={e => changeHandler(e,setMenuPrice)}
            placeholder="Price"
            required
          />
        </Form.Group>

        {/* menuDescription */}
        <Form.Group controlId="formBasicMenuDescription" className="mb-3">
          <Form.Control
            as='textarea'
            name="menuDescription"
            value={menuDescription}
            onChange={e => changeHandler(e,setMenuDescription)}
            placeholder="Description"
            required
          />
        </Form.Group>

        {/* menuImage */}
        <Form.Group controlId="formBasMenuImage" className="mb-3">
          <Form.Control
            type="file"
            name="menuImage"
            value={menuImage}
            onChange={e => changeHandler(e,setMenuImage)}
            placeholder="Product Image"
            required={pageId ? false : true}
          />
        </Form.Group>
    
        <div  className="d-flex justify-content-center">
          <Button variant="dark" type="submit" className="w-50">
            { pageId ?  'Edit Product' : 'Add New Product'}     
          </Button>
        </div>    
 
      </Form>

      <Footer/>
    </Container>
  );

}