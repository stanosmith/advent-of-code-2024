export function getInput(
	options: { day: string; parseFn?: (input: string) => string[] },
	isTest?: boolean,
) {
	const { day, parseFn } = options;
	const path = `./inputs/day-${day}${isTest ? "-test" : ""}`;
	const input = Deno.readTextFileSync(`${path}.txt`);

	if (typeof parseFn === "function") return parseFn(input);
	return defaultParse(input);
}

function defaultParse(input: string) {
	return input.split("\n").filter((item) => !!item);
}
