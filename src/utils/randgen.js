const { randomInt } = require("crypto");

const letterArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const symArr = ["!", "#", "@", "%", "$", "*", "&", "?"];
const resArr = [];

function alphaNumSym(length = 10) {
	while(resArr.length < length) {
		const num = randomInt(-9, 9);
		if (num < 0) {
			resArr.push(letterArr[randomInt(0, 25)]);
		}
		else if (num > 0) {
			resArr.push(randomInt(0, 9));
		}
		else {
			resArr.push(symArr[randomInt(0, 9)]);
		}
	}
	return resArr.join("");
}

function number(to, from = 0) {
	return randomInt(from, to);
}

exports.alphaNumSym = alphaNumSym;
exports.number = number;
