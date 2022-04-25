import { FC, useEffect, useState } from "react";
import BubbleSort from "../algorithms/BubbleSort";
import { BubbleSortProps } from "../algorithms/BubbleSort";
import { BarI } from "../algorithms/BubbleSort";
import Bar from "./Bar";


const MainView = () => {

    const [algorithm, setAlgorithm] = useState<string | null>(null);
    const [bars, setBars] = useState<BarI[]>([]);

    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAlgorithm(event.target.value);
    }


    const bars_ej: BarI[] = [];
    let bucket = [];
    for (let i = 0; i < 100; i++) {
        bucket.push(i)
    }
    for (let i = 0; i < 15; i++) {
        let randomIndex = Math.floor(Math.random() * bucket.length);
        let randomNumber = bucket[randomIndex];
        bucket.splice(randomIndex, 1);
        bars_ej.push({
            height: randomNumber,
            width: 100,
            beingCompared: false,
            sorted: false,
        });
    }

    const shuffleBars = () => {
        setBars((prevBars: BarI[]) => {
            const newBars: BarI[] = Object.assign([], prevBars);
            let currentIndex = newBars.length;
            while (currentIndex !== 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                let temp = newBars[currentIndex];
                newBars[currentIndex] = newBars[randomIndex];
                newBars[randomIndex] = temp;
            }
            return newBars
        });
    }


    useEffect(() => {
        setBars(bars_ej);
    }, [])

    
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
                    <button onClick={(e) => shuffleBars()}>Shuffle</button>
                    
                </div>
            </form>
            {algorithm === "bubblesort" && <BubbleSort bars={bars} setBars={setBars}/>}
        </main>
    )
}

export default MainView;