import React from "react";

import backgroundImg from '../assect/images/building.png'

export default function FooterTopImage(){
    return(
        <section className="bg-building-pic d-table w-100" style={{backgroundImage:`url(${backgroundImg})`}}></section>
    )
}