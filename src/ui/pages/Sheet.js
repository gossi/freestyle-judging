import PartWidget from "freestyle-judging/ui/widgets/PartWidget";

export default class Sheet {

	constructor(options) {
		this.model = options.model;
		this.root = options.root;
		this.build();
	}

	build() {
		let nav = '';
		let panes = '';

		for (let part of this.model.getParts()) {
			nav += `<li role="presentation">
				<a href="#part-${part.getId()}" aria-controls="part-${part.getId()}" role="tab" data-toggle="tab">${part.getLabel()}</a>
			</li>`;
			panes += `<div role="tabpanel" class="tab-pane" id="part-${part.getId()}"></div>`;
		}

		this.root.innerHTML = `<div>
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
			new PartWidget(this, part);
		}
	}
}
