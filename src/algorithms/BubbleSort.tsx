import { FC, useEffect, useState } from "react";
import Bar from "../components/Bar";

type BarPropsI = {
    height: number;
    width: number;
    beingCompared: boolean;
};

type BarI = BarPropsI & {
    sorted: boolean
};

const BubbleSort: FC = () => {
    const [bars, setBars] = useState<BarI[]>([]);
    const [isSorted, setIsSorted] = useState(false);


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
            sorted: false
        });
    }


    useEffect(() => {
        setBars(bars_ej);
        setBars((prevBars => {
            let counter = 0;
            for (let i = 0; i < prevBars.length - 1; i++) {
                for (let j = 0; j < prevBars.length - i - 1; j++) {
                    counter ++;
                    setTimeout(() => {
                        setBars((prevBars) => {
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
                        setBars((prevBars) => {
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
                setBars((prevBars) => prevBars.map((bar) => {
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
            for (let i = 0; i < bars.length; i++) {
                setTimeout(() => {
                    setBars((prevBars) => {
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
        {bars.map((bar, index) => {
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