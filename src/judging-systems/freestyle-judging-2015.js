export var judgingSystemDescriptor = {
	label: "Freestyle Judging System 2015",
	author: "IUF",
	options: {
		digits: 3
	},
	scoring: 'average',
	parts: {
		performance: {
			scoring: 'average',
			label: "Performance",
			categories: {
				execution: {
					label: "Presence/Execution",
					scoring: 'average',
					criteria: {
						carriage: {
							label: "Carriage",
							intervals: {
								"<1": "nada",
								"<2": "very poor line of carriage",
								"<3": "poor line of carriage",
								"<4": "variable line of carriage",
								"<5": "carriage is variable",
								"<6": "average carriage with some breaks",
								"<7": "average carriage",
								"<8": "good carriage",
								"<9": "very good carriage",
								">=9": "exceptional carriage"
							}
						},
						style: {
							label: "Style"
						},
						clarity: {
							label: "Clarity"
						},
						projection: {
							label: "Projection"
						}
					}
				},
				choreography: {
					label: "Choreography/Composition",
					scoring: 'average',
					criteria: {
						purpose: {
							label: "Purpose"
						},
						proportion: {
							label: "Proportion"
						},
						space: {
							label: "Utilization of space"
						},
						coverage: {
							label: "Pattern and floor coverage"
						},
						phrasing: {
							label: "Phrasing"
						},
						originality: {
							label: "Originality"
						}
					}
				},
				music: {
					label: "Music/Timing",
					scoring: 'average',
					criteria: {
						timing: {
							label: "Timing"
						},
						character: {
							label: "Character"
						},
						interaction: {
							label: "Interaction"
						},
						realization: {
							label: "Musical Realization"
						},
						dynamics: {
							label: "Dynamics"
						}
					}
				}
			}
		}
	}
};
