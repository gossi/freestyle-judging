export var judgingSystemDescriptor = {
	label: "Freestyle Judging System 2015",
	author: "IUF",
	options: {
		digits: 2,
		colors: {
			"<25": '#660000',
			"<50": '#DD3A00',
			"<70": '#FF8000',
			"<80": '#FFD700',
			"<90": '#00B2DD',
			">=90": '#00B800'
		}
	},
	scoring: 'average',
	parts: {
		performance: {
			scoring: 'sum',
			label: "performance",
			categories: {
				execution: {
					label: "presence-execution",
					scoring: 'average',
					criteria: {
						presence: {
							label: "presence",
							intervals: {
								">=9": "9-presence",
								">=8": "8-presence",
								">=7": "7-presence",
								">=6": "6-presence",
								">=4": "4-presence",
								">=2": "2-presence",
								">=1": "1-presence",
								">=0": "0-presence"
							}
						},
						carriage: {
							label: "carriage",
							intervals: {
								">=9": "9-carriage",
								"<9": "8-carriage",
								"<8": "7-carriage",
								"<7": "6-carriage",
								"<6": "5-carriage",
								"<5": "4-carriage",
								"<4": "3-carriage",
								"<3": "2-carriage",
								"<2": "1-carriage",
								"<1": "0-carriage"
							}
						},
						style: {
							label: "authenticity",
							intervals: {
								">=9": "9-authenticity",
								">=8": "8-authenticity",
								">=7": "7-authenticity",
								">=6": "6-authenticity",
								">=4": "4-authenticity",
								">=2": "2-authenticity",
								">=1": "1-authenticity",
								">=0": "0-authenticity"
							}
						},
						clarity: {
							label: "clarity",
							intervals: {
								">=9": "9-clarity",
								">=6": "6-clarity",
								">=3": "3-clarity",
								">=1": "1-clarity",
								">=0": "0-clarity"
							}
						},
						variety: {
							label: "variety",
							intervals: {
								">=9": "9-variety",
								">=6": "6-variety",
								">=4": "4-variety",
								">=2": "2-variety",
								">=1": "1-variety",
								">=0": "0-variety"
							}
						},
						projection: {
							label: "projection",
							intervals: {
								"<1": "0-projection",
								"<2": "1-projection",
								"<3": "2-projection",
								"<4": "3-projection",
								"<5": "4-projection",
								"<6": "5-projection",
								"<7": "6-projection",
								"<8": "7-projection",
								"<9": "8-projection",
								">=9": "9-projection"
							}
						}
					}
				},
				choreography: {
					label: "choreography",
					scoring: 'average',
					criteria: {
						purpose: {
							label: "purpose",
							intervals: {
								">=9": "9-purpose",
								">=8": "8-purpose",
								">=7": "7-purpose",
								">=6": "6-purpose",
								">=5": "5-purpose",
								">=4": "4-purpose",
								">=3": "3-purpose",
								">=2": "2-purpose",
								">=1": "1-purpose",
								">=0": "0-purpose"
							}
						},
						harmony: {
							label: "harmony",
							intervals: {
								">=9": "9-harmony",
								">=7": "7-harmony",
								">=5": "5-harmony",
								">=3": "3-harmony",
								">=1": "1-harmony",
								">=0": "0-harmony",
							}
						},
						utilization: {
							label: "utilization",
							intervals: {
								">=9": "9-utilization",
								">=8": "8-utilization",
								">=7": "7-utilization",
								">=6": "6-utilization",
								">=5": "5-utilization",
								">=2": "2-utilization",
								">=0": "0-utilization"
							}
						},
						dynamics: {
							label: "dynamics",
							intervals: {
								">=9": "9-dynamics",
								">=8": "8-dynamics",
								">=7": "7-dynamics",
								">=6": "6-dynamics",
								">=3": "3-dynamics",
								">=1": "1-dynamics",
								">=0": "0-dynamics"
							}
						},
						imaginativeness: {
							label: "imaginativeness",
							intervals: {
								">=9": "9-imaginativeness",
								">=7": "7-imaginativeness",
								">=6": "6-imaginativeness",
								">=5": "5-imaginativeness",
								">=3": "3-imaginativeness",
								">=1": "1-imaginativeness",
								">=0": "0-imaginativeness"
							}
						}
					}
				},
				music: {
					label: "music",
					scoring: 'average',
					criteria: {
						realization: {
							label: "continuity_musical-realization",
							intervals: {
								">=8": "8-realization",
								">=6": "6-realization",
								">=0": "0-realization"
							}
						},
						Expression: {
							label: "expression",
							intervals: {
								">=5": "5-expression",
								">=0": "0-expression"
							}
						},
						finesse: {
							label: "finesse",
							intervals: {
								">=5": "5-finesse",
								">=0": "0-finesse"
							}
						},
						timing: {
							label: "timing",
							intervals: {
								">=5": "5-timing",
								">=0": "0-timing"
							}
						}
					}
				}
			}
		}
	},
	i18n: {
		"en": {
			"performance": "Performance",
			"presence-execution": "Presence / Execution",

			"presence": "Presence",
			"9-presence": "spellbinding presence",
			"8-presence": "very good emotional, intellectual, and physical involvement",
			"7-presence": "good engagement",
			"6-presence": "above average engagement",
			"4-presence": "average involvement or involvement in one or two ways",
			"2-presence": "occasional presence shown, eyes often downcast",
			"1-presence": "very poor presence, rider shrinks from the performance",
			"0-presence": "no precense at all",

			"carriage": "Carriage",
			"9-carriage": "refined line of body and limbs",
			"8-carriage": "very good carriage and lines",
			"7-carriage": "good carriage/lines",
			"6-carriage": "above average line of body and limbs and good carriage",
			"5-carriage": "average carriage/lines with some breaks",
			"4-carriage": "reasonable line of body and limbs",
			"3-carriage": "variable line of body and limbs/carriage/extensions",
			"2-carriage": "poor line of body and limbs/carriage/extensions",
			"1-carriage": "very poor line of body and limbs/carriage/extensions",
			"0-carriage": "extremely poor line of body and limbs/carriage/extensions",

			"authenticity": "Authenticity",
			"9-authenticity": "superb authenticity, rider is completely one with their character",
			"8-authenticity": "very good authenticity",
			"7-authenticity": "good authenticity",
			"6-authenticity": "above average authenticity, the rider is in character for the majority of the routine",
			"4-authenticity": "average authenticity, there are moments when the rider is out of character",
			"2-authenticity": "the rider is occasionally in character",
			"1-authenticity": "very poor authenticity, the rider is almost never in character",
			"0-authenticity": "extremely poor authenticity, the rider is never in character",

			"clarity": "Clarity",
			"9-clarity": "precise execution of body movements in a way that fit the overall routine",
			"6-clarity": "almost all movements are precise and intentional",
			"3-clarity": "average clarity, some movements look precise while others look unintentional",
			"1-clarity": "very poor clarity, few to no moves look intentional",
			"0-clarity": "movements don’t look intentional at all",

			"variety": "Variety",
			"9-variety": "excellent creativity with dispositions and expressions to express overall routine",
			"6-variety": "rider uses a variety of dispositions and expressions in a way that engages the audience",
			"4-variety": "average level of creativity with disposition and expression",
			"2-variety": "some variety with expression and disposition but rider often looks the same throughout the routine",
			"1-variety": "little variety with dispositionand expression to fit the routine",
			"0-variety": "the expression or disposition remains the same the whole time",

			"projection": "Projection",
			"9-projection": "exceptional projection",
			"8-projection": "strong projection",
			"7-projection": "projection most of the time",
			"6-projection": "able to project about 75% of time",
			"5-projection": "projection skills vary throughout routine",
			"4-projection": "projection only about 50% of time",
			"3-projection": "occasional projection",
			"2-projection": "limited projection skills, cautious",
			"1-projection": "very limited projection skills",
			"0-projection": "projection skills lacking, labored",

			"choreography": "Composition / Choreography",

			"purpose": "Purpose",
			"9-purpose": "memorable moments distributed evenly throughout the routine to create a unified piece",
			"8-purpose": "variety of innovative moves that develop concept",
			"7-purpose": "interesting moves derived from concept",
			"6-purpose": "some interesting creative moves that use rhythm(s) effectively",
			"5-purpose": "variable moves often related to concept",
			"4-purpose": "routine correspondents well with concept",
			"3-purpose": "some isolated groups of moves that fit concept",
			"2-purpose": "some moves do not appear to fit concept",
			"1-purpose": "many moves do not appear to fit concept",
			"0-purpose": "most to none moves do not appear to fit concept",

			"harmony": "Harmony",
			"9-harmony": "choreography gives the feeling of a completely unified dance, all parts of the performance create a balanced routine",
			"7-harmony": "choreography gives the feeling of a mostly unified dance",
			"5-harmony": "interesting composition that creates a routine that feels unified most of the time",
			"3-harmony": "choreography gives the feeling of a halfway unified dance",
			"1-harmony": "placement of moves lacks coherence",
			"0-harmony": "choreography does not give the feeling of a unified dance at all",

			"utilization": "Utilization",
			"9-utilization": "Rider does an excellent job of using the whole space with movements that flow in various directions and patterns",
			"8-utilization": "excellent use of space",
			"7-utilization": "good use of space",
			"6-utilization": "above average use of space",
			"5-utilization": "average use of performance space, limited variety of patterns/directions of riding",
			"2-utilization": "elements generally well distributed but sometimes too much emphasis to one part of the performance space",
			"0-utilization": "poor variety of placement of moves in the performance space",

			"dynamics": "Dynamics",
			"9-dynamics": "change of tempo incorporated seamlessly",
			"8-dynamics": "change of tempo incorporated with ease",
			"7-dynamics": "unity of rider(s) in use of tempo",
			"6-dynamics": "above average variation of tempo",
			"3-dynamics": "variable changes in tempo",
			"1-dynamics": "few changes in tempo",
			"0-dynamics": "tempo does not change throughout routine",

			"imaginativeness": "Imaginativeness",
			"9-imaginativeness": "completely imaginative concept that creates a routine unlike something that has been done before",
			"7-imaginativeness": "great creativity in the creation of the routine",
			"6-imaginativeness": "above average amount of creativity and imagination used when creating routine",
			"5-imaginativeness": "average amount of creativity and imagination used when creating routine",
			"3-imaginativeness": "some creativity and imagination used when creating this routine",
			"1-imaginativeness": "a small amount of creativity and imagination was used to create this routine",
			"0-imaginativeness": "no creativity at all, similar routines have been done many times before",

			"music": "Music / Timing",

			"continuity_musical-realization": "Continuity & Musical Realization",
			"8-realization": "Proper type of musical realization is used the entire routine with effortless continuity",
			"6-realization": "Above average use of the proper musical realization for the majority of the routine",
			"0-realization": "Rider never uses the proper type of musical realization, the routine could be done without any music and it would have looked the same",

			"expression": "Expression",
			"5-expression": "rider/music/nuances as one motivation from “heart”",
			"0-expression": "The routine seems disjointed and the music/nuances/rider seem completely disconnected",

			"finesse": "Finesse",
			"5-finesse": "Rider superbly and expertly uses the nuances of the music to reflect the overall concept of the routine",
			"0-finesse": "Rider never looks deeper into the music to utilize the nuances, routine has a monotone feeling",

			"timing": "Timing",
			"5-timing": "The rider expertly uses their movements to create meaningful moments which, when put all together, produce a cohesive, well-timed routine",
			"0-timing": "Movements seem unplanned and are placed in a way that leads to a lack of timing whatsoever",
		},
		"de": {
			"performance": "Performance",
			"presence-execution": "Präsenz / Bewegungsausführung",

			"presence": "Präsenz",
			"9-presence": "Faszinierende Präsenz",
			"8-presence": "Ziemlich gute emotionale, intellektuelle und physische Präsenz",
			"7-presence": "Gutes Engagement",
			"6-presence": "Engagement etwas über dem Durchschnitt",
			"4-presence": "Durchschnittliches Wirken/Auftreten (?)",
			"2-presence": "Gelegentliches andeuten von Präsenz; Augen schauen auf den Boden",
			"1-presence": "Sehr dürftige Präsenz, Die Performance wächst dem Fahrer über den Kopf",
			"0-presence": "Keine Präsenz vorhanden",

			"carriage": "Körperhaltung",
			"9-carriage": "Exzellente, Haltung von Körper und Extremitäten, mit sichtbarer, aber angemessener Körperspannung und Muskeltonus",
			"8-carriage": "Sehr gute  Körperhaltung, mit sichtbarer, aber angemessener Körperspannung und Muskeltonus",
			"7-carriage": "Gute Körperhaltung mit sichtbarer Körperspannung",
			"6-carriage": "Körperspannung in Körper und Extremitäten gerade sichtbar",
			"5-carriage": "Körperspannung gerade noch sichtbar, aber mit Unterbrechungen",
			"4-carriage": "Angemessene Körperhaltung, Körperspannung erahnbar",
			"3-carriage": "Körperhaltung schwankende, Körperspannung nicht sichtbar",
			"2-carriage": "Dürftige Körperhaltung und Körperspannung nicht sichtbar",
			"1-carriage": "Sehr dürftige Körperhaltung und  Körperspannung nicht sichtbar",
			"0-carriage": "Extrem dürftige Körperhaltung",

			"authenticity": "Authentizität",
			"9-authenticity": "Fantastische Authentizität. Der Fahrer ist eins mit seiner Rolle",
			"8-authenticity": "Sehr gute Authentizität",
			"7-authenticity": "Gute Authentizität",
			"6-authenticity": "Authentizität etwas über dem Durchschnitt; Der Fahrer spielt zum Großteil seine Rolle",
			"4-authenticity": "Durchschnittliche Authentizität; Es gibt Momente da ist der Fahrer nicht in seiner Rolle",
			"2-authenticity": "Der Fahrer ist gelegentlich in seiner Rolle",
			"1-authenticity": "Sehr dürftige Authentizität; der Fahrer ist fast nie in seiner Rolle",
			"0-authenticity": "Extrem dürftige Rolle, der Fahrer ist nie in seiner Rolle",

			"clarity": "Klarheit",
			"9-clarity": "Präzise und klare Bewegungsausführung",
			"6-clarity": "Nahezu alle Bewegungen werden präzise und absichtlich ausgeführt",
			"3-clarity": "Durchschnittliche Klarheit; einige Bewegungen sind präzise andere sind unabsichtlich",
			"1-clarity": "Sehr wenige klare Bewegungen; viele Bewegungen sind unabsichtlich",
			"0-clarity": "Keine Bewegung geschieht mit Absicht",

			"variety": "Stimmung",
			"9-variety": "Exzellente Kreativität der Attitüde und Ausdruck während der Kür",
			"6-variety": "Der Fahrer verwendet eine große Varietät an Attitüden und Ausdrücken um das Publikum ansprechen",
			"4-variety": "Durchschnittliches Level an Kreativität, Attitüden und Ausdruck",
			"2-variety": "Ein bisschen Varietät, Ausdruck und Attitüden aber eigentlich hat der Fahrer während der Kür immer den gleichen Ausdruck",
			"1-variety": "Wenig Varietät aber der Ausdruck passt zur Kür",
			"0-variety": "Konstanter Ausdruck  während der gesamten Kür",

			"projection": "Körpersprache",
			"9-projection": "Exzellente Kommunikation, das Publikum fühlt sich zur Kür hingezogen",
			"8-projection": "Sehr überzeugende Kommunikation",
			"7-projection": "Die Kür wird größtenteils kommuniziert",
			"6-projection": "Etwa 75% der Zeit wird die Kür kommuniziert",
			"5-projection": "Die Kommunikation variiert während der Kür",
			"4-projection": "Kommunikation bei etwa 50%",
			"3-projection": "Gelegentliche Kommunikation",
			"2-projection": "Beeinträchtige kommunikative Fähigkeiten, zurückhaltend",
			"1-projection": "Sehr beeinträchtige kommunikative Fähigkeiten",
			"0-projection": "Mühsam und erzwungene Kommunikation",

			"choreography": "Komposition / Choreographie",

			"purpose": "Zweck",
			"9-purpose": "Einprägsame Moment gleichmäßig über die Kür verteilt, die eine vereinheitliche Kür ergeben",
			"8-purpose": "Varietät an innovativen Bewegungen die das Konzept ausmachen",
			"7-purpose": "Interessante Bewegungen, die sich aus dem Konzept ableiten lassen",
			"6-purpose": "Einige interessante und kreative Bewegungen, die den Rhythmus gut ausnutzen",
			"5-purpose": "Unterschiedliche Bewegungen in Bezug zum Konzept",
			"4-purpose": "Kür entspricht dem Konzept",
			"3-purpose": "Einige isoliert gruppierte Bewegungen die in das Konzept passen",
			"2-purpose": "Einige Bewegungen passen nicht zum Konzept",
			"1-purpose": "Viele Bewegungen passen nicht zum Konzept",
			"0-purpose": "Die meisten bis garkeine Bewegungen passen in das Konzept",

			"harmony": "Harmonie",
			"9-harmony": "Die Choreographie erweckt das Gefühl eines komplett vereinheitlichten Tanzes, bei dem alle Teile ausbalanciert sind",
			"7-harmony": "Die Choreographie erweckt größtenteils das Gefühl eines vereinheitlichten Tanzes",
			"5-harmony": "Ein Großteil der Choreographie erweckt das Gefühl eines einheitlichen Tanzes",
			"3-harmony": "Die Choreographie erweckt Gefühl eines zur Hälfte vereinheitlichten Tanzes",
			"1-harmony": "Die Platzierungen der Bewegungen sind zusammenhaltslos",
			"0-harmony": "Die Choreographie erweckt unter keinen Umständen das Gefühl eines vereinheitlichten Tanzes",

			"utilization": "Fahrwege",
			"9-utilization": "Der Fahrer nutzt die gesamte Fläche exzellent aus, um Bewegungen in unterschiedlichen Richtungen und Mustern fließen zu lassen",
			"8-utilization": "Exzellente Ausnutzung der Fahrfläche",
			"7-utilization": "Gute Ausnutzung der Fahrfläche",
			"6-utilization": "Ausnutzung der Fahrfläche etwas über dem Durchschnitt",
			"5-utilization": "Durchschnittliche Ausnutzung der Fahrfläche, wenig unterschiedliche Fahrrichtungen oder Muster",
			"2-utilization": "Die Elemente sind zwar gut auf der Fahrfläche untergebracht, aber manchmal bleibt der Fahrer zu lange an einem Ort",
			"0-utilization": "Wenig unterschiedliche Fahrwege",

			"dynamics": "Dynamik",
			"9-dynamics": "Tempowechsel sind nahtlos und absichtlich",
			"8-dynamics": "Tempowechsel geschehen mit Leichtigkeit und absichtlich",
			"7-dynamics": "Fahrer und Tempo(wechsel) harmonieren gut miteinander",
			"6-dynamics": "Tempowechsel liegen über dem Durchschnitt",
			"3-dynamics": "Tempowechsel sind variabel",
			"1-dynamics": "Wenige Tempowechsel",
			"0-dynamics": "Kein Tempowechsel. Das Tempo ist durchweg konstant",

			"imaginativeness": "Einfallsreichtum",
			"9-imaginativeness": "Vollkommenes einfallsreiches Konzept und Bewegungen die zu einer Kür führen, die es noch nie gab",
			"7-imaginativeness": "Große Kreativität wurde bei der Erstellung der Kür, mitsamt Bewegungen, bewiesen",
			"6-imaginativeness": "Kreativitätslevel und Einfallsreichtum beim Erstellen der Kür liegen über dem Durchschnitt",
			"5-imaginativeness": "Durchschnittlicher Kreativitätslevel und Einfallsreichtum beim Erstellen",
			"3-imaginativeness": "Etwas Kreativität und Einfallsreichtum ist bei der Erstellung der Kür erkennbar",
			"1-imaginativeness": "Wenig Kreativität und Einfallsreichtum ist bei der Erstellung der Kür erkennbar",
			"0-imaginativeness": "Keine Kreativität erkennbar, ähnliche Küren wurden schon mehrere Male davor gezeigt",

			"music": "Musik / Timing",

			"continuity_musical-realization": "Kontinuität & Musikalische Umsetzung",
			"8-realization": "Geeignete musikalische Umsetzung wird kontinuierlich während der gesamten Kür genutzt",
			"6-realization": "Die genutzte musikalische Umsetzung ist etwas über Durchschnitt aber zu großen Teilen der Musik gegenwärtig",
			"0-realization": "Der Fahrer nutzt nie eine geeignete musikalische Umsetzung, die Kür sähe auch ohne ohne Musik gleich aus",

			"expression": "Expression",
			"5-expression": "Fahrer, Musik und Nuancen kommen von „Herzen“",
			"0-expression": "Die Kür sieht zerstückelt aus und Fahrer, Musik und Nuancen sind nicht miteinander verbunden",

			"finesse": "Finesse",
			"5-finesse": "Der Fahrer verwandelt die Nuancen der Musik meisterhaft und ausgezeichnet und pflegt sie in das Gesamtkonzept der Kür ein",
			"0-finesse": "Der Fahrer missachtet die Nuancen der Musik; die Kür ist monoton",

			"timing": "Timing",
			"5-timing": "Der Fahrer kreiert meisterhaft ausdrucksstarke Momente durch Bewegungen, die zusammengesetzt eine bindende, wohl-abgestimmte Kür ergeben",
			"0-timing": "Die Bewegungen sind ungeplant und ihre Anordnung ist in Bezug auf das Timing mangelhaft",
		}
	}
};
