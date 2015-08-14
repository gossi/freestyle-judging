import Category from "freestyle-judging/model/Category";
import calculateScore from "freestyle-judging/helpers";

export default class Part {

	constructor(system, data) {
		this.judgingSystem = system;
		this.data = data;
		this.categories = new Map();
		this.parse(data);

		this.score = 0;
	}

	parse(data) {
		for (var category in data.categories) {
			data.categories[category].id = category;
			this.categories.set(category, new Category(this, data.categories[category]));
		}
	}

	getId() {
		return this.data.id;
	}

	getLabel() {
		return this.data.label;
	}

	getJudgingSystem() {
		return this.judgingSystem;
	}

	getCategory(category) {
		if (this.categories.has(category)) {
			return this.categories.get(category);
		}
	}

	getCategories() {
		return this.categories.values();
	}

	calculateScore() {
		let scoring = this.data.scoring;
		let data = [];
		this.categories.forEach(c => data.push({
			value: c.getScore()
		}));

		this.score = calculateScore(scoring, data, this);
	}

	getScore() {
		return this.score;
	}

	setScore(score) {
		this.score = score;
	}
}
