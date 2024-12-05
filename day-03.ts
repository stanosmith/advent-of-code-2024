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
	return getInput({ day: "03" }, isTest);
}

// This will match strings like "mul(123,456)" where 123 and 456 are numbers.
const regexMulInstructions = /mul\(\d+,\d+\)/g;
// This regular expression uses:
// 	- `mul\(`: Matches the literal string "mul(".
//  - `\d+`: Matches one or more digits, representing x.
//  - `,`: Matches the literal comma.
//  - `\d+`: Matches one or more digits, representing y.
//  - `\)`: Matches the literal closing parenthesis.

// This regex will match strings like "123,456" where both 123 and 456 are numbers.
const regexFactors = /\b\d+,\d+\b/g;
// This regular expression uses:
// - `\b`: Word boundary to ensure the match is not part of a larger word or number.
// - `\d+`: Matches one or more digits, representing x.
// - `,`: Matches the literal comma.
// - `\d+`: Matches one or more digits, representing y.
// - `\b`: Word boundary to ensure the match is not part of a larger word or number.

function getProducts(factors: string[]) {
	return factors
		.filter(_.identity)
		.map((mulInstruction) => mulInstruction.match(regexFactors)?.join("") || "")
		.filter(_.identity)
		.map((factors) =>
			factors.split(",").map((factor) => Number.parseInt(factor)),
		)
		.map((factors) => _.multiply(...factors));
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
	const corruptedMemoryLines = _getInput(true);
	// const corruptedMemoryLines = _getInput();
	// console.log(corruptedMemoryLines);

	const mulInstructions = corruptedMemoryLines.flatMap((corruptMemory) => {
		return corruptMemory.match(regexMulInstructions) || "";
	});
	const products = getProducts(mulInstructions);

	console.table({ mulInstructions, products });

	return _.sum(products);
}

// There are two new instructions you'll need to handle:
//     - The do() instruction enables future mul instructions.
//     - The don't() instruction disables future mul instructions.
// Only the most recent do() or don't() instruction applies. At the beginning of the program, mul instructions are enabled.
// Given this string: "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
// These are the valid "mul" instructions:
//    - mul(2,4)
//    - mul(8,5)
function partTwo() {
	// // INFO: Manually entering because the part two test data is NOT THE SAME as part one
	const corruptedMemoryLines = [
		// "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
		"' mul(382,128)select(){*who(710,947)mul(117,325)?$#from()/select()mul(829,251)}@mul(17,183)(:*when()}?+,what()mul(911,142)[:>)who(824,820)/mul(199,484) when()mul(325,240))select()$~?'from(387,163)>what()@mul(920,723)where()}(#what()<who() !mul(274,899)what()mul(664,836)}~who();how()who(537,994)/(?]mul(257,635)^when()don't()!what()}where()#:when()>'where()mul(360,222),when()@&<^mul(268,245){{)%:from()<#mul(936,776)$select()!mul(474,825)how()}~mul(484,39)!?:@[*<mul(357,805)how()mul(261,810) {$>mul(306,422)$when()when()/@$$!mul(944,563)<!%!(from()mul(47,642)#^(why()(}:$mul(403,781)mul(382,778)$%$-)mul(48,400)@{?select()-/%when())}mul(114,537)^$&{&select()+why(){/mul(688,466) ):mul(950,333)when()}what()when(){>'!%+mul(974,802)what(291,78)*mul(394,250)why()<;mul(271,377)how()%**@who()*from()mul(569,753))who()*^mul(83,470)#-{from()when()-;mul(678,845)where()><;]$do()>what()(#)how() mul(958,48)select()from()<%mul(965,566)!};<where()mul(926,836)>*when()?)%do()}mul(465,920)>$%$when()mul(905,944)#$+~>mul(738,782)how()]&'{~from()-@-mul(671,73)#@'+when()(*mul(981,305)(],%~why()mul(943,403);*(& from()mul(773,597)from()?}who()mul(177,608); when(){'@how()how()$:mul(615,69)~>: ),(mul(273,327)&from()(!:mul(588,34)&);,~}&]where()how()mul(476,402)when(886,135)'what(435,192)/]]mul(70,477)how()[}*^mul(826,769)mul(630,778)]when(201,168)!mul(757,817)//$select()what()mul(704,71)why(274,220)(%<mul(880,91)'mul(482,52)what()",
	];
	// const corruptedMemoryLines = _getInput();
	// console.log(corruptedMemoryLines);

	const regexDont = /don't\(\)/;
	// This regular expression matches:
	//     - `don't`: The literal string with an apostrophe.
	//     - `\(`: A literal opening parenthesis.
	//     - `\)`: A literal closing parenthesis.
	// Since there are no special regex characters to escape in the word "don't" aside from ensuring characters are matched
	// literally, the above pattern will match the specific string "don't()".

	const regexDo = /do\(\)/;
	// This regular expression matches:
	//     - `do`: The literal string "do".
	//     - `\(`: A literal opening parenthesis.
	//     - `\)`: A literal closing parenthesis.
	// This pattern will match the exact string "do()".

	const mulInstructions = corruptedMemoryLines.flatMap((corruptMemory) => {
		return corruptMemory
			.split(regexDont)
			.flatMap((donts, index) => {
				// Always return the first section since we assume do()
				if (index === 0) return donts;
				// return donts.split(regexDo).filter((_dos, index) => index !== 0);
				return donts.split(regexDo).slice(1);
			})
			.flatMap((dos) => dos.match(regexMulInstructions) || "");
		// .filter(_.identity);
	});
	console.log({ mulInstructions });

	// const products = getProducts(mulInstructions);
	// console.table({ mulInstructions, products });
	// return _.sum(products);
}
