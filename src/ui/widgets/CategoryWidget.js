import {getMaxValue} from "freestyle-judging/helpers";

export default class CategoryWidget {

	constructor(parent, model) {
		this.parent = parent;
		this.model = model;

		this.build();
	}

	build() {
		let root = document.getElementById('part-' + this.model.getPart().getId());

		// fieldset.innerHTML += '<input type="range" readonly min="0" max="' + Helpers.getMaxRangeValue() + '" value="0" id="' + this.getId() + '-slider">';
		let max = getMaxValue(this.model.getPart().getJudgingSystem());
		root.innerHTML += `<fieldset class="col-xs-4" id="cat-${this.model.getId()}">
			<legend id="cat-${this.model.getId()}-label">${this.model.getLabel()}</legend>
			<input type="range" readonly min="0" max="${max}" value="0" id="cat-${this.model.getId()}-slider">
			<input class="form-control input-sm sheet-value category-value" type="number" readonly id="cat-${this.model.getId()}-value" value="0" min="0" max="10">
			<p>&nbsp;</p>
		</fieldset>`;

		this.rootNode = document.getElementById('cat-' + this.model.getId());
		this.labelNode = document.getElementById('cat-' + this.model.getId() + '-label');
		this.scoreNode = document.getElementById('cat-' + this.model.getId() + '-score');
		this.sliderNode = document.getElementById('cat-' + this.model.getId() + '-slider');

		
	}
}
