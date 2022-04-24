import { FC, useEffect, useState } from "react";
import Bar from "./Bar";

interface BarI {
    height: number;
    width: number;
}

const MainView: FC = () => {
    const [bars, setBars] = useState<BarI[]>([]);

    useEffect(() => {
        const bars: BarI[] = [
            { height: 100, width: 100 },
            { height: 50, width: 100 },
            { height: 60, width: 100 },
            { height: 55, width: 100 },
        ];
        setBars(bars);
    }, []);

    return (
        <div className="container">
            {
                bars.map(bar => (
                    <div className="bar-container">
                        <Bar  {...bar} />
                    </div>
                ))
            }
        </div>
    )
}

export default MainView;