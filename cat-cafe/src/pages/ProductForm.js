import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Image, Alert } from 'react-bootstrap';
import "../styles/BasicForm.css";
import { useNavigate } from 'react-router-dom';
import DataService from '../services/DataService';

export default function ProductForm(props){

    const [menuName,setMenuName] = useState("");
    const [menuDescription,setMenuDescription] = useState("");
    const [menuPrice,setMenuPrice] = useState("");
    const [menuCategory,setMenuCategory] = useState("");
    const [menuImage,setMenuImage] = useState("");
    const [msg,setMsg] = useState(null);
    const [alertType,setAlertType] = useState("");

    useEffect(()=>{
      if(props.loginUser == null){
        navigate("/");
      }
      if(props.loginUser && props.loginUser.type != "admin"){
          navigate("/");
      }

      if(msg){
          setTimeout(()=> setMsg(null),5000)
        }
    },[msg,props.loginUser])

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
      const formData = new FormData(e.target);

      if(props.useFlag === 'add'){
        DataService.addData('addProduct',formData).then(
          (response)=>{
            setMsg(response.data);
            setAlertType('primary');
            // emptyForm();
          },
          (rej)=>{
            console.log(rej);
            setMsg(rej.response.data || "An error occurred.");
            setAlertType('danger');
          }
        )
      }
      else {
        DataService.editData('editProduct',formData)
        // console.log("product with id:"+e.target.id+" edit successfully");
        // navigate('/home');
      }


    }


  return (
    <Container className="d-flex justify-content-center align-items-center main-container" >
      
      {
        msg ? (
          <Alert variant={alertType}>{msg}</Alert>
        ) : null
      }

      <Form onSubmit={submitHandler}>

        <Row className="mb-4">
          <Col className="d-flex justify-content-center">
            <Image src="../data/img/meow-match-caf-favicon-black.png" alt="Meow Match Café Logo" roundedCircle />
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
            required
          />
        </Form.Group>
    
        <div  className="d-flex justify-content-center">
          <Button variant="dark" type="submit" className="w-50">
            { props.useFlag && props.useFlag === 'edit' ?  'Edit Product': 'Add New Product'}     
          </Button>
        </div>    
 
      </Form>
    </Container>
  );

}