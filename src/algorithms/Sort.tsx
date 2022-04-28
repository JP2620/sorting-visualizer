import { FC, useEffect, useState } from "react";
import { bubbleSort, gnomeSort, insertionSort, quickSort, selectionSort } from "./Algorithms";

export interface SortAction {
    type: "compare" | "swap";
    index1: number;
    index2: number;
}

export interface BarI {
    height: number;
    width: number;
    beingCompared: boolean;
    sorted: boolean;
};

export type SortProps = {
    bars: BarI[];
    setBars: React.Dispatch<React.SetStateAction<BarI[]>>;
    setSorting: React.Dispatch<React.SetStateAction<boolean>>;
    setCountComparisons: React.Dispatch<React.SetStateAction<number>>;
    setCountSwaps: React.Dispatch<React.SetStateAction<number>>;
    algorithm: "bubblesort" | "gnomesort" | "insertionsort" | "quicksort" | "selectionsort";
    sortingSpeed: number;
};

const Sort: FC<SortProps> = (props) => {
    const [finishedSorting, setFinishedSorting] = useState<boolean>(false);
    const comparisonDelay = 100;
    const algorithms : {[name: string]: (bars: BarI[]) => SortAction[]} = {
        "bubblesort": bubbleSort,
        "gnomesort": gnomeSort,
        "insertionsort": insertionSort,
        "quicksort": quickSort,
        "selectionsort": selectionSort,
    };
    


    useEffect(() => {
        let algorithm: (bars: BarI[]) => SortAction[] = algorithms[props.algorithm];
        
        const actions: SortAction[] = algorithm(props.bars.map(a => ({ ...a })));
        for (let counter = 0; counter < actions.length; counter++) {
            const delay: number = counter * comparisonDelay;
            setTimeout(() => {
                props.setBars((prevBars: BarI[]) => {
                    let newBars: BarI[] = Object.assign([], prevBars);
                    if (actions[counter].type === "compare") {
                        props.setCountComparisons((prevCount) => prevCount + 1);
                        newBars = newBars.map((bar: BarI) => {
                            return { ...bar, beingCompared: false };
                        });
                        newBars[actions[counter].index1].beingCompared = true;
                        newBars[actions[counter].index2].beingCompared = true;
                    } else if (actions[counter].type === "swap") {
                        props.setCountSwaps((prevCount) => prevCount + 1);
                        let i1: number = actions[counter].index1;
                        let i2: number = actions[counter].index2;
                        [newBars[i1], newBars[i2]] = [newBars[i2], newBars[i1]]
                    }
                    return newBars;
                })

                if (counter == actions.length - 1) {
                    setFinishedSorting(true);
                    props.setBars((prevBars: BarI[]) => {
                        console.log(prevBars);
                        return prevBars.map((bar: BarI) => {
                            return { ...bar, beingCompared: false }
                        })
                    });
                }
            }, (1 / props.sortingSpeed) *  delay, counter);
        }
    }, []);

    useEffect(() => {
        if (finishedSorting) {
            let counter = 0;
            for (let i = 0; i < props.bars.length; i++) {
                setTimeout(() => {
                    props.setBars((prevBars) => {
                        const bars: any[] = Object.assign([], prevBars);
                        bars[i].sorted = true;
                        return bars;
                    })
                }, counter * 50, counter);
                counter++;
            }
            setTimeout(() => {
                props.setSorting(false)
            }, (counter * 50 + 50) * (1 / props.sortingSpeed), counter);
        }
    }, [finishedSorting])

    return (<></>)
}


export default Sort;