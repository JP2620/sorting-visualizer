import { BarI, SortAction } from "./Sort";


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

const selectionSort = (bars: BarI[]): SortAction[] => {
    let actions: SortAction[] = [];
    for (let i = 0; i < bars.length; i++) {
        let lowest = i;
        for (let j = i + 1; j < bars.length; j++) {
            actions.push({
                type: "compare",
                index1: i,
                index2: j
            });
            if (bars[j].height < bars[lowest].height) {
                lowest = j;
            }
        }
        actions.push({
            type: "swap",
            index1: i,
            index2: lowest
        });
        [bars[i], bars[lowest]] = [bars[lowest], bars[i]];
    }
    return actions;
}

const gnomeSort = (bars: BarI[]): SortAction[] => {
    let actions: SortAction[] = [];
    let index = 0;
    while (index < bars.length) {
        if (index !== 0) {
            actions.push({
                type: "compare",
                index1: index - 1,
                index2: index
            });
        }
        if (index === 0 || bars[index - 1].height <= bars[index].height) {
            index++;
        } else {
            actions.push({
                type: "swap",
                index1: index - 1,
                index2: index
            });
            [bars[index - 1], bars[index]] = [bars[index], bars[index - 1]];
            index--;
        }
    }
    return actions;
}

export { bubbleSort, insertionSort, selectionSort, gnomeSort };