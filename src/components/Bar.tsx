import { FC, useEffect, useState } from "react";

interface BarPropsI {
    height: number;
    width: number;
    beingCompared: boolean;
}
const Bar = (props: BarPropsI) => {
    return (
        <div className={`bar ${props.beingCompared? "being-compared" : ""}`}
        style={{height:`${props.height}%`}}>
        </div>
    );
}

export default Bar;
