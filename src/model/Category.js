import Criterion from "freestyle-judging/model/Criterion";
import {handleScoring} from "freestyle-judging/helpers";

export default class Category {
	constructor(part, data) {
		this.part = part;
		this.data = data;
		this.criteria = new Map();
		this.parse(data);

		this.score = 0;
	}

	parse(data) {
		for (var crit in data.criteria) {
			data.criteria[crit].id = crit;
			this.criteria.set(crit, new Criterion(this, data.criteria[crit]));
		}
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
		let digits = this.getPart().getJudgingSystem().getOption('digits');
		let scoring = this.data.scoring;
		let data = [];
		this.criteria.forEach(c => data.push({
			value: c.getValue()
		}));

		// let data = Array.from(this.criteria.values()).map(c => data.push({
		// 	value: c.getValue()
		// }));

		this.score = handleScoring(this, scoring, data, digits);
		this.part.calculateScore();
		return this.score;
	}

	getScore() {
		return this.score;
	}

	setScore(score) {
		this.score = parseFloat(score);
	}
};
