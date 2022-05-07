var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var AGE_OF_STUDENTS = [
    25, 30, 18, 17, 50, 12, 43, 35, 40, 9,
    33, 37, 41, 21, 20, 31, 35, 46, 10, 36,
    28, 19, 18, 13, 28, 16, 42, 27, 28, 31,
    40, 48, 40, 39, 32, 32, 26, 13, 3, 50,
    26, 15, 14, 10, 38, 35, 34, 29, 30, 20
];
var result = [];
var HASH_CHAR = '####-';
var BAR_CHAR = '|';
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
var Preprocessor = /** @class */ (function () {
    function Preprocessor() {
    }
    Preprocessor.prototype.getRange = function (highest, lowest) {
        return highest - lowest;
    };
    Preprocessor.prototype.getClass = function (n) {
        return 1 + 3.3 * Math.log10(n);
    };
    Preprocessor.prototype.getInterval = function (highest, lowest, n) {
        return Math.round(this.getRange(highest, lowest) / this.getClass(n));
    };
    return Preprocessor;
}());
var Fdt = /** @class */ (function (_super) {
    __extends(Fdt, _super);
    function Fdt(array) {
        var _this = _super.call(this) || this;
        _this.final_result = result;
        // Temporary arrays before combining them to an object.
        _this._class_interval = [];
        _this._tally = [];
        _this._frequency = [];
        _this._class_boundary = [];
        _this._less_cumulative = [];
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
        _this.func = [
            { name: "classInterval", enabled: false },
            { name: "frequency", enabled: false },
            { name: "tally", enabled: false },
            { name: "boundaries", enabled: false },
            { name: "lessCumulative", enabled: false }
        ];
        _this.input_array = array;
        _this.MAX = Math.max.apply(null, array); // Highest value in an array.
        _this.MIN = Math.min.apply(null, array); // Lowest value in an array.
        _this.const_interval = _super.prototype.getInterval.call(_this, _this.MAX, _this.MIN, _this.input_array.length);
        return _this;
    }
    Fdt.prototype.stopIteration = function (interval) {
        var _this = this;
        if (interval === void 0) { interval = 0; }
        return new Promise(function (_stop, _continue) {
            //     if (this.cur_interval >= this.MAX) { return this }
            if (interval >= _this.MAX) {
                _stop(true);
            }
            else {
                _stop(false);
            }
        });
    };
    Fdt.prototype.getCurrentInterval = function (interval) {
        var _this = this;
        if (interval === void 0) { interval = 0; }
        return new Promise(function (resolve, reject) {
            if (!interval) {
                resolve(_this.cur_interval = _this.MIN);
            }
            else {
                resolve(_this.cur_interval += _this.const_interval);
            }
        });
    };
    Fdt.prototype.getBoundaries = function (interval) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var lower_bound = interval;
            var higher_bound = interval + _this.const_interval - 1;
            resolve([lower_bound, higher_bound]);
        });
    };
    Fdt.prototype.getTotalTally = function (tally) {
        return new Promise(function (resolve, reject) {
            resolve(tally.length);
        });
    };
    Fdt.prototype.getFrequency = function (array, lower_bound, higher_bound) {
        return new Promise(function (resolve, reject) {
            var tally_points = array.filter(function (item) { return (item >= lower_bound && item <= higher_bound); });
            resolve(tally_points.length);
        });
    };
    Fdt.prototype.sumCumulative = function (frequency) {
        return new Promise(function (resolve, reject) {
            if (frequency.length < 1) {
                resolve(0);
            }
            else {
                resolve(frequency.reduce(function (current_cumulative, item) {
                    return current_cumulative + item;
                }));
            }
        });
    };
    Fdt.prototype.classInterval = function (interval) {
        if (interval === void 0) { interval = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var is_loop_finished, boundaries, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /* const output: Class = {
                            class_interval: "nice"
                        } */
                        this.func[0].enabled = true;
                        console.log(this.func[0].enabled);
                        return [4 /*yield*/, this.getCurrentInterval(interval)];
                    case 1:
                        interval = _a.sent();
                        return [4 /*yield*/, this.stopIteration(interval)];
                    case 2:
                        is_loop_finished = _a.sent();
                        // check if we should get out of the recursion
                        if (is_loop_finished) {
                            return [2 /*return*/];
                        }
                        ;
                        return [4 /*yield*/, this.getBoundaries(interval)];
                    case 3:
                        boundaries = _a.sent();
                        output = "".concat(boundaries[0], " - ").concat(boundaries[1]);
                        this._class_interval.push(output);
                        // console.log(this._class_interval);
                        this.cur_interval = interval;
                        this.classInterval(interval);
                        return [2 /*return*/];
                }
            });
        });
    };
    Fdt.prototype.frequency = function (interval) {
        if (interval === void 0) { interval = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var is_loop_finished, boundaries, tally_points;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // interval = await this.getCurrentInterval(interval);
                        this.func[1].enabled = true;
                        interval = this.cur_interval;
                        return [4 /*yield*/, this.stopIteration(interval)];
                    case 1:
                        is_loop_finished = _a.sent();
                        // check if we should get out of the recursion
                        if (is_loop_finished) {
                            return [2 /*return*/];
                        }
                        ;
                        return [4 /*yield*/, this.getBoundaries(interval)];
                    case 2:
                        boundaries = _a.sent();
                        return [4 /*yield*/, this.getFrequency(this.input_array, boundaries[0], boundaries[1])];
                    case 3:
                        tally_points = _a.sent();
                        this._frequency.push(tally_points);
                        // console.log(this._frequency);
                        this.frequency(interval);
                        return [2 /*return*/];
                }
            });
        });
    };
    Fdt.prototype.tally = function (interval, tally) {
        if (interval === void 0) { interval = 0; }
        if (tally === void 0) { tally = []; }
        return __awaiter(this, void 0, void 0, function () {
            var is_loop_finished, total_tally, total, hashes, bars, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.func[2].enabled = true;
                        return [4 /*yield*/, this.getCurrentInterval(interval)];
                    case 1:
                        interval = _a.sent();
                        return [4 /*yield*/, this.stopIteration(interval)];
                    case 2:
                        is_loop_finished = _a.sent();
                        if (!tally) {
                            tally = this._frequency;
                        }
                        return [4 /*yield*/, this.getTotalTally(this._frequency)];
                    case 3:
                        total_tally = _a.sent();
                        total = this._frequency[total_tally] / 5;
                        hashes = Math.floor(total);
                        bars = (Math.round((total - hashes) * 10) / 10) * 5;
                        output = HASH_CHAR.repeat(hashes) + BAR_CHAR.repeat(bars);
                        this._tally.push((output.endsWith('-')) ? output.slice(0, -1) : output);
                        // console.log(this._frequency.length);
                        // console.log(this._tally);
                        // check if we should get out of the recursion
                        if (is_loop_finished) {
                            return [2 /*return*/];
                        }
                        ;
                        this.tally(interval);
                        return [2 /*return*/];
                }
            });
        });
    };
    Fdt.prototype.boundaries = function (interval) {
        if (interval === void 0) { interval = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var is_loop_finished, _boundaries, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.func[3].enabled = true;
                        return [4 /*yield*/, this.cur_interval];
                    case 1:
                        interval = _a.sent();
                        return [4 /*yield*/, this.stopIteration(interval)];
                    case 2:
                        is_loop_finished = _a.sent();
                        // check if we should get out of the recursion
                        if (is_loop_finished) {
                            return [2 /*return*/];
                        }
                        ;
                        return [4 /*yield*/, this.getBoundaries(interval)];
                    case 3:
                        _boundaries = _a.sent();
                        output = "".concat(_boundaries[0] - 0.5, " - ").concat(_boundaries[1] - 0.5);
                        this._class_boundary.push(output);
                        // console.log(this._class_boundary);
                        this.boundaries(interval);
                        return [2 /*return*/];
                }
            });
        });
    };
    Fdt.prototype.lessCumulative = function (iteration) {
        if (iteration === void 0) { iteration = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var output;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // const frequency = await this.getTotalTally(this._frequency);
                        // console.log(this._frequency.length);
                        this.func[4].enabled = true;
                        if (iteration === 22) {
                            return [2 /*return*/];
                        }
                        ;
                        iteration += 1;
                        return [4 /*yield*/, this.sumCumulative(this._frequency)];
                    case 1:
                        output = _a.sent();
                        this._less_cumulative.push(output);
                        this._less_cumulative = this._less_cumulative.filter(function (number, index) {
                            return _this._less_cumulative.indexOf(number) === index;
                        });
                        console.log(this._less_cumulative);
                        // console.log(iteration);
                        this.lessCumulative(iteration);
                        return [2 /*return*/];
                }
            });
        });
    };
    Fdt.prototype.getResult = function () {
        this.func.forEach(function (func) {
            if (func.enabled) {
                var funcName = "console.log(\"".concat(func.name, "\")");
                eval(funcName);
            }
        });
    };
    return Fdt;
}(Preprocessor));
var fdt = new Fdt(AGE_OF_STUDENTS);
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
