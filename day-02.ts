import _ from "lodash";
import { getInput } from "./utils.ts";

export default {
	solve: {
		partOne,
		partTwo,
	},
};

function _getInput(isTest?: boolean) {
	const input = getInput({ day: "02" }, isTest);
	return input.map((reports) =>
		reports
			.split(" ")
			.filter(_.identity)
			.map((level) => Number.parseInt(level)),
	);
}

// @see https://adventofcode.com/2024/day/2
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
