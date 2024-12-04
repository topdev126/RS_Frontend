import React from "react";
import { Link } from "react-router-dom";

import bg3 from "../assect/images/bg/03.jpg"
import map from "../assect/images/map.png"

import Navbar from "../components/navbar";
import ClientTwo from "../components/clientTwo";

import CountUp from 'react-countup';

import {FiHexagon, FiStar, FiHeart, FiShield,FiDollarSign,FiMapPin,FiPieChart} from '../assect/icons/vander'
import Footer from "../components/footer";

export default function Features(){

    const featureData = [
        {
            icon:FiHeart,
            title:'Comfortable',
            desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
        },
        {
            icon:FiShield,
            title:'Extra Security',
            desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
        },
        {
            icon:FiStar,
            title:'Luxury',
            desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
        },
        {
            icon:FiDollarSign,
            title:'Best Price',
            desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
        },
        {
            icon:FiMapPin,
            title:'Stratagic Location',
            desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
        },
        {
            icon:FiPieChart,
            title:'Efficient',
            desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
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
                            <p className="text-white-50 para-desc mx-auto mb-0">Benefits</p>
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Services / Features</h5>
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

        <section className="section">
            <div className="container">
                <div className="row g-4">
                    {featureData.map((item,index) =>{
                        const Icon = item.icon
                        return(
                            <div className="col-md-4" key={index}>
                                <div className="position-relative features text-center mx-lg-4 px-md-1">
                                    <div className="feature-icon position-relative overflow-hidden d-flex justify-content-center">
                                        <FiHexagon className="hexagon"/>
                                        <div className="position-absolute top-50 start-50 translate-middle">
                                            <Icon className="fea icon-m-md text-primary"/>
                                        </div>
                                    </div>
            
                                    <div className="mt-4">
                                        <Link to="" className="fw-medium title text-dark fs-5">{item.title}</Link>
                                        <p className="text-muted mt-3 mb-0">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="container-fluid bg-building-pic mt-100 mt-60">
                <div className=" opacity-25 position-absolute w-100 h-100 top-0 start-0" style={{backgroundImage:`url(${map})` , backgroundPosition:'center'}}></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="section-title text-center mb-4 pb-2">
                                <h4 className="title mb-3">Trusted by more than 10K users</h4>
                                <p className="text-muted para-desc mb-0 mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4 py-3">
                            <div className="counter-box text-center">
                                <h1 className="mb-0 fw-semibold"><CountUp start={0} end={1548}  className="counter-value"/>+</h1>
                                <h6 className="counter-head text-muted fw-normal">Investment</h6>
                            </div>
                        </div>
    
                        <div className="col-4 py-3">
                            <div className="counter-box text-center">
                                <h1 className="mb-0 fw-semibold"><CountUp start={0} end={25}  className="counter-value"/>+</h1>
                                <h6 className="counter-head text-muted fw-normal">Awards</h6>
                            </div>
                        </div>
    
                        <div className="col-4 py-3">
                            <div className="counter-box text-center">
                                <h1 className="mb-0 fw-semibold"><CountUp start={0} end={9}  className="counter-value"/>+</h1>
                                <h6 className="counter-head text-muted fw-normal">Profitability</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <ClientTwo/>
            </div>
        </section>
        <Footer/>
        </>
    )
}