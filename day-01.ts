import _ from "lodash";
import { getInput } from "./utils.ts";

export default {
	solve: {
		partOne: partOne,
		partTwo: partTwo,
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

function getLeftRightLists(input: number[][], sort?: boolean) {
	const listLeft = input.map((locationIds) => locationIds[0]);
	const listRight = input.map((locationIds) => locationIds[1]);
	return {
		listLeft: sort ? _.sortBy(listLeft) : listLeft,
		listRight: sort ? _.sortBy(listRight) : listRight,
	};
}

// @see https://adventofcode.com/2024/day/1
function partOne() {
	// const input = _getInput(true);
	const input = _getInput();
	// console.log(input);

	const { listLeft, listRight } = getLeftRightLists(input, true);
	console.log({ listLeft, listRight });

	const distances = listLeft.map((leftLocationId: number, index: number) => {
		const rightLocationId = listRight[index];
		return Math.abs(leftLocationId - rightLocationId);
	});
	console.log({ distances });

	return _.sum(distances);
}

// Figure out exactly how often each number from the left list appears in the right list.
// Calculate a total "similarity score" by adding up each number in the left list after
// multiplying it by the number of times that number appears in the right list.
function partTwo() {
	// const input = _getInput(true);
	const input = _getInput();
	console.log(input);

	const { listLeft, listRight } = getLeftRightLists(input);
	console.log({ listLeft, listRight });

	const instances = listLeft.map((leftLocationId: number) => {
		const matches = listRight.filter(
			(locationId: number) => locationId === leftLocationId,
		).length;
		return leftLocationId * matches;
	});
	console.log({ instances });

	return _.sum(instances);
}
