import React from 'react'

export default function Cats({cats}) {
  return (
    <>
        <div className="container mt-5">
        <div className="row">
            {cats.map((cat) => (
            <div key={cat.cid} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                <img src={cat.catImage} className="card-img-top" alt={cat.catName} />
                <div className="card-body">
                    <h5 className="card-title">{cat.catName}</h5>
                    <p className="card-text">
                    <strong>Breed:</strong> {cat.catBreed}<br />
                    <strong>Age:</strong> {cat.cataAge}<br />
                    <strong>Description:</strong> {cat.catDescription}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge ${cat.adoptionStatus === 'Available' ? 'bg-success' : 'bg-secondary'}`}>{cat.adoptionStatus}</span>
                    <a href="#" className="btn btn-primary">Adopt</a>
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
