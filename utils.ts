export function getInput(
	options: { day: string; skipParse?: boolean },
	isTest?: boolean,
) {
	const { day, skipParse } = options;
	const path = `./inputs/day-${day}${isTest ? "-test" : ""}`;
	const input = Deno.readTextFileSync(`${path}.txt`);

	if (typeof skipParse === "function") return input;
	return input.split("\n").filter((item) => !!item);
}
