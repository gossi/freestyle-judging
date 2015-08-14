export default class Criterion {

	constructor(category, data) {
		this.category = category;
		this.data = data;
		this.value = 0;
	}

	getLabel() {
		return this.data.label;
	}

	getId() {
		return this.data.id;
	}

	getCategory() {
		return this.category;
	}

	getIntervals() {
		if (this.data.intervals) {
			return this.data.intervals;
		}

		return {};
	}

	getValue() {
		return this.value;
	}

	setValue(value) {
		this.value = parseFloat(value);
	}
}
