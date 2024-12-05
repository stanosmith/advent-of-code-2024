// import fp from "lodash/fp"
import _ from "lodash";
import { getInput } from "./utils.ts";

export default {
	solve: {
		part1,
		part2,
	},
};

function _getInput(isTest?: boolean) {
	return (
		getInput({ day: "01" }, isTest)
			// .flatMap((locationIds) => locationIds.split(" "))
			.map((locationIds) => locationIds.split(" ").filter(_.identity))
			.filter(_.identity)
	);
}

function part1() {
	const input = _getInput(true);
	console.log(input);
}

function part2() {
	const input = _getInput(true);
	console.log(input);
}
