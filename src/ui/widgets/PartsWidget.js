import CategoryWidget from "freestyle-judging/ui/widgets/CategoryWidget";

export default class PartsWidget {

	constructor(parent, model) {
		this.parent = parent;
		this.model = model;

		this.build();
	}

	build() {
		let root = this.parent.getChildContainer();
		let nav = '';
		let panes = '';

		for (let part of this.model.getParts()) {
			nav += `<li role="presentation">
				<a href="#part-${part.getId()}" aria-controls="part-${part.getId()}" role="tab" data-toggle="tab">${part.getLabel()}</a>
			</li>`;
			panes += `<div role="tabpanel" class="tab-pane" id="part-${part.getId()}"></div>`;
		}

		root.innerHTML = `<div>
			<ul class="nav nav-tabs" role="tablist">
				<li role="presentation" class="active">
					<a href="#summary" aria-controls="summary" role="tab" data-toggle="tab">Summary</a>
				</li>
				${nav}
			</ul>
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane active" id="summary">Summary</div>
				${panes}
			</div>
		</div>`;

		for (let part of this.model.getParts()) {
			for (let cat of part.getCategories()) {
				new CategoryWidget(this, cat);
			}
		}
	}
}
