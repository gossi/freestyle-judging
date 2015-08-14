import Part from "freestyle-judging/model/Part";
import calculateScore from "freestyle-judging/helpers";

export default class JudgingSystem {

	constructor(data) {
		this.data = data;
		this.parts = new Map();
		this.parse(data);

		this.score = 0;
	}

	parse(data) {
		for (let part in data.parts) {
			data.parts[part].id = part;
			this.parts.set(part, new Part(this, data.parts[part]));
		}
	}

	getName() {
		return this.data.label;
	}

	getAuthor() {
		return this.data.author;
	}

	getOption(name) {
		if (name in this.data.options) {
			return this.data.options[name];
		}

		return undefined;
	}

	getPart(part) {
		if (this.parts.has(part)) {
			return this.parts.get(part);
		}
	}

	getParts() {
		return this.parts.values();
	}

	calculateScore() {
		let scoring = this.data.scoring;
		let data = [];
		this.parts.forEach(p => data.push({
			value: p.getScore()
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
