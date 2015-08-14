export function average(numbers = []) {
	let sum = 0;
	for (let item of numbers) {
		sum += item;
	}
	return sum / numbers.length;
}

export function scoring(algo, data, scope) {
	if (typeof algo == 'function') {
		return algo.call(scope);
	} else {
		switch (algo) {
			case 'average':
				let scores = data.map(entry => entry.value);
				return average(scores);
				break;
		}
	}
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
