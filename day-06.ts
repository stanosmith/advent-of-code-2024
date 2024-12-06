import _ from "lodash";
import { getInput } from "./utils.ts";

export default {
	solve: {
		partOne,
		partTwo,
	},
};

// @see https://adventofcode.com/2024/day/4
function _getInput(isTest?: boolean) {
	return getInput({ day: "06" }, isTest);
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
