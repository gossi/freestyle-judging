import CriterionWidget from "freestyle-judging/ui/widgets/CriterionWidget";
import {getMaxValue} from "freestyle-judging/helpers";

export default class CategoryWidget {

	constructor(parent, model) {
		this.parent = parent;
		this.model = model;

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
			<input type="range" readonly min="0" max="${max}" value="0" id="cat-${this.model.getId()}-slider">
			<input class="form-control input-sm sheet-value category-score" type="number" readonly id="cat-${this.model.getId()}-score" value="0" min="0" max="10">
			<p>&nbsp;</p>
		`;
		root.appendChild(fieldset);

		this.rootNode = document.getElementById('cat-' + this.model.getId());
		this.labelNode = document.getElementById('cat-' + this.model.getId() + '-label');
		this.scoreNode = document.getElementById('cat-' + this.model.getId() + '-score');
		this.sliderNode = document.getElementById('cat-' + this.model.getId() + '-slider');

		for (let crit of this.model.getCriteria()) {
			new CriterionWidget(this, crit);
		}
	}

	getSheet() {
		return this.parent.getSheet();
	}

	getRootNode() {
		return this.rootNode;
	}

	updateScore() {
		let score = this.model.calculateScore();
		let digits = this.model.getPart().getJudgingSystem().getOption('digits');

		this.scoreNode.value = score;
		this.sliderNode.value = score * Math.pow(10, digits);
		this.parent.updateScore();
	}
}
