const { randomInt } = require("crypto");

function alphaNumSym(length = 10, numsIncluded = true, seed = false) {
	let letterArr;
	let symArr;
	if(!seed) {
		letterArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		symArr = ["!", "#", "@", "%", "$", "*", "&", "?"];
	}
	else {
		seed = seed.split("");
		letterArr = seed.slice(0, (seed.length / 2) + 1);
		symArr = seed.slice(-(seed.length / 2));
	}
	const resArr = [];
	while(resArr.filter(el => el === 0 || el).length < length) {
		const num = randomInt(-5, 9);
		if (num <= 0) {
			resArr.push(letterArr[randomInt(0, letterArr.length)]);
		}
		else if (num < 5 && num > 0) {
			resArr.push(symArr[randomInt(0, symArr.length)]);
		}
		else if(numsIncluded && num >= 5) {
			resArr.push(randomInt(0, 9));
		}
	}
	return resArr.join("");
}

function number(to, from = 0) {
	return randomInt(from, to);
}

exports.alphaNumSym = alphaNumSym;
exports.number = number;
