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
	return getInput({ day: "04" }, isTest).map((row) => row.split(""));
}

function partOne() {
	const input = _getInput(true);
	// const input = _getInput();
	console.table(input);

	console.log(countWordOccurrences(input, "XMAS"));
}

function countWordOccurrences(board: string[][], word: string) {
	const directions = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0], // horizontal & vertical
		[1, 1],
		[1, -1],
		[-1, 1],
		[-1, -1], // diagonal
	];

	function searchFrom(
		x: number,
		y: number,
		wordIndex: number,
		visited: Set<unknown>,
	) {
		if (wordIndex === word.length) return 1;
		if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) return 0;
		if (board[x][y] !== word[wordIndex]) return 0;
		if (visited.has(`${x},${y}`)) return 0;

		visited.add(`${x},${y}`);

		let count = 0;
		for (const [dx, dy] of directions) {
			count += searchFrom(x + dx, y + dy, wordIndex + 1, visited);
		}

		visited.delete(`${x},${y}`);
		return count;
	}

	let totalCount = 0;
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			if (board[i][j] === word[0]) {
				const visited = new Set();
				totalCount += searchFrom(i, j, 0, visited);
			}
		}
	}
	return totalCount;
}

function partTwo() {
	const input = _getInput(true);
	// const input = _getInput();
	console.log(input);
}
