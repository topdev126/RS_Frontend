import React from "react";
import { Link } from "react-router-dom";
import { clientData } from "../data/data";
import TinySlider from "tiny-slider-react";
import '../../node_modules/tiny-slider/dist/tiny-slider.css';

export default function ClientTwo(){
    const settings = {
        container: '.tiny-single-item',
        items: 1,
        controls: false,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        speed: 400,
        gutter: 0,
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

        <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 mt-4">
                <i className="mdi mdi-format-quote-open display-1 position-absolute start-0 top-0" style={{opacity:"0.05"}}></i>
                <i className="mdi mdi-format-quote-open display-1 position-absolute end-0 bottom-0" style={{opacity:"0.05"}}></i>
                <div className="tiny-single-item">
                    <TinySlider settings={settings}>
                        {clientData.map((item, index) => {
                            return(
                                <div className="tiny-slider client-testi" key={index}>
                                    <div className="text-center">
                                        <div className="m-2">
                                            <img src={item.image} className="avatar avatar-small rounded-circle shadow-md" alt=""/>
                                            <div className="flex-1 mt-4">
                                                <h6 className="mb-0">{item.name}</h6>
                                                <small className="text-muted">{item.title}</small>
                                            </div>
                                            
                                            <p className="text-muted fst-italic mb-0 mt-3">{item.desc}</p>
                                            
                                            <ul className="list-unstyled mb-0 mt-3 text-warning fs-6">
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