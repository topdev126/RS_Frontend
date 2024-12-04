import React from "react";
import { Link } from "react-router-dom";
import { blogData } from "../data/data";


export default function Blog(){
    return(
        <>
        <div className="row justify-content-center">
            <div className="col">
                <div className="section-title text-center mb-4 pb-2">
                    <h4 className="title mb-3">Blogs or News</h4>
                    <p className="text-muted para-desc mb-0 mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>
            </div>
        </div>

        <div className="row g-4 mt-0">
            {blogData.slice(0,3).map((item, index) =>{
                return(
                    <div className="col-lg-4 col-md-6" key={index}>
                        <div className="card blog blog-primary shadow rounded-3 overflow-hidden border-0">
                            <div className="card-img blog-image position-relative overflow-hidden rounded-0">
                                <div className="position-relative overflow-hidden">
                                    <img src={item.image} className="img-fluid" alt="Townter"/>
                                    <div className="card-overlay"></div>
                                </div>

                                <div className="blog-tag p-3">
                                    <Link to="" className="badge bg-primary">{item.tag}</Link>
                                </div>
                            </div>

                            <div className="card-body content p-0">
                                <div className="p-4">
                                    <Link to={`/blog-detail/${item.id}`} className="title fw-medium fs-5 text-dark">{item.title}</Link>
                                    <p className="text-muted mt-2">{item.desc}</p>

                                    <Link to="" className="text-dark read-more">Read More <i className="mdi mdi-chevron-right align-middle"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}