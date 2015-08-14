export function average(numbers = []) {
	return sum(numbers) / numbers.length;
}

export function sum(numbers = []) {
	let sum = 0;
	for (let item of numbers) {
		sum += item;
	}
	return sum;
}

export function handleScoring(scope, algo, data, digits) {
	let score = 0;

	if (typeof algo == 'function') {
		score = algo.call(scope);
	} else {
		switch (algo) {
			case 'average':
				var scores = data.map(entry => entry.value);
				score = average(scores);
				break;

			case 'sum':
				var scores = data.map(entry => entry.value);
				score = sum(scores);
				break;
		}
	}

	score = Math.round(score * Math.pow(10, digits)) / Math.pow(10, digits);
	return score;
}

export function getMaxValue(judgingSystem) {
	let digits = judgingSystem.getOption('digits');
	return Math.pow(10, digits + 1);
}

export function getIntervalValue(needle, haystack) {
	var keys = Object.keys(haystack);
	for (var i = 0; i < keys.length; i++) {
		var key = "" + keys[i];

		if (key === needle) {
			return haystack[key];
		} else if (key.startsWith(">=")) {
			var val = parseInt(key.substr(2), 10);
			if (needle >= val) {
				return haystack[key];
			}
		} else if (key.startsWith("<=")) {
			var val = parseInt(key.substr(2), 10);
			if (needle <= val) {
				return haystack[key];
			}
		} else if (key.startsWith(">")) {
			var val = parseInt(key.substr(1), 10);
			if (needle > val) {
				return haystack[key];
			}
		} else if (key.startsWith("<")) {
			var val = parseInt(key.substr(1), 10);
			if (needle < val) {
				return haystack[key];
			}
		} else if (key.indexOf("-") !== -1) {
			var parts = key.split("-"),
				small = parts[0],
				big = parts[1];

			if (needle >= small && needle <= big) {
				return haystack[key];
			}
		}
	}
}
