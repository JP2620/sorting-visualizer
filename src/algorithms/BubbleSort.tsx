import { FC, useEffect, useState } from "react";
import { isPropertySignature } from "typescript";
import Bar from "../components/Bar";

export interface BarI {
    height: number;
    width: number;
    beingCompared: boolean;
    sorted: boolean;
};

export type BubbleSortProps = {
    bars: BarI[];
    setBars: React.Dispatch<React.SetStateAction<BarI[]>>;
};

const BubbleSort: FC <BubbleSortProps> = (props) => {
    const [isSorted, setIsSorted] = useState(false);


    useEffect(() => {
        props.setBars((prevBars => {
            let counter = 0;
            for (let i = 0; i < prevBars.length - 1; i++) {
                for (let j = 0; j < prevBars.length - i - 1; j++) {
                    counter ++;
                    setTimeout(() => {
                        props.setBars((prevBars) => {
                            const bars: any[] = Object.assign([], prevBars);
                            if (j > 0) {
                                bars[j - 1].beingCompared = false;
                            }
                            else if (j == 0 && i != 0) {
                                bars[prevBars.length - i - 1].beingCompared = false;
                                bars[prevBars.length - i ].beingCompared = false;
                            }
                            bars[j].beingCompared = true;
                            bars[j + 1].beingCompared = true;
                            return bars
                        })
                    }, counter * 300, counter);

                    setTimeout(() => {
                        props.setBars((prevBars) => {
                            const bars: any[] = Object.assign([], prevBars);
                            if (bars[j].height > bars[j + 1].height) {
                                [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
                            }
                            return bars;
                        })
                    }, counter * 300 + 150, counter);

                }
            }
            setTimeout(() => {
                counter++;
                setIsSorted(true);
                props.setBars((prevBars) => prevBars.map((bar) => {
                    bar.beingCompared = false;
                    return bar;
                }))
            }, counter * 300 + 300, counter);
            return prevBars;
        }))
        
    }, []);

    useEffect(() => {
        if (isSorted) {
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
        }
    }, [isSorted])

return (
    <div className="algo-container">
        {props.bars.map((bar, index) => {
            return (
                <div key={index} className="bar-container">
                    <Bar
                     {...bar}
                    />
                </div>

            );
        })}
    </div>)
}


export default BubbleSort;