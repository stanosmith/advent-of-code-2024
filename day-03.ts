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
	// const corruptedMemoryLines = _getInput(true);
	const corruptedMemoryLines = _getInput();
	console.log(corruptedMemoryLines);

	const regexMulInstructions = /mul\(\d+,\d+\)/g;
	// This regular expression uses:
	// 	- `mul\(`: Matches the literal string "mul(".
	//  - `\d+`: Matches one or more digits, representing x.
	//  - `,`: Matches the literal comma.
	//  - `\d+`: Matches one or more digits, representing y.
	//  - `\)`: Matches the literal closing parenthesis.
	// This will match strings like "mul(123,456)" where 123 and 456 are numbers.

	const regexFactors = /\b\d+,\d+\b/g;
	// This regular expression uses:
	// - `\b`: Word boundary to ensure the match is not part of a larger word or number.
	// - `\d+`: Matches one or more digits, representing x.
	// - `,`: Matches the literal comma.
	// - `\d+`: Matches one or more digits, representing y.
	// - `\b`: Word boundary to ensure the match is not part of a larger word or number.
	// This regex will match strings like "123,456" where both 123 and 456 are numbers.

	const mulInstructions = corruptedMemoryLines
		.flatMap((corruptMemory) => {
			return corruptMemory.match(regexMulInstructions) || "";
		})
		.filter(_.identity)
		.map((mulInstruction) => mulInstruction.match(regexFactors)?.join("") || "")
		.filter(_.identity)
		.map((factors) =>
			factors.split(",").map((factor) => Number.parseInt(factor)),
		)
		.map((factors) => _.multiply(...factors));
	console.log({ mulInstructions });

	return _.sum(mulInstructions);
}

function partTwo() {
	const reports = _getInput(true);
	// const reports = _getInput();
	console.log(reports);
}
