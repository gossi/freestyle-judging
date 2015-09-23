import {getMaxValue, getIntervalValue} from "freestyle-judging/helpers";

export default class CriterionWidget {

	constructor(parent, model) {
		this.parent = parent;
		this.model = model;
		this.updating = false;
		this.valueNode = null;
		this.sliderNode = null;

		this.build();
	}

	build() {
		// construct
		let max = getMaxValue(this.model.getCategory().getPart().getJudgingSystem());
		let row = document.createElement('div');
		row.id = `crit-${this.model.getId()}-row`;
		row.className = 'criterion col-xs-12';
		row.innerHTML = `
			<div class="row"><label class="col-xs-4" data-i18n="${this.model.getLabel()}">${this.getSheet().translate(this.model.getLabel())}</label>
			<span class="col-xs-5"><input type="range" value="0" min="0" max="${max}" id="crit-${this.model.getId()}-slider"></span>
			<input class="col-xs-2 form-control input-sm sheet-value" type="number" id="crit-${this.model.getId()}-value" value="0" min="0" max="10" step="0.25"></div>
			<div class="description text-right small" id="crit-${this.model.getId()}-description"></div>
		`;

		this.parent.getRootNode().appendChild(row);

		// get nodes
		this.sliderNode = document.getElementById('crit-' + this.model.getId() + '-slider');
		this.valueNode = document.getElementById('crit-' + this.model.getId() + '-value');
		this.descriptionNode = document.getElementById('crit-' + this.model.getId() + '-description');

		// register event handlers
		window.setTimeout(() => {
			this.sliderNode.addEventListener('input', this, false);
			this.valueNode.addEventListener('input', this, false);
		}, 10);
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

			this.model.setValue(this.valueNode.value);

			// update category
			this.updateDescription();
			this.parent.updateScore();

			this.updating = false;
		}
	}

	getDigits() {
		return this.model.getCategory().getPart().getJudgingSystem().getOption('digits');
	}

	updateValue() {
		this.valueNode.value = this.sliderNode.value / Math.pow(10, this.getDigits());
	}

	updateSlider() {
		this.sliderNode.value = this.valueNode.value * Math.pow(10, this.getDigits());
	}

	updateDescription() {
		let intervals = this.model.getIntervals();
		if (Object.keys(intervals).length === 0) {
			return;
		}

		let value = this.model.getValue();
		let desc = getIntervalValue(value, intervals);

		if (typeof(desc) == 'undefined') {
			this.descriptionNode.innerHTML = '';
			delete this.descriptionNode.dataset.i18n;
		} else {
			this.descriptionNode.innerHTML = this.getSheet().translate(desc);
			this.descriptionNode.dataset.i18n = desc;
		}

		let colors = this.model.getCategory().getPart().getJudgingSystem().getOption('colors');
		if (colors != undefined) {
			let color = getIntervalValue(Math.round(value * 10), colors);
			this.descriptionNode.style.color = color;
		}

	}

	getSheet() {
		return this.parent.getSheet();
	}
}
