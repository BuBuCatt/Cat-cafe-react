import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Image, Alert } from 'react-bootstrap';
import "../styles/BasicForm.css";
import { useNavigate } from 'react-router-dom';
import DataService from '../services/DataService';

export default function CatsForm(props){

    const [catName,setCatName] = useState("");
    const [cataAge,setCataAge] = useState("");
    const [catBreed,setCatBreed] = useState("");
    const [catDescription,setCatDescription] = useState("");
    const [adoptionStatus,setAdoptionStatus] = useState("Available");
    const [catImage,setCatImage] = useState("");
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
      setCatName('');
      setCataAge('');
      setCatBreed('');
      setCatDescription('');
      setAdoptionStatus('');
      setCatImage('');
    }

    const submitHandler = (e)=>{
      e.preventDefault();
      const formData = new FormData(e.target);
      if(props.useFlag === 'add'){
        DataService.addData('addCat',formData).then(
          (response)=>{
            setMsg(response.data);// Set cats state with loaded data in cats -> cats
            setAlertType('primary');
            emptyForm();
          },
          (rej)=>{
            console.log(rej);// Log errors if file reading fails
            setMsg(rej.response.data || "An error occurred while getting the cats from database.");
            setAlertType('danger');
          }
        )
      }
      else {
        DataService.editData('editCat',formData)
        // console.log(" cat with id:"+e.target.id+" edit successfully");
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

        {/* catName */}
        <Form.Group controlId="formBasicCatName" className="mb-3">
          <Form.Control
            type="text"
            name="catName"
            value={catName}
            onChange={ e => changeHandler(e,setCatName)}
            placeholder="Cat Name"
            required
          />
        </Form.Group>

        {/* cataAge */}
        <Form.Group controlId="formBasicCatAge" className="mb-3">
          <Form.Control
            type="text"
            name="cataAge"
            value={cataAge}
            onChange={e => changeHandler(e,setCataAge)}
            placeholder="Cat Age"
            required
          />
        </Form.Group>

        {/* catBreed */}
        <Form.Group controlId="formBasicCatBreed" className="mb-3">
          <Form.Control
            type="text"
            name="catBreed"
            value={catBreed}
            onChange={e => changeHandler(e,setCatBreed)}
            placeholder="Cat Breed"
            required
          />
        </Form.Group>

        {/* adoptionStatus */}
        <Form.Group controlId="formBasicAdoptionStatus" className="mb-3">
          <Form.Select
            name="adoptionStatus"
            value={adoptionStatus}
            onChange={e => changeHandler(e,setAdoptionStatus)}
            placeholder="Adoption Status"
            required
          >
            <option value='Available'>Available</option>
            <option value="Adopted">Adopted</option>
          </Form.Select>
        </Form.Group>

        {/* catDescription */}
        <Form.Group controlId="formBasicCatDescription" className="mb-3">
          <Form.Control
            as="textarea"
            name="catDescription"
            value={catDescription}
            onChange={e => changeHandler(e,setCatDescription)}
            placeholder="Cat Description"
            required
          />
        </Form.Group>

        {/* catImage */}
        <Form.Group controlId="formBasCatImage" className="mb-3">
          <Form.Control
            type="file"
            name="catImage"
            value={catImage}
            onChange={e => changeHandler(e,setCatImage)}
            placeholder="Cat Image"
            required
          />
        </Form.Group>
    
        <div  className="d-flex justify-content-center">
          <Button variant="dark" type="submit" className="w-50">
            { props.useFlag && props.useFlag === 'edit' ?  'Edit Cat': 'Add New Cat'}     
          </Button>
        </div>
 
      </Form>
    </Container>
  );

}