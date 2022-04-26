import { FC, useEffect, useRef, useState } from "react";
import Sort, { SortProps } from "../algorithms/Sort";
import { BarI } from "../algorithms/Sort";
import Bar from "./Bar";


const MainView : FC =  () => {
    const [countComparisons, setCountComparisons] = useState(0);
    const [countSwaps, setCountSwaps] = useState(0);

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

    
    for (let i = 0; i < 13; i++) {
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
        setCountComparisons(0);
        setCountSwaps(0);
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
    }

    const handleClickShuffle = () => {
        setCountComparisons(0);
        setCountSwaps(0);

        shuffleBars();
        setSorting(false);
    }

    useEffect(() => {
        setBars(bars_ej);
    }, [])

    useEffect(() => {
        if (algorithm === null) {
            setAlgorithm(algoInput!.current!.value);
        }
    }, [algorithm])

    const algoProps: SortProps = {
        bars,
        setBars,
        setSorting,
        algorithm,
        setCountComparisons,
        setCountSwaps,
    }

    return (
        <main>
            <form onSubmit={(e) => { e.preventDefault() }}
                className="d-flex flex-row p-4 justify-content-around">
                <div className="d-flex flex-column">
                    <label className="mb-3">Choose an algorithm:</label>
                    <select  disabled={sorting} ref={algoInput} name="algorithm" id="cars" onChange={handleAlgorithmChange}>
                        <option value="bubblesort">Bubble Sort</option>
                        <option value="insertionsort">Insertion Sort</option>
                        <option value="selectionsort">Selection Sort</option>
                        <option value="gnomesort">Gnome Sort</option>
                        <option value="quicksort">Quick Sort</option>
                    </select>
                </div>

                <div className="d-flex flex-column">
                    <button onClick={(e) => {
                        setCountComparisons(0);
                        setCountSwaps(0);
                        setAlgorithm(null);
                        setSorting(true);
                    }} className="mb-3" disabled={sorting}>Start</button>
                    <button onClick={(e) => shuffleBars()} disabled={sorting}>Shuffle</button>

                </div>
            </form>

            {sorting && algorithm && <Sort {...algoProps}/>}
            
            <div>
                <div className="w-100 d-flex flex-row justify-content-around mb-2">
                    <div>Comparisons: {countComparisons}</div>
                    <div>Swaps: {countSwaps}</div>
                </div>
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
            </div>


            <section>
                <article>
                    <h2>Bubble Sort</h2>
                    <p>
                    Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.
                    </p>
                </article>
                <article>
                    <h2>Insertion Sort</h2>
                    <p>Insertion sort iterates, consuming one input element each repetition, and grows a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain.</p>
                </article>
                <article>
                    <h2>Selection Sort</h2>
                    <p>The algorithm divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.</p>
                </article>
                <article>
                    <h2>Gnome Sort</h2>
                    <p>Gnome sort performs at least as many comparisons as insertion sort and has the same asymptotic runtime characteristics. Gnome sort works by building a sorted list one element at a time, getting each item to the proper place in a series of swaps. The average running time is O(n2) but tends towards O(n) if the list is initially almost sorted.</p>
                </article>
            </section>

        </main>
    )
}

export default MainView;