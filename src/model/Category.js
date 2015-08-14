import Criterion from "freestyle-judging/model/Criterion";
import calculateScore from "freestyle-judging/helpers";

export default class Category {
	constructor(part, data) {
		this.part = part;
		this.data = data;
		this.criteria = new Map();
		this.parse(data);

		this.score = 0;

		// nodes
		this.rootNode;
		this.labelNode;
		this.valueNode;
		this.sliderNode;
	}

	parse(data) {
		for (var crit in data.criteria) {
			data.criteria[crit].id = crit;
			this.criteria.set(crit, new Criterion(this, data.criteria[crit]));
		}
	}

	construct(parent) {
		var fieldset = document.createElement('fieldset');
		fieldset.className = 'col-xs-4';
		fieldset.innerHTML = '<legend id="' + this.getId() + '-label">' + this.getLabel() + '</legend>';
		fieldset.innerHTML += '<input type="range" readonly min="0" max="' + Helpers.getMaxRangeValue() + '" value="0" id="' + this.getId() + '-slider">';
		fieldset.innerHTML += '<input class="form-control input-sm sheet-value category-value" type="number" readonly id="' + this.getId() + '-value" value="0" min="0" max="10"><p>&nbsp;</p>';
		parent.appendChild(fieldset);


		this.rootNode = fieldset;
		this.labelNode = document.getElementById(this.getId() + '-label');
		this.valueNode = document.getElementById(this.getId() + '-value');
		this.sliderNode = document.getElementById(this.getId() + '-slider');
	}

	getChildContainer() {
		return this.rootNode;
	}

	getId() {
		return this.data.id;
	}

	getLabel() {
		return this.data.label;
	}

	getPart() {
		return this.part;
	}

	getCriteria() {
		return this.criteria.values();
	}

	getCriterion(criteria) {
		if (this.criteria.has(criteria)) {
			return this.criteria.get(criteria);
		}
	}

	calculateScore() {
		let scoring = this.data.scoring;
		let data = [];
		this.parts.forEach(c => data.push({
			value: c.getValue()
		}));

		this.score = calculateScore(scoring, data, this);
	}

	getScore() {
		return this.score;
	}

	setScore(score) {
		this.score = score;
	}
};
