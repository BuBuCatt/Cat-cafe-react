import "../styles/BasicForm.css";
import "../styles/Alert.css"
import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Container, Row, Col, Image, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import DataService from '../services/DataService';
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

export default function CatsForm(props){

    const [catName,setCatName] = useState("");
    const [cataAge,setCataAge] = useState("");
    const [catBreed,setCatBreed] = useState("");
    const [catDescription,setCatDescription] = useState("");
    const [adoptionStatus,setAdoptionStatus] = useState("Available");
    const [catImage,setCatImage] = useState("");
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
        // gets cat data base on their id
        DataService.searchData('searchCat', pageId).then(
          (response)=>{
            setCatName(response.data.catName);
            setCataAge(response.data.cataAge);
            setCatBreed(response.data.catBreed);
            setCatDescription(response.data.catDescription);
            setAdoptionStatus(response.data.setAdoptionStatus);
          },
          (rej)=>{
            console.log(rej);
            setMsg(rej.response.data||'Unable to retrieve cat data. Try again later');
            setAlertType('danger');
            setTimeout(()=> navigate('/adminCats'),4000)
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
      setCatName('');
      setCataAge('');
      setCatBreed('');
      setCatDescription('');
      setAdoptionStatus('');
      setCatImage('');
    }

    const submitHandler = (e)=>{
      e.preventDefault();
      //create request body 
      const formData = new FormData(e.target);
      formData.append("sid", loginUser.sessionID);
      
      if(!pageId){
        // send request to add new cat to database
        DataService.addData('addCat',formData).then(
          (response)=>{
            setMsg(response.data);// Set cats state with loaded data in cats -> cats
            setAlertType('primary');
            emptyForm();
          },
          (rej)=>{
            console.log(rej);// Log errors if file reading fails
            setMsg(rej.response.data || "An error occurred while trying to add new cat on database.");
            setAlertType('danger');
          }
        )
      }
      else {
        formData.append("cid", pageId);
        // send request to edit cat on the database
        DataService.editData('editCat',formData).then(
          (response)=>{
            setMsg(response.data);
            setAlertType('primary');
          },
          (rej)=>{
            let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
            setMsg(msg || "An error occurred while trying to edit cat on database.");
            setAlertType('danger');
          }
        )
      }
    }


  return (
    <Container className="d-flex justify-content-center align-items-center main-container" >
      {
        pageId ? (
          <Link to='/adminCats'>Go back</Link>
        ) : null
      }
      {
        msg ? (
          <Alert className='alert-msg top' variant={alertType}>{msg}</Alert>
        ) : null
      }

      <Form onSubmit={submitHandler}>

        <Row className="mb-4">
          <Col className="d-flex justify-content-center">
            <Image src="../../data/img/meow-match-caf-favicon-black.png" alt="Meow Match Café Logo" roundedCircle />
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
            required={pageId ? false : true}
          />
        </Form.Group>
    
        <div  className="d-flex justify-content-center">
          <Button variant="dark" type="submit" className="w-50">
            { pageId ?  'Edit Cat': 'Add New Cat'}     
          </Button>
        </div>
 
      </Form>
      <Footer/>
    </Container>
  );

}