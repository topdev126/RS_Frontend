import React from "react";
import { Link } from "react-router-dom";

import bg3 from "../assect/images/bg/03.jpg"

import Navbar from "../components/navbar";
import GetInTuch from "../components/getInTuch";
import AboutUs from "../components/about";

import {FiHexagon} from "../assect/icons/vander"
import Footer from "../components/footer";

export default function Pricing(){
    const pricingData = [
        {
            icon:'mdi mdi-tree-outline',
            title:'Basic',
            time:'19',
            features: ['Full Access','Enhanced Security','Source Files','1 Domain Free'],
            btnClass:'btn btn-outline-primary w-100'
        },
        {
            icon:'mdi mdi-shield-star-outline',
            title:'Premium',
            time:'39',
            features: ['Full Access','Enhanced Security','Source Files','1 Domain Free'],
            btnClass:'btn btn-soft-primary w-100'
        },
        {
            icon:'mdi mdi-rocket-launch-outline',
            title:'Business',
            time:'59',
            features: ['Full Access','Enhanced Security','Source Files','1 Domain Free'],
            btnClass:'btn btn-primary w-100'
        },
    ]
    return(
        <>
        <Navbar navClass="defaultscroll sticky" logolight={true} menuClass = "navigation-menu nav-left nav-light"/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:`url(${bg3})`}}>
            <div className="bg-overlay bg-gradient-overlay-2"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Pricing Plans</h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="position-relative">
            <div className="shape overflow-hidden text-white">
                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
        <section className="section pt-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 mt-sm-0 pt-sm-0">
                        <div className="features-absolute">
                            <div className="row g-4">
                                {pricingData.map((item,index)=>{
                                    return(
                                    <div className="col-lg-4 col-md-6" key={index}>
                                        <div className="card rounded-3 shadow">
                                            <div className="p-4 border-bottom text-center">
                                                <div className="position-relative features text-center mx-lg-4 px-md-1">
                                                    <div className="feature-icon position-relative overflow-hidden d-flex justify-content-center">
                                                        <FiHexagon className="hexagon"/>
                                                        <div className="position-absolute top-50 start-50 translate-middle">
                                                            <i className={`${item.icon} fs-2 text-primary`}></i>
                                                        </div>
                                                    </div>
                                                </div>

                                                <h5 className="text-primary">{item.title}</h5>

                                                <div className="d-flex justify-content-center">
                                                    <span className="fs-5">$</span>
                                                    <span className="h2 fw-semibold mb-0">{item.time}</span>
                                                    <span className="fs-6 align-self-end">/Month</span>
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <h6>Pricing Features:</h6>
                                                <ul className="list-unstyled">
                                                    {item.features.map((el,index) =>{
                                                        return(
                                                            <li className="text-muted mb-0" key={index}><span className="icon fs-5 me-2"><i className="mdi mdi-check-circle align-middle text-success"></i></span>{el}</li>
                                                        )
                                                    })}
                                                </ul>

                                                <Link to="" className={item.btnClass}>Started Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <AboutUs/>
            </div>

            <div className="container mt-100 mt-60">
                <GetInTuch/>
            </div>
        </section>
        <Footer/>
        </>
    )
}