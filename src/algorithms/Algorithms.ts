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
                index1: j,
                index2: lowest
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

const partition = (items: BarI[], left: number, right: number, actions: SortAction[]) => {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        //move i until hit an item smaller than the pivot
        actions.push({
            type: "compare",
            index1: i,
            index2: Math.floor((right + left) / 2)
        })
        while (items[i].height < pivot.height) {
            i++;
        }

        actions.push({
            type: "compare",
            index1: j,
            index2: Math.floor((right + left) / 2)
        })

        //move j until hit an item bigger than the pivot
        while (items[j].height > pivot.height) {
            j--;
        }

        //if i <= j then swap items[i] and items[j]
        if (i <= j) {
            actions.push({
                type: "swap",
                index1: i,
                index2: j
            });
            [items[i], items[j]] = [items[j], items[i]];
            i++;
            j--;
        }
    }
    return i;
}

const quickSort2 = (items: BarI[], left: number, right: number, actions: SortAction[]): BarI[] => {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right, actions); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort2(items, left, index - 1, actions);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort2(items, index, right, actions);
        }
    }
    return items;
}

const quickSort = (bars: BarI[]): SortAction[] => {
    let actions: SortAction[] = [];
    quickSort2(bars, 0, bars.length - 1, actions);
    return actions;
}



export { bubbleSort, insertionSort, selectionSort, gnomeSort, quickSort };