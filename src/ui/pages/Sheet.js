import PartsWidget from "freestyle-judging/ui/widgets/PartsWidget";

export default class Sheet {

	constructor(options) {
		this.model = options.model;
		this.root = options.root;
		this.build();
		this.partsWidget;
		this.updating = false;
	}

	// updateScore(part) {
	// 	var total = 0;
	// 	var items = 0;
	// 	for (var cat of part.getCategories()) {
	// 		total += parseFloat(cat.getValue());
	// 		items++;
	// 	}
	//
	// 	part.setScore(Math.round(total / items * 100) / 100);
	// }
	//
	// updateCategory(category) {
	// 	var total = 0;
	// 	var items = 0;
	// 	for (var crit of category.getCriteria()) {
	// 		total += parseFloat(crit.getValue());
	// 		items++;
	// 	}
	//
	// 	category.setValue(Math.round(total / items * 100) / 100);
	// }
	//
	// updateValue(criterion) {
	// 	var slider = criterion.getSliderNode();
	// 	var input = criterion.getValueNode();
	//
	// 	input.value = slider.value / Math.pow(10, DIGITS);
	// }
	//
	// updateSlider(criterion) {
	// 	var slider = criterion.getSliderNode();
	// 	var input = criterion.getValueNode();
	//
	// 	slider.value = input.value * Math.pow(10, DIGITS);
	// }

	// updateDescription(criterion) {
	// 	var intervals = criterion.getIntervals();
	// 	if (Object.keys(intervals).length === 0) {
	// 		return;
	// 	}
	//
	// 	var value = criterion.getValue();
	// 	var mark = Helpers.getIntervalValue(Math.round(value * 10), MARKS);
	// 	var desc = Helpers.getIntervalValue(value, intervals);
	// 	var node = criterion.getDescriptionNode();
	//
	// 	node.innerHTML = desc;
	// 	node.dataset.value = mark;
	// }

	handleEvent(e) {
		if (!this.updating && 'sheet' in e.target.dataset && e.target.dataset.sheet == 'criterion') {
			this.updating = true;

			// update value field
			if (e.target.type == 'range') {
				this.updateValue(e.target.model);
			}

			// update slider
			else if (e.target.type == 'number') {
				this.updateSlider(e.target.model);
			}

			// update category
			this.updateDescription(e.target.model);
			this.updateCategory(e.target.model.getCategory());
			this.updateScore(e.target.model.getCategory().getPart());

			this.updating = false;
		}
	}

	getChildContainer() {
		return this.root;
	}

	build() {
		this.partsWidget = new PartsWidget(this, this.model);
	}
}
