import _ from "lodash";
import { getInput } from "./utils.ts";

export default {
	solve: {
		partOne,
		partTwo,
	},
};

// @see https://adventofcode.com/2024/day/5
function _getInput(isTest?: boolean) {
	return getInput({ day: "05" }, isTest);
	// .split("\n\n")
	// .map((line) => line.split("\n"))
	// .map((line, index) => {
	// 	if (index === 0) return line;
	// 	return line
	// 		.filter(_.identity)
	// 		.map((pageNumbers) => pageNumbers.split(","));
	// });
}

function partOne() {
	const input = _getInput(true);
	// const input = _getInput();
	console.log(input);
}

function partTwo() {
	const input = _getInput(true);
	// const input = _getInput();
	console.log(input);
}
