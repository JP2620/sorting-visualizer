import { FC, useEffect, useRef, useState } from "react";
import BubbleSort from "../algorithms/BubbleSort";
import { BarI } from "../algorithms/BubbleSort";
import Bar from "./Bar";


const MainView : FC =  () => {

    const [algorithm, setAlgorithm] = useState<string | null>(null);
    const [sorting, setSorting] = useState<boolean>(false);
    const [bars, setBars] = useState<BarI[]>([]);

    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAlgorithm(event.target.value);
    }
    const algoInput: React.LegacyRef<HTMLSelectElement> | null = useRef(null);


    const bars_ej: BarI[] = [];
    let bucket = [];
    for (let i = 0; i < 100; i++) {
        bucket.push(i)
    }
    for (let i = 0; i < 7; i++) {
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
            return newBars.map((bar: BarI) => {
                return { ...bar, beingCompared: false, sorted: false };
            })
        });
        setSorting(false);
    }

    const handleClickShuffle = () => {
        shuffleBars();
    }

    useEffect(() => {
        setBars(bars_ej);
    }, [])

    useEffect(() => {
        if (algorithm === null) {
            setAlgorithm(algoInput!.current!.value);
        }
    }, [algorithm])


    return (
        <main>
            <header>
                <h1>Sorting Visualizer</h1>
            </header>

            <form onSubmit={(e) => { e.preventDefault() }}
                className="d-flex flex-row p-4 justify-content-around">
                <div className="d-flex flex-column">
                    <label className="mb-3">Choose an algorithm:</label>
                    <select  disabled={sorting} ref={algoInput} name="algorithm" id="cars" onChange={handleAlgorithmChange}>
                        <option value="bubblesort">Bubblesort</option>
                        <option value="quicksort">Quicksort</option>
                    </select>
                </div>

                <div className="d-flex flex-column">
                    <button onClick={(e) => {
                        setAlgorithm(null);
                        setSorting(true);
                    }} className="mb-3" disabled={sorting}>Start</button>
                    <button onClick={(e) => shuffleBars()} disabled={sorting}>Shuffle</button>

                </div>
            </form>

            {sorting && algorithm === "bubblesort" && <BubbleSort bars={bars} setBars={setBars} setSorting={setSorting}/>}
            
            <div className="algo-container">
                {bars.map((bar, index) => {
                    return (
                        <div key={index} className="bar-container">
                            <Bar
                                {...bar}
                            />
                        </div>

                    );
                })}
            </div>

        </main>
    )
}

export default MainView;