import React from "react";
import { Link } from "react-router-dom";

import property1 from "../assect/images/icons/house.png"
import property2 from "../assect/images/icons/bungalow.png"
import property3 from "../assect/images/icons/buildings.png"
import property4 from "../assect/images/icons/commercial.png"
import property5 from "../assect/images/icons/industries.png"

export default function PropertyType(){

    const data = [
        {
            image: property1,
            name: 'Houses',
            title: '46 Listings'
        },
        {
            image: property2,
            name: 'Villas',
            title: '124 Listings'
        },
        {
            image: property3,
            name: 'Apartments',
            title: '265 Listings'
        },
        {
            image: property4,
            name: 'Commercial',
            title: '452 Listings'
        },
        {
            image: property5,
            name: 'Industries',
            title: '12 Listings'
        },
    ]
    return(
        <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4 mt-0">
            {data.map((item,index) => {
                return(
                <div className="col" key={index}>
                    <div className="categories position-relative overflow-hidden rounded-3 p-4 text-center">
                        <img src={item.image} className="avatar avatar-small" alt="Townter"/>

                        <div className="mt-4">
                            <Link to="" className="title text-dark fs-5 fw-medium">{item.name}</Link>
                            <p className="text-muted small mb-0">{item.title}</p>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    )
}