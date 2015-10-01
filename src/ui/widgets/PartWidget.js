import CategoryWidget from "freestyle-judging/ui/widgets/CategoryWidget";

export default class PartWidget {

	constructor(parent, model) {
		this.parent = parent;
		this.model = model;

		this.build();
	}

	build() {
		let parent = document.getElementById('part-' + this.model.getId());

		parent.innerHTML = `
			<div class="part-score col-xs-12">Score: <span id="part-${this.model.getId()}-score" class="text-success"></span></div>
			<div id="part-${this.model.getId()}-categories" class="row">
			</div>
		`;

		this.scoreNode = document.getElementById('part-' + this.model.getId() + '-score');

		for (let cat of this.model.getCategories()) {
			new CategoryWidget(this, cat);
		}
	}

	updateScore() {
		this.scoreNode.innerHTML = this.model.getScore();
	}

	getSheet() {
		return this.parent;
	}
}
