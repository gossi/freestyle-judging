var DIGITS = 2;
var MARKS = {
	"<25": 6,
	"<50": 5,
	"50-66": 4,
	"67-80": 3,
	"81-91": 2,
	">91": 1
};

function Sheet(root, model) {
	this.model = model;
	this.root = root;
	this.construct();
	this.updating = false;
}

Sheet.prototype = {
	updateScore: function(part) {
		var total = 0;
		var items = 0;
		for (var cat of part.getCategories()) {
			total += parseFloat(cat.getValue());
			items++;
		}

		part.setScore(Math.round(total / items * 100) / 100);
	},

	updateCategory: function(category) {
		var total = 0;
		var items = 0;
		for (var crit of category.getCriteria()) {
			total += parseFloat(crit.getValue());
			items++;
		}

		category.setValue(Math.round(total / items * 100) / 100);
	},

	updateValue: function(criterion) {
		var slider = criterion.getSliderNode();
		var input = criterion.getValueNode();

		input.value = slider.value / Math.pow(10, DIGITS);
	},

	updateSlider: function(criterion) {
		var slider = criterion.getSliderNode();
		var input = criterion.getValueNode();

		slider.value = input.value * Math.pow(10, DIGITS);
	},

	updateDescription: function(criterion) {
		var intervals = criterion.getIntervals();
		if (Object.keys(intervals).length === 0) {
			return;
		}

		var value = criterion.getValue();
		var mark = Helpers.getIntervalValue(Math.round(value * 10), MARKS);
		var desc = Helpers.getIntervalValue(value, intervals);
		var node = criterion.getDescriptionNode();

		node.innerHTML = desc;
		node.dataset.value = mark;
	},

	handleEvent: function(e) {
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
	},

	construct: function() {
		for (var cat of this.model.getCategories()) {
			cat.construct(this.root);

			for (var crit of cat.getCriteria()) {
				crit.construct(cat.getChildContainer(), this);
			}
		}
	}
};
