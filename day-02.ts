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

// A report only counts as safe if both of the following are true:
//     - The levels are either all increasing or all decreasing.
//     - Any two adjacent levels differ by at least one and at most three.
// @see https://adventofcode.com/2024/day/2
function partOne() {
	// const reports = _getInput(true);
	const reports = _getInput();
	console.log(reports);

	const safeReports = reports.filter((report) => {
		const increaseOrDecrease = (increase?: boolean) => {
			return (level: number, index: number) => {
				const nextLevel = report[index + 1];

				if (typeof nextLevel === "undefined") return true;

				return increase ? level < nextLevel : level > nextLevel;
			};
		};
		const withinRange = (level: number, index: number) => {
			const nextLevel = report[index + 1];
			if (typeof nextLevel === "undefined") return true;

			const diff = Math.abs(level - nextLevel);

			return diff === 1 || diff === 2 || diff === 3;
		};

		const increasing = report.filter(increaseOrDecrease(true));
		const allIncreasing = increasing.length === report.length;

		const decreasing = report.filter(increaseOrDecrease());
		const allDecreasing = decreasing.length === report.length;

		const diffWithinRange = report.filter(withinRange);
		const allDiffWithinRange = diffWithinRange.length === report.length;

		console.table({
			// increasing,
			// decreasing,
			allIncreasing,
			allDecreasing,
			// diffWithinRange,
			allDiffWithinRange,
		});

		return (allIncreasing || allDecreasing) && allDiffWithinRange;
	});

	return safeReports.length;
}

function partTwo() {
	const reports = _getInput(true);
	// const reports = _getInput();
	console.log(reports);
}
