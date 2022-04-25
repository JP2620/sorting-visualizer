import { FC, useEffect, useState } from "react";

interface BarPropsI {
    height: number;
    width: number;
    beingCompared: boolean;
    sorted: boolean;
}
const Bar = (props: BarPropsI) => {
    let classes = "bar";
    if (props.beingCompared) {
        classes += " being-compared";
    } else if (props.sorted) {
        classes += " bar-sorted";
    }

    return (
        <div className={`${classes}`}
        style={{height:`${props.height}%`}}>
        </div>
    );
}

export default Bar;
