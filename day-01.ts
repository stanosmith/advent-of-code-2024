import _ from "lodash";
import { getInput } from "./utils.ts";

export default {
	solve: {
		part1,
		part2,
	},
};

function _getInput(isTest?: boolean) {
	const input = getInput({ day: "01" }, isTest);
	return input.map((locationIds) =>
		locationIds
			.split(" ")
			.filter(_.identity)
			.map((locationIds) => Number.parseInt(locationIds)),
	);
}

// @see https://adventofcode.com/2024/day/1
function part1() {
	// const input = _getInput(true);
	const input = _getInput();
	// console.log(input);

	const listLeft = _.sortBy(input.map((locationIds) => locationIds[0]));
	const listRight = _.sortBy(input.map((locationIds) => locationIds[1]));
	console.log({ listLeft, listRight });

	const distances = listLeft.map((leftLocationId: number, index: number) => {
		const rightLocationId = listRight[index];
		return Math.abs(leftLocationId - rightLocationId);
	});
	console.log({ distances });

	return _.sum(distances);
}

function part2() {
	const input = _getInput(true);
	console.log(input);
}
