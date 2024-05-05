import React from 'react';
import DataService from '../services/DataService';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button, Container,Row, Col, Alert, Dropdown } from 'react-bootstrap';
import PopupWindow from '../components/PopWindow';
import Footer from '../components/Footer';


const AdminMenu = (props) => {
    const [msg,setMsg] = useState(null);
    const [data, setData] = useState(props.menu);
    const [alertType,setAlertType] = useState("");
    const [filter, setFilter] = useState('All');

    const filteredProducts = data ? data.filter(menu => {
        return filter === 'All' || menu.menuCategory === filter;
    }) : [];

    useEffect(()=>{
        // if(props.loginUser == null){
        //   navigate("/");
        // }
        // if(props.loginUser && props.loginUser.type != "admin"){
        //     navigate("/");
        // }

        reloadData();

      if(msg){
          // setTimeout(()=> setMsg(null),5000)
        }
    },[msg,props.loginUser])

    const removeItem = (item) => {
        DataService.removeData("removeProduct",item.mid).then(
          (response)=>{
              setMsg(response.data);
              setAlertType('primary');

              reloadData()
          },
          (rej)=>{
            let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
            setMsg(msg || "An error occurred while trying to remove product.");
            setAlertType('danger');
          }
        )
    }

      const reloadData = () => {
        DataService.getData("getProducts").then(
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

    return (
       <>
        {
            msg ? (
            <Alert variant={alertType} className='alert-msg'>{msg}</Alert>
            ) : null
        }
        <div className="filter-controls mb-4 p-3">
            <label className='breed-filter'>
                Filter by Category:
            </label>
            <Dropdown className='w-25'>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="brown-bg">
                {filter}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilter('All')}>All</Dropdown.Item>
                { data ? 
                    Array.from(new Set(data.map(menu => menu.menuCategory))).map(category => (
                    <Dropdown.Item key={category} onClick={() => setFilter(category)}>{category}</Dropdown.Item>
                ))
                : null}
                </Dropdown.Menu>
            </Dropdown>
        </div>

        <div className="container mt-5">
            <div className="row">
                {filteredProducts.map((item) => (
                <div key={item.mid} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                    <div className="card h-100">
                    <img src={item.menuImage} className="card-img-top" alt={item.menuName} />
                    <Container className='mt-2'>
                        <Row>
                            <Col>
                                <Link to={"/admin/form/product?id="+item.mid}>
                                <Button   variant="dark" className="me-2">
                                    <FontAwesomeIcon icon={faPencil} />
                                </Button>
                                </Link>
                            </Col>
                            <Col>
                                <PopupWindow message={`Are you sure you want to delete ${item.menuName}?`} onConfirm={()=>{removeItem(item)}} />
                            </Col>
                        </Row>
                    </Container>
                    <div className="card-body">
                        <h5 className="card-title">{item.menuName}</h5>
                        <p className="card-text">{item.menuCategory}</p>
                        <p className="card-text">{item.menuDescription}</p>
                        <span className="text-muted">${item.menuPrice}</span>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <Footer/>
    </>
    );
}

export default AdminMenu;
