import { FC, useEffect, useState } from "react";
import BubbleSort from "../algorithms/BubbleSort";
import Bar from "./Bar";

interface BarI {
    height: number;
    width: number;
    beingCompared: boolean;
}

const MainView = () => {

    const [algorithm, setAlgorithm] = useState<"bubblesort" | "quicksort" | null>(null);


    return (
        <main>
            <button onClick={(e) => setAlgorithm("bubblesort")}>Empezar</button>
            {algorithm === "bubblesort" && <BubbleSort />}

        </main>

    )
}

export default MainView;