import React from 'react'

export default function Menu({ menu }) {


    // handle onclick function for order now button in menu 
// const orderHandler = (pr) => {
//     let prObj = 

 
// }

  return (
    <>
    <div className="container mt-5">
      <div className="row">
        {menu.map((item) => (
          <div key={item.mid} className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <img src={item.menuImage} className="card-img-top" alt={item.menuName} />
              <div className="card-body">
                <h5 className="card-title">{item.menuName}</h5>
                <p className="card-text">{item.menuDescription}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-primary">Order Now</button>
                  <span className="text-muted">${item.menuPrice}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>




    </>
  )
}
