import Part from "freestyle-judging/model/Part";
import {handleScoring} from "freestyle-judging/helpers";

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

		if (!'i18n' in this.data) {
			this.data.i18n = {'en': {}};
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
		let digits = this.getOption('digits');
		let scoring = this.data.scoring;
		let data = [];
		this.criteria.forEach(p => data.push({
			value: p.getScore()
		}));

		this.score = handleScoring(this, scoring, data, digits);
		return this.score;
	}

	getScore() {
		return this.score;
	}

	setScore(score) {
		this.score = score;
	}

	getI18n(label, language = 'en') {
		let getLang = (language) => {
			if (language in this.data.i18n) {
				return this.data.i18n[language];
			}
			return null;
		};

		let i = 0;
		let lang = null;
		let languages = [language, 'en'];

		do {
			lang = getLang(languages[i++]);
		} while (lang === null || i < languages.length - 1);

		if (lang == null) {
			return label;
		}

		if (label in lang) {
			return lang[label];
		}

		return label;
	}

	getLanguages() {
		return Object.keys(this.data.i18n);
	}

}
