import { FC, useEffect, useState } from "react";
import { isPropertySignature } from "typescript";
import Bar from "../components/Bar";

interface SortAction {
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
    const comparisonDelay = 250;
    const bubbleSort = (bars: BarI[]): SortAction[] => {
        let actions: SortAction[] = [];
        for (let i = 0; i < bars.length; i++) {
            for (let j = 0; j < bars.length - i - 1; j++) {
                actions.push({
                    type: "compare",
                    index1: j,
                    index2: j + 1
                })
                if (bars[j].height > bars[j + 1].height) {
                    actions.push({
                        type: "swap",
                        index1: j,
                        index2: j + 1
                    })
                    const tmp: BarI = bars[j];
                    bars[j] = bars[j + 1];
                    bars[j + 1] = tmp;
                }
            }
        }
        return actions;
    }

    const insertionSort = (bars: BarI[]): SortAction[] => {
        let actions: SortAction[] = [];
        for (let i = 1; i < bars.length; i++) {
            for (let j = 0; j < i; j++) {
                actions.push({
                    type: "compare",
                    index1: j,
                    index2: i
                });

                if (bars[j].height > bars[i].height) {
                    actions.push({
                        type: "swap",
                        index1: j,
                        index2: i
                    });
                    [bars[j], bars[i]] = [bars[i], bars[j]];
                }
            }
        }
        return actions;
    }

    useEffect(() => {
        console.log(props.algorithm);
        let algorithm: (bars: BarI[]) => SortAction[];
        if (props.algorithm === "bubblesort") {
            algorithm = bubbleSort;
        } else if (props.algorithm === "insertionsort") {
            algorithm = insertionSort;
        }   else {
            return;
        }
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