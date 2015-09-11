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
		let languages = '';

		for (let part of this.model.getParts()) {
			nav += `<li role="presentation">
				<a href="#part-${part.getId()}" aria-controls="part-${part.getId()}" role="tab" data-toggle="tab" data-i18n="${part.getLabel()}">${this.translate(part.getLabel())}</a>
			</li>`;
			panes += `<div role="tabpanel" class="tab-pane" id="part-${part.getId()}"></div>`;
		}

		for (let language of this.model.getLanguages()) {
			languages += `<option value="${language}">${language}</option>`;
		}

		this.root.innerHTML = `<div>
			<p class="pull-right">Language: <select id="language">${languages}</select></p>
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

		this.language = document.getElementById('language');
		this.language.addEventListener('change', (e) => {
			this.changeLanguage(e);
		}, false);
	}

	changeLanguage(e) {
		let elems = document.querySelectorAll('*[data-i18n]');
		for (let elem of elems) {
			elem.textContent = this.translate(elem.dataset.i18n);
		}
	}

	getLanguage() {
		if (typeof(this.language) == 'undefined') {
			return 'en';
		}
		return this.language.value;
	}

	translate(label) {
		return this.model.getI18n(label, this.getLanguage());
	}
}
