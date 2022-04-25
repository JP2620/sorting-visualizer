import { FC, useEffect, useState } from "react";
import BubbleSort from "../algorithms/BubbleSort";
import Bar from "./Bar";

interface BarI {
    height: number;
    width: number;
    beingCompared: boolean;
}

const MainView = () => {

    const [algorithm, setAlgorithm] = useState<string | null>(null);

    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAlgorithm(event.target.value);
    }

    
    return (
        <main>
            <header>
                <h1>Sorting Visualizer</h1>
            </header>

            <form onSubmit={(e) => { e.preventDefault() }}
            className="d-flex flex-row p-4">
                <div className="d-flex flex-column">
                    <label>Choose an algorithm:</label>
                    <select name="algorithm" id="cars" onChange={handleAlgorithmChange}>
                        <option value="bubblesort">Bubblesort</option>
                        <option value="quicksort">Quicksort</option>
                    </select>
                </div>

                <div className="d-flex flex-column">
                    <button onClick={(e) => setAlgorithm("bubblesort")}>Empezar</button>
                    <button onClick={(e) => setAlgorithm("bubblesort")}>Shuffle</button>
                </div>
            </form>
            {algorithm === "bubblesort" && <BubbleSort />}
        </main>
    )
}

export default MainView;