import React from "react";

import { clientData } from "../data/data";

import TinySlider from "tiny-slider-react";
import '../../node_modules/tiny-slider/dist/tiny-slider.css';

export default function ClientOne(){
    const settings = {
        container: '.tiny-three-item',
        controls: false,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        speed: 400,
        gutter: 12,
        responsive: {
            992: {
                items: 3
            },

            767: {
                items: 2
            },

            320: {
                items: 1
            },
        },
      };
    return(
        <>
        <div className="row justify-content-center">
            <div className="col">
                <div className="section-title text-center mb-4 pb-2">
                    <h4 className="title mb-3">What Our Client Say ?</h4>
                    <p className="text-muted para-desc mb-0 mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-12 mt-4">
                <div className="tiny-three-item">
                    <TinySlider settings={settings}>
                        {clientData.map((item,index)=>{
                            return(
                                <div className="tiny-slider client-testi" key={index}>
                                    <div className="card border-0 bg-white">
                                        <div className="card-body p-4 rounded-3 shadow m-2">
                                            <i className="mdi mdi-format-quote-open display-1 text-primary opacity-25 position-absolute end-0 top-0"></i>

                                            <div className="d-flex">
                                                <img src={item.image} className="avatar avatar-md-sm rounded-circle shadow-md" alt=""/>
                                                <div className="flex-1 ms-3">
                                                    <h6 className="mb-0">{item.name}</h6>
                                                    <small className="text-muted">{item.title}</small>
                                                </div>
                                            </div>
                                            
                                            <p className="text-muted fst-italic mb-0 mt-4">{item.desc}</p>
                                            
                                            <ul className="list-unstyled mb-0 mt-3 text-warning h5">
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                            </ul>
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </TinySlider>
                </div>
            </div>
        </div>
        </>
    )
}