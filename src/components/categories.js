import React from "react";
import { Link } from "react-router-dom";

import category1 from '../assect/images/property/residential.jpg'
import category2 from '../assect/images/property/land.jpg'
import category3 from '../assect/images/property/commercial.jpg'
import category4 from '../assect/images/property/industrial.jpg'
import category5 from '../assect/images/property/investment.jpg'

export default function Categories(){

    const data = [
        {
            image:category1,
            name:'Residential',
            listings:'46 Listings'
        },
        {
            image:category2,
            name:'Land',
            listings:'124 Listings'
        },
        {
            image:category3,
            name:'Commercial',
            listings:'265 Listings'
        },
        {
            image:category4,
            name:'Industrial',
            listings:'452 Listings'
        },
        {
            image:category5,
            name:'Investment',
            listings:'12 Listings'
        },
    ]
    return(
        <>
        <div className="row justify-content-center">
            <div className="col">
                <div className="section-title mb-4 pb-2">
                    <h4 className="title mb-3">Listing Categories</h4>
                    <p className="text-muted para-desc mb-0">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>
            </div>
        </div>

        <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4 mt-0">
            {data.map((item, index) => {
                return(
                    <div className="col" key={index}>
                        <div className="categories position-relative overflow-hidden rounded-3 shadow">
                            <img src={item.image} className="img-fluid" alt=""/>

                            <div className="p-3">
                                <Link to="" className="title text-dark fs-5 fw-medium">{item.name}</Link>
                                <p className="text-muted small mb-0">{item.listings}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}