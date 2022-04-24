import { FC, useState } from "react";

interface BarPropsI {
    height: number;
    width: number;
}
const Bar = (props: BarPropsI) => {
    const [beingCompared, setBeingCompared] = useState(false);
    const styles = {
        height: `${props.height}px`,
    }
    return (
        <div className={`bar ${beingCompared? "being-compared" : ""}`}
        style={styles}>
            Bar
        </div>
    );
}

export default Bar;
