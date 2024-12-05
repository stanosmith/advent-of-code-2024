import _ from "lodash";
import { getInput } from "./utils.ts";

export default {
	solve: {
		partOne,
		partTwo,
	},
};

// @see https://adventofcode.com/2024/day/3
function _getInput(isTest?: boolean) {
	const input = getInput({ day: "03" }, isTest);
	return input;
}

// Scan the corrupted memory for uncorrupted "mul" instructions.
// What do you get if you add up all the results of the multiplications?
// Given this string: "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"
// These are the valid "mul" instructions:
//    - mul(2,4)
//    - mul(5,5)
//    - mul(11,8)
//    - mul(8,5)
function partOne() {
	const reports = _getInput(true);
	// const reports = _getInput();
	console.log(reports);
}

function partTwo() {
	const reports = _getInput(true);
	// const reports = _getInput();
	console.log(reports);
}
