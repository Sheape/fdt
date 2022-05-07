const AGE_OF_STUDENTS = [
    25, 30, 18, 17, 50, 12, 43, 35, 40, 9,
    33, 37, 41, 21, 20, 31, 35, 46, 10, 36,
    28, 19, 18, 13, 28, 16, 42, 27, 28, 31,
    40, 48, 40, 39, 32, 32, 26, 13, 3, 50,
    26, 15, 14, 10, 38, 35, 34, 29, 30, 20
]

const result = [];
const HASH_CHAR = '####-';
const BAR_CHAR = '|';
/* Find the interval, Tally, Frequency, boundaries (in range), and less than
cumulative frequency(<cf) from this given table */
/* For tally, you must group 5 bars by replacing it with #### and put a dash or
-
example: ####-####-||
The bars must be | not capital i but pipe
(hold shift + backslash)*/

/* I want you to return an object with array as the values for each properties..

/* Example:
const result = {
    class_interval: [3-9, 10-16, ...],
    tally: [III, ####-I, ...],
    frequency: [3, 6, ...],
    boundaries: [2.5-9.5, 9.5-16.5, ...],
    l_cumulative_frequency: [2, 10, ...],
}

const result = [
    {
        class_interval: "3-9",
        tally: "III",
        frequency: 3,
        boundaries: "2.5-9.5",
        l_cumulative_frequency: 2
    },
    {
        class_interval: "10-16",
        tally: "####-I",
        frequency: 6,
        boundaries: "9.5-16.5",
        l_cumulative_frequency: 10
    },
]
*/
/* class Utils {
    checkIfDefault(params: string[]): boolean {
    }
} */

class Preprocessor {
    getRange(highest: number, lowest: number): number {
        return highest - lowest;
    }

    getClass(n: number): number {
        return 1 + 3.3 * Math.log10(n);
    }

    getInterval(highest: number, lowest: number, n: number): number {
        return Math.round(this.getRange(highest, lowest) / this.getClass(n));
    }
}

interface Class {
    class_interval?: string;
    tally?: string;
    frequency?: number;
    boundaries?: string;
    l_cumulative_frequency?: number;
}

class Fdt extends Preprocessor {
    input_array!: number[];
    MAX: number;
    MIN: number;
    const_interval: number;

    constructor(array: number[]) {
        super();
        this.input_array = array;
        this.MAX = Math.max.apply(null, array); // Highest value in an array.
        this.MIN = Math.min.apply(null, array); // Lowest value in an array.
        this.const_interval = super.getInterval(this.MAX, this.MIN,
                                                this.input_array.length);
    }

    private cur_interval: number;
    final_result = result;

    // Temporary arrays before combining them to an object.
    private _class_interval: Array<string> = [];
    private _tally: Array<string> = [];
    private _frequency: Array<number> = [];
    private _class_boundary: Array<string> = [];
    private _less_cumulative: Array<number> = [];

    private stopIteration(interval: number = 0): Promise<boolean> {
        return new Promise((_stop, _continue) => {
    //     if (this.cur_interval >= this.MAX) { return this }
            if (interval >= this.MAX) {
                _stop(true);
            } else {
                _stop(false);
            }
        })
    }

    private getCurrentInterval(interval: number = 0): Promise<number> {
        return new Promise((resolve, reject) => {
            if (!interval) {
                resolve(this.cur_interval = this.MIN);
            } else {
                resolve(this.cur_interval += this.const_interval);
            }
        })
    }

    private getBoundaries(interval: number): Promise<Array<number>> {
        return new Promise((resolve, reject) => {
            const lower_bound = interval;
            const higher_bound = interval + this.const_interval - 1;
            resolve([lower_bound, higher_bound]);
        })
    }

    private getTotalTally(tally: Array<number>): Promise<number> {
        return new Promise((resolve, reject) => {
            resolve(tally.length);
        })
    }

    private getFrequency(array: Array<number>, lower_bound: number,
                         higher_bound: number): Promise<number>
    {
        return new Promise((resolve, reject) => {
            const tally_points = array.filter(item => (
                item >= lower_bound && item <= higher_bound
            ))
            resolve(tally_points.length)
        })
    }

    private sumCumulative(frequency: Array<number>):
        Promise<number>
    {
        return new Promise((resolve, reject) => {
            if (frequency.length < 1) {
                resolve(0);
            } else {
                resolve(frequency.reduce((current_cumulative, item) => {
                    return current_cumulative + item;
                }))
            }
        })
    }

    /* private checkObjectExist(randomstuff: string, array: Array<any>, index: number,
                             output: string | number)
    {
        if (!array.includes(randomstuff)) {
            return array[index] = { randomstuff: output }
        } else {
            return array[index].randomstuff = output;
        }
    } */
    /* private class_interval_enabled: boolean = false;
    private frequency_enabled: boolean = false;
    private tally_enabled: boolean = false;
    private boundaries_enabled: boolean = false;
    private l_cumulative_enabled: boolean = false; */
    private func = [
        { name: "classInterval", enabled: false },
        { name: "frequency", enabled: false },
        { name: "tally", enabled: false },
        { name: "boundaries", enabled: false },
        { name: "lessCumulative", enabled: false }
    ]

    async classInterval(interval: number = 0) {
        /* const output: Class = {
            class_interval: "nice"
        } */
        this.func[0].enabled = true;
        console.log(this.func[0].enabled);

        interval = await this.getCurrentInterval(interval);
        const is_loop_finished = await this.stopIteration(interval);
        // check if we should get out of the recursion
        if (is_loop_finished) { return };

        const boundaries = await this.getBoundaries(interval);
        const output = `${boundaries[0]} - ${boundaries[1]}`
        this._class_interval.push(output);

        // console.log(this._class_interval);
        this.cur_interval = interval;

        this.classInterval(interval);
    }

    async frequency(interval: number = 0) {
        // interval = await this.getCurrentInterval(interval);
        this.func[1].enabled = true;
        interval = this.cur_interval;
        const is_loop_finished = await this.stopIteration(interval);
        // check if we should get out of the recursion
        if (is_loop_finished) { return };
        // (!this.cur_iteration) ? this.cur_iteration += 1: this.cur_iteration = 0;
        // this.cur_iteration = 0;

        const boundaries = await this.getBoundaries(interval);
        const tally_points = await this.getFrequency(this.input_array,
                                                     boundaries[0],
                                                     boundaries[1])
        this._frequency.push(tally_points);
        // console.log(this._frequency);

        this.frequency(interval);
    }

    async tally(interval: number = 0, tally: Array<number> = []) {
        this.func[2].enabled = true;
        interval = await this.getCurrentInterval(interval);
        const is_loop_finished = await this.stopIteration(interval);

        if (!tally) { tally = this._frequency; }

        const total_tally = await this.getTotalTally(this._frequency);
        const total = this._frequency[total_tally] / 5;
        const hashes = Math.floor(total);
        const bars = (Math.round((total - hashes) * 10) / 10) * 5;

        const output = HASH_CHAR.repeat(hashes) + BAR_CHAR.repeat(bars);
        this._tally.push((output.endsWith('-')) ? output.slice(0, -1) : output);
        // console.log(this._frequency.length);
        // console.log(this._tally);

        // check if we should get out of the recursion
        if (is_loop_finished) { return };
        this.tally(interval);
    }

    async boundaries(interval: number = 0) {
        this.func[3].enabled = true;
        interval = await this.cur_interval;
        const is_loop_finished = await this.stopIteration(interval);
        // check if we should get out of the recursion
        if (is_loop_finished) { return };

        const _boundaries = await this.getBoundaries(interval);
        const output = `${_boundaries[0] - 0.5} - ${_boundaries[1] - 0.5}`
        this._class_boundary.push(output);
        // console.log(this._class_boundary);

        this.boundaries(interval);
    }

    async lessCumulative(iteration: number = 0) {
        // const frequency = await this.getTotalTally(this._frequency);
        // console.log(this._frequency.length);
        this.func[4].enabled = true;

        if (iteration === 22) { return };
        iteration += 1;
        // frequency = (frequency.length > 0) ? this._frequency : frequency;
        const output = await this.sumCumulative(this._frequency);
        this._less_cumulative.push(output);
        this._less_cumulative = this._less_cumulative.filter((number, index) => {
            return this._less_cumulative.indexOf(number) === index;
        })
        console.log(this._less_cumulative);
        // console.log(iteration);
        this.lessCumulative(iteration);
    }

    getResult() {
        this.func.forEach((func) => {
            if (func.enabled) {
                const funcName = `this.${func.name}()`;
                eval(funcName);
            }
        })
    }
}

const fdt = new Fdt(AGE_OF_STUDENTS);
// console.log(fdt.getInterval(fdt.MAX, fdt.MIN, fdt.input_array.length));
console.log(fdt);
fdt.classInterval();
fdt.frequency();
fdt.tally();
fdt.boundaries();
fdt.lessCumulative();
console.log(fdt.getResult());
// console.log(result);
// console.log(fdt.cur_iteration);
