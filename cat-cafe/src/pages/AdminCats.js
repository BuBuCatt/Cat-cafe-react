import React from 'react';
import DataService from '../services/DataService';
import  { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Button, Container,Row, Col, Alert, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PopupWindow from '../components/PopWindow';
import Footer from '../components/Footer';


const AdminCats = (props) => {
    const navigate = useNavigate()
    const [filter, setFilter] = useState('All');
    const [msg,setMsg] = useState(null);
    const [data, setData] = useState(props.cats);
    const [alertType,setAlertType] = useState("");

    const filteredCats = data ? data.filter(cat => {
        return filter === 'All' || cat.catBreed === filter;
    }) : [];

    const reloadData = () => {
        DataService.getData("getCats").then(
            (response)=>{
              setData(response.data);
            },
            (rej)=>{
                let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
                setMsg(msg || "An error occurred while reloading the data.");
                setAlertType('danger');
            }
        )
    }

    const removeItem = (item) => {
        DataService.removeData("removeCat",item.cid, props.loginUser.sessionID).then(
          (response)=>{
              setMsg(response.data);
              setAlertType('primary');

              reloadData()
          },
          (rej)=>{
            let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
            setMsg(msg || "An error occurred while trying to remove cat.");
            setAlertType('danger');
          }
        )
      }

    useEffect(()=>{
        if(props.loginUser == null || props.loginUser.type != "admin"){
          navigate("/");
        }

        reloadData();

      if(msg){
          setTimeout(()=> setMsg(null),5000)
        }
    },[msg,props.loginUser])

  return (
    <>
        {
            msg ? (
            <Alert variant={alertType} className='alert-msg'>{msg}</Alert>
            ) : null
        }
        <div className="container mt-5">

            <div className="filter-controls mb-4  ">
                <label className='breed-filter'>
                    Filter by Breed:
                </label>
                <Dropdown className='w-25'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="brown-bg">
                        {filter}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setFilter('All')}>All</Dropdown.Item>
                        { data ? 
                            Array.from(new Set(data.map(cat => cat.catBreed))).map(breed => (
                                <Dropdown.Item key={breed} onClick={() => setFilter(breed)}>{breed}</Dropdown.Item>
                            ))
                        : null}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        
            <div className="row row-container">
                {filteredCats.map((cat) => (
                <div key={cat.cid} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                    <div className="card h-100">
                    <img src={cat.catImage} className="card-img-top cat-img" alt={cat.catName} />
                    <div className="card-body">
                        <Container className='mt-2 mb-2'>
                            <Row>
                                <Col>
                                    <Link to={"/admin/form/cat?id="+cat.cid}>
                                    <Button   variant="dark" className="me-2">
                                        <FontAwesomeIcon icon={faPencil} />
                                    </Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <PopupWindow message={`Are you sure you want to delete ${cat.catName}?`} onConfirm={()=>{removeItem(cat)}} />
                                </Col>
                            </Row>
                        </Container>
                        <h5 className="card-title cat-name ">{cat.catName}</h5>
                        <p className="card-text cat-details">
                            <strong className='cat-detail-title'>Breed:</strong> {cat.catBreed}<br />
                            <strong className='cat-detail-title'>Age:</strong> {cat.cataAge}<br />
                            <strong className='cat-detail-title'>Description:</strong> {cat.catDescription}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                        <span className={`badge ${cat.adoptionStatus === 'Available' ? 'bg-success' : 'bg-secondary'}`}>{cat.adoptionStatus}</span>
                        </div>
                    </div>
                    </div>
                </div>
                ))}

            </div>
        </div>
       <Footer/>
       
    </>
  )
}

export default AdminCats;
