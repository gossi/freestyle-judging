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

	construct(parent, sheet) {
		// construct
		var row = document.createElement('div');
		row.id = this.getId() + '-row';
		row.className = 'criterion col-xs-12';
		row.innerHTML += '<div class="row"><label class="col-xs-4">' + this.getLabel() + '</label>' +
			'<input class="col-xs-4 col-xs-offset-1" type="range" value="0" min="0" max="' + Helpers.getMaxRangeValue() + '" id="' + this.getId() + '-slider" data-sheet="criterion">' +
			'<input class="col-xs-2 form-control input-sm sheet-value" type="number" id="' + this.getId() + '-value" value="0" min="0" max="10" step="0.25" data-sheet="criterion"></div>' +
			'<div class="description text-right small" id="' + this.getId() + '-description"></div>';

		parent.appendChild(row);

		// get nodes
		this.sliderNode = document.getElementById(this.getId() + '-slider');
		this.sliderNode.model = this;
		this.valueNode = document.getElementById(this.getId() + '-value');
		this.valueNode.model = this;
		this.descriptionNode = document.getElementById(this.getId() + '-description');

		// register event handlers
		this.sliderNode.addEventListener('input', sheet, false);
		this.valueNode.addEventListener('input', sheet, false);
	}

	getValue() {
		return this.value;
	}

	setValue(value) {
		this.value = value;
	}
}
