import CriterionWidget from "freestyle-judging/ui/widgets/CriterionWidget";
import {getMaxValue} from "freestyle-judging/helpers";

export default class CategoryWidget {

	constructor(parent, model) {
		this.parent = parent;
		this.model = model;
		this.updating = false;

		this.build();
	}

	build() {
		let root = document.getElementById('part-' + this.model.getPart().getId() + '-categories');

		let max = getMaxValue(this.model.getPart().getJudgingSystem());
		let fieldset = document.createElement('fieldset');
		fieldset.id = `cat-${this.model.getId()}`;
		fieldset.className = "col-xs-4";
		fieldset.innerHTML = `
			<legend id="cat-${this.model.getId()}-label" data-i18n="${this.model.getLabel()}">${this.getSheet().translate(this.model.getLabel())}</legend>
			<input type="range" min="0" max="${max}" value="0" id="cat-${this.model.getId()}-slider">
			<input class="form-control input-sm sheet-value category-score" type="number" id="cat-${this.model.getId()}-score" value="0" min="0" max="10">
			<p>&nbsp;</p>
		`;
		root.appendChild(fieldset);

		this.rootNode = document.getElementById('cat-' + this.model.getId());
		this.labelNode = document.getElementById('cat-' + this.model.getId() + '-label');
		this.valueNode = document.getElementById('cat-' + this.model.getId() + '-score');
		this.sliderNode = document.getElementById('cat-' + this.model.getId() + '-slider');

		for (let crit of this.model.getCriteria()) {
			new CriterionWidget(this, crit);
		}

		// register event handlers
		window.setTimeout(() => {
			this.sliderNode.addEventListener('input', this, false);
			this.valueNode.addEventListener('input', this, false);
		}, 10);
	}

	getSheet() {
		return this.parent.getSheet();
	}

	getRootNode() {
		return this.rootNode;
	}

	handleEvent(e) {
		if (!this.updating) {
			this.updating = true;

			// update value field
			if (e.target.type == 'range') {
				this.updateValue();
			}

			// update slider
			else if (e.target.type == 'number') {
				let val = parseInt(this.valueNode.value);
				let max = parseInt(this.valueNode.max);

				if (val > max) {
					this.valueNode.value = this.valueNode.max;
				}
				this.updateSlider();
			}

			// update score
			this.model.setScore(this.valueNode.value);
			this.parent.updateScore();

			this.updating = false;
		}
	}

	updateValue() {
		this.valueNode.value = this.sliderNode.value / Math.pow(10, this.getDigits());
	}

	updateSlider() {
		this.sliderNode.value = this.valueNode.value * Math.pow(10, this.getDigits());
	}

	getDigits() {
		return this.model.getPart().getJudgingSystem().getOption('digits');
	}

	updateScore() {
		let score = this.model.calculateScore();
		let digits = this.getDigits();

		this.valueNode.value = score;
		this.sliderNode.value = score * Math.pow(10, digits);
		this.parent.updateScore();
	}
}
