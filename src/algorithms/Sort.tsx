import { FC, useEffect, useState } from "react";
import { bubbleSort, gnomeSort, insertionSort, selectionSort } from "./Algorithms";

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
    algorithm: string | null;
};

const Sort: FC<SortProps> = (props) => {
    const [finishedSorting, setFinishedSorting] = useState<boolean>(false);
    const comparisonDelay = 100;


    useEffect(() => {
        let algorithm: (bars: BarI[]) => SortAction[];
        if (props.algorithm === "bubblesort") {
            algorithm = bubbleSort;
        } else if (props.algorithm === "insertionsort") {
            algorithm = insertionSort;  
        } else if (props.algorithm === "selectionsort") {
            algorithm = selectionSort;
        } else if (props.algorithm === "gnomesort") {
            algorithm = gnomeSort;
        } else {
            return;
        }
        console.log(props.bars.map(a => ({ ...a })))
        
        const actions: SortAction[] = algorithm(props.bars.map(a => ({ ...a })));
        for (let counter = 0; counter < actions.length; counter++) {
            const delay: number = counter * comparisonDelay;
            setTimeout(() => {
                props.setBars((prevBars: BarI[]) => {
                    let newBars: BarI[] = Object.assign([], prevBars);
                    if (actions[counter].type === "compare") {
                        newBars = newBars.map((bar: BarI) => {
                            return { ...bar, beingCompared: false };
                        });
                        newBars[actions[counter].index1].beingCompared = true;
                        newBars[actions[counter].index2].beingCompared = true;
                    } else if (actions[counter].type === "swap") {
                        let i1: number = actions[counter].index1;
                        let i2: number = actions[counter].index2;
                        [newBars[i1], newBars[i2]] = [newBars[i2], newBars[i1]]
                    }
                    console.log(newBars)
                    return newBars;
                })

                if (counter == actions.length - 1) {
                    setFinishedSorting(true);
                    props.setBars((prevBars: BarI[]) => {
                        return prevBars.map((bar: BarI) => {
                            return { ...bar, beingCompared: false }
                        })
                    });
                }
            }, delay, counter);
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
            }, counter * 50 + 50, counter);
        }
    }, [finishedSorting])

    return (<></>)
}


export default Sort;