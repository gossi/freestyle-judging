define('freestyle-judging/helpers', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.average = average;
	exports.sum = sum;
	exports.handleScoring = handleScoring;
	exports.getMaxValue = getMaxValue;
	exports.getIntervalValue = getIntervalValue;

	function average() {
		var numbers = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

		return sum(numbers) / numbers.length;
	}

	function sum() {
		var numbers = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

		var sum = 0;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = numbers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var item = _step.value;

				sum += item;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator['return']) {
					_iterator['return']();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return sum;
	}

	function handleScoring(scope, algo, data, digits) {
		var score = 0;

		if (typeof algo == 'function') {
			score = algo.call(scope);
		} else {
			switch (algo) {
				case 'average':
					var scores = data.map(function (entry) {
						return entry.value;
					});
					score = average(scores);
					break;

				case 'sum':
					var scores = data.map(function (entry) {
						return entry.value;
					});
					score = sum(scores);
					break;
			}
		}

		score = Math.round(score * Math.pow(10, digits)) / Math.pow(10, digits);
		return score;
	}

	function getMaxValue(judgingSystem) {
		var digits = judgingSystem.getOption('digits');
		return Math.pow(10, digits + 1);
	}

	function getIntervalValue(needle, haystack) {
		var keys = Object.keys(haystack);
		for (var i = 0; i < keys.length; i++) {
			var key = "" + keys[i];

			if (key === needle) {
				return haystack[key];
			} else if (key.startsWith(">=")) {
				var val = parseInt(key.substr(2), 10);
				if (needle >= val) {
					return haystack[key];
				}
			} else if (key.startsWith("<=")) {
				var val = parseInt(key.substr(2), 10);
				if (needle <= val) {
					return haystack[key];
				}
			} else if (key.startsWith(">")) {
				var val = parseInt(key.substr(1), 10);
				if (needle > val) {
					return haystack[key];
				}
			} else if (key.startsWith("<")) {
				var val = parseInt(key.substr(1), 10);
				if (needle < val) {
					return haystack[key];
				}
			} else if (key.indexOf("-") !== -1) {
				var parts = key.split("-"),
				    small = parts[0],
				    big = parts[1];

				if (needle >= small && needle <= big) {
					return haystack[key];
				}
			}
		}
	}
});
define("freestyle-judging", ["exports", "module", "freestyle-judging/model/JudgingSystem", "freestyle-judging/ui/pages/Sheet", "freestyle-judging/judging-systems/freestyle-judging-2015"], function (exports, module, _freestyleJudgingModelJudgingSystem, _freestyleJudgingUiPagesSheet, _freestyleJudgingJudgingSystemsFreestyleJudging2015) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var _JudgingSystem = _interopRequireDefault(_freestyleJudgingModelJudgingSystem);

    var _Sheet = _interopRequireDefault(_freestyleJudgingUiPagesSheet);

    var App = function App() {
        _classCallCheck(this, App);

        var judgingSystem = new _JudgingSystem["default"](_freestyleJudgingJudgingSystemsFreestyleJudging2015.judgingSystemDescriptor);
        var sheetPage = new _Sheet["default"]({
            model: judgingSystem,
            root: document.getElementById('pages-sheet')
        });
    };

    module.exports = App;
});
define("freestyle-judging/judging-systems/freestyle-judging-2015", ["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var judgingSystemDescriptor = {
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
									">=0": "0-harmony"
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
									">=9": "9-realization",
									">=5": "5-realization",
									">=2": "2-realization",
									">=0": "0-realization"
								}
							},
							Expression: {
								label: "expression",
								intervals: {
									">=9": "9-expression",
									">=5": "5-expression",
									">=2": "2-expression",
									">=0": "0-expression"
								}
							},
							finesse: {
								label: "finesse",
								intervals: {
									">=9": "9-finesse",
									">=5": "5-finesse",
									">=2": "2-finesse",
									">=0": "0-finesse"
								}
							},
							timing: {
								label: "timing",
								intervals: {
									">=9": "9-timing",
									">=5": "5-timing",
									">=2": "2-timing",
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
				"9-realization": "Proper type of musical realization is used the entire routine with effortless continuity",
				"5-realization": "Above average use of the proper musical realization for the majority of the routine",
				"2-realization": "Rider uses the proper musical realization for some of the routine, music seems like background instead of inspiration",
				"0-realization": "Rider never uses the proper type of musical realization, the routine could be done without any music and it would have looked the same",

				"expression": "Expression",
				"9-expression": "Rider/music/nuances as one motivation from the “heart”",
				"5-expression": "Rider/music/nuances work together to create one fluid routine for the majority of the time",
				"2-expression": "The routine has some cohesion but the music/nuances/rider are not fully integrated",
				"0-expression": "The routine seems disjointed and the music/nuances/rider seem completely disconnected",

				"finesse": "Finesse",
				"9-finesse": "Rider superbly and expertly uses the nuances of the music to reflect the overall concept of the routine",
				"5-finesse": "Rider uses the nuances of the music for the majority of the routine but misses some key moments in the music",
				"2-finesse": "Rider rarely uses the music as inspiration and does not utilize the nuances presented in the music to better the routine",
				"0-finesse": "Rider never looks deeper into the music to utilize the nuances, routine has a monotone feeling",

				"timing": "Timing",
				"9-timing": "The rider expertly uses their movements to create meaningful moments which, when put all together, produce a cohesive, well-timed routine",
				"5-timing": "The rider creates a bond between the routine and the music that is apparent for the majority of the routine",
				"2-timing": "The rider matches the timing of the music sometimes but often seems unconnected to the music during the routine",
				"0-timing": "Movements seem unplanned and are placed in a way that leads to a lack of timing whatsoever"
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
				"9-realization": "Geeignete musikalische Umsetzung wird kontinuierlich während der gesamten Kür genutzt",
				"5-realization": "Die genutzte musikalische Umsetzung ist etwas über Durchschnitt aber zu großen Teilen der Musik gegenwärtig",
				"2-realization": "Die genutzte musikalische Umsetzung passt zu einigen Stellen, die Musik läu  aber zu größtenteils im Hintergrund",
				"0-realization": "Der Fahrer nutzt nie eine geeignete musikalische Umsetzung, die Kür sähe auch ohne ohne Musik gleich aus",

				"expression": "Expression",
				"9-expression": "Fahrer, Musik und Nuancen kommen von „Herzen“",
				"5-expression": "Fahrer, Musik und Nuancen passen zu großen Teilen der Kür zusammen, um ein stimmiges Gesamtbild zu erzeugen",
				"2-expression": "Die Kür bietet hier und da einige Zusammenhalte aber Fahrer, Musik und Nuancen sind nicht integriert",
				"0-expression": "Die Kür sieht zerstückelt aus und Fahrer, Musik und Nuancen sind nicht miteinander verbunden",

				"finesse": "Finesse",
				"9-finesse": "Der Fahrer verwandelt die Nuancen der Musik meisterhaft und ausgezeichnet und pflegt sie in das Gesamtkonzept der Kür ein",
				"5-finesse": "Der Fahrer verwandelt die Nuancen der Musik zu großen Teilen der Kür um, verpasst aber einige wichtige essentielle Momente",
				"2-finesse": "Der Fahrer nutzt die Musik selten als Inspiration und Nuancen werden nicht genutzt um eine bessere Kür zu zeigen",
				"0-finesse": "Der Fahrer missachtet die Nuancen der Musik; die Kür ist monoton",

				"timing": "Timing",
				"9-timing": "Der Fahrer kreiert meisterhaft ausdrucksstarke Momente durch Bewegungen, die zusammengesetzt eine bindende, wohl-abgestimmte Kür ergeben",
				"5-timing": "Der Fahrer schafft eine Verbindung zwischen Musik und Kür, die zu großen Teilen der Kür gegenwärtig ist",
				"2-timing": "Das Timing zwischen Fahrer und Musik stimmt manchmal, oft fehlt aber ein gelungene Verbindung",
				"0-timing": "Die Bewegungen sind ungeplant und ihre Anordnung ist in Bezug auf das Timing mangelhaft"
			}
		}
	};
	exports.judgingSystemDescriptor = judgingSystemDescriptor;
});
define("freestyle-judging/model/Category", ["exports", "module", "freestyle-judging/model/Criterion", "freestyle-judging/helpers"], function (exports, module, _freestyleJudgingModelCriterion, _freestyleJudgingHelpers) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _Criterion = _interopRequireDefault(_freestyleJudgingModelCriterion);

	var Category = (function () {
		function Category(part, data) {
			_classCallCheck(this, Category);

			this.part = part;
			this.data = data;
			this.criteria = new Map();
			this.parse(data);

			this.score = 0;
		}

		_createClass(Category, [{
			key: "parse",
			value: function parse(data) {
				for (var crit in data.criteria) {
					data.criteria[crit].id = crit;
					this.criteria.set(crit, new _Criterion["default"](this, data.criteria[crit]));
				}
			}
		}, {
			key: "getId",
			value: function getId() {
				return this.data.id;
			}
		}, {
			key: "getLabel",
			value: function getLabel() {
				return this.data.label;
			}
		}, {
			key: "getPart",
			value: function getPart() {
				return this.part;
			}
		}, {
			key: "getCriteria",
			value: function getCriteria() {
				return this.criteria.values();
			}
		}, {
			key: "getCriterion",
			value: function getCriterion(criteria) {
				if (this.criteria.has(criteria)) {
					return this.criteria.get(criteria);
				}
			}
		}, {
			key: "calculateScore",
			value: function calculateScore() {
				var digits = this.getPart().getJudgingSystem().getOption('digits');
				var scoring = this.data.scoring;
				var data = [];
				this.criteria.forEach(function (c) {
					return data.push({
						value: c.getValue()
					});
				});

				this.score = (0, _freestyleJudgingHelpers.handleScoring)(this, scoring, data, digits);
				this.part.calculateScore();
				return this.score;
			}
		}, {
			key: "getScore",
			value: function getScore() {
				return this.score;
			}
		}, {
			key: "setScore",
			value: function setScore(score) {
				this.score = parseFloat(score);
				this.part.calculateScore();
			}
		}]);

		return Category;
	})();

	module.exports = Category;
	;
});
define("freestyle-judging/model/Criterion", ["exports", "module"], function (exports, module) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Criterion = (function () {
		function Criterion(category, data) {
			_classCallCheck(this, Criterion);

			this.category = category;
			this.data = data;
			this.value = 0;
		}

		_createClass(Criterion, [{
			key: "getLabel",
			value: function getLabel() {
				return this.data.label;
			}
		}, {
			key: "getId",
			value: function getId() {
				return this.data.id;
			}
		}, {
			key: "getCategory",
			value: function getCategory() {
				return this.category;
			}
		}, {
			key: "getIntervals",
			value: function getIntervals() {
				if (this.data.intervals) {
					return this.data.intervals;
				}

				return {};
			}
		}, {
			key: "getValue",
			value: function getValue() {
				return this.value;
			}
		}, {
			key: "setValue",
			value: function setValue(value) {
				this.value = parseFloat(value);
			}
		}]);

		return Criterion;
	})();

	module.exports = Criterion;
});
define("freestyle-judging/model/JudgingSystem", ["exports", "module", "freestyle-judging/model/Part", "freestyle-judging/helpers"], function (exports, module, _freestyleJudgingModelPart, _freestyleJudgingHelpers) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _Part = _interopRequireDefault(_freestyleJudgingModelPart);

	var JudgingSystem = (function () {
		function JudgingSystem(data) {
			_classCallCheck(this, JudgingSystem);

			this.data = data;
			this.parts = new Map();
			this.parse(data);

			this.score = 0;
		}

		_createClass(JudgingSystem, [{
			key: "parse",
			value: function parse(data) {
				for (var part in data.parts) {
					data.parts[part].id = part;
					this.parts.set(part, new _Part["default"](this, data.parts[part]));
				}

				if (!'i18n' in this.data) {
					this.data.i18n = { 'en': {} };
				}
			}
		}, {
			key: "getName",
			value: function getName() {
				return this.data.label;
			}
		}, {
			key: "getAuthor",
			value: function getAuthor() {
				return this.data.author;
			}
		}, {
			key: "getOption",
			value: function getOption(name) {
				if (name in this.data.options) {
					return this.data.options[name];
				}

				return undefined;
			}
		}, {
			key: "getPart",
			value: function getPart(part) {
				if (this.parts.has(part)) {
					return this.parts.get(part);
				}
			}
		}, {
			key: "getParts",
			value: function getParts() {
				return this.parts.values();
			}
		}, {
			key: "calculateScore",
			value: function calculateScore() {
				var digits = this.getOption('digits');
				var scoring = this.data.scoring;
				var data = [];
				this.criteria.forEach(function (p) {
					return data.push({
						value: p.getScore()
					});
				});

				this.score = (0, _freestyleJudgingHelpers.handleScoring)(this, scoring, data, digits);
				return this.score;
			}
		}, {
			key: "getScore",
			value: function getScore() {
				return this.score;
			}
		}, {
			key: "setScore",
			value: function setScore(score) {
				this.score = score;
			}
		}, {
			key: "getI18n",
			value: function getI18n(label) {
				var _this = this;

				var language = arguments.length <= 1 || arguments[1] === undefined ? 'en' : arguments[1];

				var getLang = function getLang(language) {
					if (language in _this.data.i18n) {
						return _this.data.i18n[language];
					}
					return null;
				};

				var i = 0;
				var lang = null;
				var languages = [language, 'en'];

				do {
					lang = getLang(languages[i++]);
				} while (lang === null || i < languages.length - 1);

				if (lang == null) {
					return label;
				}

				if (label in lang) {
					return lang[label];
				}

				return label;
			}
		}, {
			key: "getLanguages",
			value: function getLanguages() {
				return Object.keys(this.data.i18n);
			}
		}]);

		return JudgingSystem;
	})();

	module.exports = JudgingSystem;
});
define("freestyle-judging/model/Part", ["exports", "module", "freestyle-judging/model/Category", "freestyle-judging/helpers"], function (exports, module, _freestyleJudgingModelCategory, _freestyleJudgingHelpers) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _Category = _interopRequireDefault(_freestyleJudgingModelCategory);

	var Part = (function () {
		function Part(system, data) {
			_classCallCheck(this, Part);

			this.judgingSystem = system;
			this.data = data;
			this.categories = new Map();
			this.parse(data);

			this.score = 0;
		}

		_createClass(Part, [{
			key: "parse",
			value: function parse(data) {
				for (var category in data.categories) {
					data.categories[category].id = category;
					this.categories.set(category, new _Category["default"](this, data.categories[category]));
				}
			}
		}, {
			key: "getId",
			value: function getId() {
				return this.data.id;
			}
		}, {
			key: "getLabel",
			value: function getLabel() {
				return this.data.label;
			}
		}, {
			key: "getJudgingSystem",
			value: function getJudgingSystem() {
				return this.judgingSystem;
			}
		}, {
			key: "getCategory",
			value: function getCategory(category) {
				if (this.categories.has(category)) {
					return this.categories.get(category);
				}
			}
		}, {
			key: "getCategories",
			value: function getCategories() {
				return this.categories.values();
			}
		}, {
			key: "calculateScore",
			value: function calculateScore() {
				var digits = this.getJudgingSystem().getOption('digits');
				var scoring = this.data.scoring;
				var data = [];
				this.categories.forEach(function (c) {
					return data.push({
						value: c.getScore()
					});
				});

				this.score = (0, _freestyleJudgingHelpers.handleScoring)(this, scoring, data, digits);
				return this.score;
			}
		}, {
			key: "getScore",
			value: function getScore() {
				return this.score;
			}
		}, {
			key: "setScore",
			value: function setScore(score) {
				this.score = score;
			}
		}]);

		return Part;
	})();

	module.exports = Part;
});
define('freestyle-judging/ui/pages/Sheet', ['exports', 'module', 'freestyle-judging/ui/widgets/PartWidget'], function (exports, module, _freestyleJudgingUiWidgetsPartWidget) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _PartWidget = _interopRequireDefault(_freestyleJudgingUiWidgetsPartWidget);

	var Sheet = (function () {
		function Sheet(options) {
			_classCallCheck(this, Sheet);

			this.model = options.model;
			this.root = options.root;
			this.build();
		}

		_createClass(Sheet, [{
			key: 'build',
			value: function build() {
				var _this = this;

				var nav = '';
				var panes = '';
				var languages = '';

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.model.getParts()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var part = _step.value;

						nav += '<li role="presentation">\n\t\t\t\t<a href="#part-' + part.getId() + '" aria-controls="part-' + part.getId() + '" role="tab" data-toggle="tab" data-i18n="' + part.getLabel() + '">' + this.translate(part.getLabel()) + '</a>\n\t\t\t</li>';
						panes += '<div role="tabpanel" class="tab-pane" id="part-' + part.getId() + '"></div>';
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator['return']) {
							_iterator['return']();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this.model.getLanguages()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var language = _step2.value;

						languages += '<option value="' + language + '">' + language + '</option>';
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2['return']) {
							_iterator2['return']();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				this.root.innerHTML = '<div>\n\t\t\t<p class="pull-right">Language: <select id="language">' + languages + '</select></p>\n\t\t\t<ul class="nav nav-tabs" role="tablist">\n\t\t\t\t<li role="presentation" class="active">\n\t\t\t\t\t<a href="#summary" aria-controls="summary" role="tab" data-toggle="tab">Summary</a>\n\t\t\t\t</li>\n\t\t\t\t' + nav + '\n\t\t\t</ul>\n\t\t\t<div class="tab-content">\n\t\t\t\t<div role="tabpanel" class="tab-pane active" id="summary">Summary</div>\n\t\t\t\t' + panes + '\n\t\t\t</div>\n\t\t</div>';

				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = this.model.getParts()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var part = _step3.value;

						new _PartWidget['default'](this, part);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3['return']) {
							_iterator3['return']();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}

				this.language = document.getElementById('language');
				this.language.addEventListener('change', function (e) {
					_this.changeLanguage(e);
				}, false);
			}
		}, {
			key: 'changeLanguage',
			value: function changeLanguage(e) {
				var elems = document.querySelectorAll('*[data-i18n]');
				// for (let elem of elems) {
				// 	elem.textContent = this.translate(elem.dataset.i18n);
				// }

				for (var i = 0; i < elems.length; i++) {
					var elem = elems[i];
					elem.textContent = this.translate(elem.dataset.i18n);
				}
			}
		}, {
			key: 'getLanguage',
			value: function getLanguage() {
				if (typeof this.language == 'undefined') {
					return 'en';
				}
				return this.language.value;
			}
		}, {
			key: 'translate',
			value: function translate(label) {
				return this.model.getI18n(label, this.getLanguage());
			}
		}]);

		return Sheet;
	})();

	module.exports = Sheet;
});
define("freestyle-judging/ui/widgets/CategoryWidget", ["exports", "module", "freestyle-judging/ui/widgets/CriterionWidget", "freestyle-judging/helpers"], function (exports, module, _freestyleJudgingUiWidgetsCriterionWidget, _freestyleJudgingHelpers) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _CriterionWidget = _interopRequireDefault(_freestyleJudgingUiWidgetsCriterionWidget);

	var CategoryWidget = (function () {
		function CategoryWidget(parent, model) {
			_classCallCheck(this, CategoryWidget);

			this.parent = parent;
			this.model = model;
			this.updating = false;

			this.build();
		}

		_createClass(CategoryWidget, [{
			key: "build",
			value: function build() {
				var _this = this;

				var root = document.getElementById('part-' + this.model.getPart().getId() + '-categories');

				var max = (0, _freestyleJudgingHelpers.getMaxValue)(this.model.getPart().getJudgingSystem());
				var fieldset = document.createElement('fieldset');
				fieldset.id = "cat-" + this.model.getId();
				fieldset.className = "category col-xs-4";
				fieldset.innerHTML = "\n\t\t\t<legend id=\"cat-" + this.model.getId() + "-label\" data-i18n=\"" + this.model.getLabel() + "\">" + this.getSheet().translate(this.model.getLabel()) + "</legend>\n\t\t\t<input type=\"range\" min=\"0\" max=\"" + max + "\" value=\"0\" id=\"cat-" + this.model.getId() + "-slider\">\n\t\t\t<input class=\"form-control input-sm sheet-value category-score\" type=\"number\" id=\"cat-" + this.model.getId() + "-score\" value=\"0\" min=\"0\" max=\"10\" step=\"0.25\">\n\t\t\t<p>&nbsp;</p>\n\t\t";
				root.appendChild(fieldset);

				this.rootNode = document.getElementById('cat-' + this.model.getId());
				this.labelNode = document.getElementById('cat-' + this.model.getId() + '-label');
				this.valueNode = document.getElementById('cat-' + this.model.getId() + '-score');
				this.sliderNode = document.getElementById('cat-' + this.model.getId() + '-slider');

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.model.getCriteria()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var crit = _step.value;

						new _CriterionWidget["default"](this, crit);
					}

					// register event handlers
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				window.setTimeout(function () {
					_this.sliderNode.addEventListener('input', _this, false);
					_this.valueNode.addEventListener('input', _this, false);
				}, 10);
			}
		}, {
			key: "getSheet",
			value: function getSheet() {
				return this.parent.getSheet();
			}
		}, {
			key: "getRootNode",
			value: function getRootNode() {
				return this.rootNode;
			}
		}, {
			key: "handleEvent",
			value: function handleEvent(e) {
				if (!this.updating) {
					this.updating = true;

					// update value field
					if (e.target.type == 'range') {
						this.updateValue();
					}

					// update slider
					else if (e.target.type == 'number') {
							var val = parseInt(this.valueNode.value);
							var max = parseInt(this.valueNode.max);

							if (val > max) {
								this.valueNode.value = this.valueNode.max;
							}
							this.updateSlider();
						}

					// update score
					this.model.setScore(this.valueNode.value);
					this.parent.updateScore();

					this.updating = false;
				}
			}
		}, {
			key: "updateValue",
			value: function updateValue() {
				this.valueNode.value = this.sliderNode.value / Math.pow(10, this.getDigits());
			}
		}, {
			key: "updateSlider",
			value: function updateSlider() {
				this.sliderNode.value = this.valueNode.value * Math.pow(10, this.getDigits());
			}
		}, {
			key: "getDigits",
			value: function getDigits() {
				return this.model.getPart().getJudgingSystem().getOption('digits');
			}
		}, {
			key: "updateScore",
			value: function updateScore() {
				var score = this.model.calculateScore();
				var digits = this.getDigits();

				this.valueNode.value = score;
				this.sliderNode.value = score * Math.pow(10, digits);
				this.parent.updateScore();
			}
		}]);

		return CategoryWidget;
	})();

	module.exports = CategoryWidget;
});
define('freestyle-judging/ui/widgets/CriterionWidget', ['exports', 'module', 'freestyle-judging/helpers'], function (exports, module, _freestyleJudgingHelpers) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var CriterionWidget = (function () {
		function CriterionWidget(parent, model) {
			_classCallCheck(this, CriterionWidget);

			this.parent = parent;
			this.model = model;
			this.updating = false;
			this.valueNode = null;
			this.sliderNode = null;

			this.build();
		}

		_createClass(CriterionWidget, [{
			key: 'build',
			value: function build() {
				var _this = this;

				// construct
				var max = (0, _freestyleJudgingHelpers.getMaxValue)(this.model.getCategory().getPart().getJudgingSystem());
				var row = document.createElement('div');
				row.id = 'crit-' + this.model.getId() + '-row';
				row.className = 'criterion col-xs-12';
				row.innerHTML = '\n\t\t\t<div class="row"><label class="col-xs-4" data-i18n="' + this.model.getLabel() + '">' + this.getSheet().translate(this.model.getLabel()) + '</label>\n\t\t\t<span class="col-xs-5">\n\t\t\t\t<span class="strokes" id="crit-' + this.model.getId() + '-strokes"></span>\n\t\t\t\t<input type="range" value="0" min="0" max="' + max + '" id="crit-' + this.model.getId() + '-slider">\n\t\t\t</span>\n\t\t\t<input class="col-xs-2 form-control input-sm sheet-value" type="number" id="crit-' + this.model.getId() + '-value" value="0" min="0" max="10" step="0.25"></div>\n\t\t\t<div class="description text-right small" id="crit-' + this.model.getId() + '-description"></div>\n\t\t';

				this.parent.getRootNode().appendChild(row);

				// get nodes
				var strokes = document.getElementById('crit-' + this.model.getId() + '-strokes');
				this.sliderNode = document.getElementById('crit-' + this.model.getId() + '-slider');
				this.valueNode = document.getElementById('crit-' + this.model.getId() + '-value');
				this.descriptionNode = document.getElementById('crit-' + this.model.getId() + '-description');

				// register event handlers
				window.setTimeout(function () {
					_this.sliderNode.addEventListener('input', _this, false);
					_this.valueNode.addEventListener('input', _this, false);
				}, 10);

				// add helper strokes
				var intervals = this.model.getIntervals();
				var keys = Object.keys(intervals);
				for (var i = 0; i < keys.length; i++) {
					var key = "" + keys[i];
					var val = 0;

					if (key.startsWith(">=")) {
						val = parseInt(key.substr(2), 10);
					} else if (key.startsWith("<=")) {
						val = parseInt(key.substr(2), 10);
					} else if (key.startsWith(">")) {
						val = parseInt(key.substr(1), 10);
					} else if (key.startsWith("<")) {
						val = parseInt(key.substr(1), 10);
					} else if (key.indexOf("-") !== -1) {
						var parts = key.split("-");
						val = parts[0];
					}

					if (val > 0) {
						var stroke = document.createElement('span');
						stroke.className = 'stroke';
						stroke.style.marginLeft = val * 10 + "%";

						//this.sliderNode.clientWidth * val * 10 =

						strokes.appendChild(stroke);
					}
				}
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(e) {
				if (!this.updating) {
					this.updating = true;

					// update value field
					if (e.target.type == 'range') {
						this.updateValue();
					}

					// update slider
					else if (e.target.type == 'number') {
							var val = parseInt(this.valueNode.value);
							var max = parseInt(this.valueNode.max);

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
		}, {
			key: 'getDigits',
			value: function getDigits() {
				return this.model.getCategory().getPart().getJudgingSystem().getOption('digits');
			}
		}, {
			key: 'updateValue',
			value: function updateValue() {
				this.valueNode.value = this.sliderNode.value / Math.pow(10, this.getDigits());
			}
		}, {
			key: 'updateSlider',
			value: function updateSlider() {
				this.sliderNode.value = this.valueNode.value * Math.pow(10, this.getDigits());
			}
		}, {
			key: 'updateDescription',
			value: function updateDescription() {
				var intervals = this.model.getIntervals();
				if (Object.keys(intervals).length === 0) {
					return;
				}

				var value = this.model.getValue();
				var desc = (0, _freestyleJudgingHelpers.getIntervalValue)(value, intervals);

				if (typeof desc == 'undefined') {
					this.descriptionNode.innerHTML = '';
					delete this.descriptionNode.dataset.i18n;
				} else {
					this.descriptionNode.innerHTML = this.getSheet().translate(desc);
					this.descriptionNode.dataset.i18n = desc;
				}

				var colors = this.model.getCategory().getPart().getJudgingSystem().getOption('colors');
				if (colors != undefined) {
					var color = (0, _freestyleJudgingHelpers.getIntervalValue)(Math.round(value * 10), colors);
					this.descriptionNode.style.color = color;
				}
			}
		}, {
			key: 'getSheet',
			value: function getSheet() {
				return this.parent.getSheet();
			}
		}]);

		return CriterionWidget;
	})();

	module.exports = CriterionWidget;
});
define('freestyle-judging/ui/widgets/PartWidget', ['exports', 'module', 'freestyle-judging/ui/widgets/CategoryWidget'], function (exports, module, _freestyleJudgingUiWidgetsCategoryWidget) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _CategoryWidget = _interopRequireDefault(_freestyleJudgingUiWidgetsCategoryWidget);

	var PartWidget = (function () {
		function PartWidget(parent, model) {
			_classCallCheck(this, PartWidget);

			this.parent = parent;
			this.model = model;

			this.build();
		}

		_createClass(PartWidget, [{
			key: 'build',
			value: function build() {
				var parent = document.getElementById('part-' + this.model.getId());

				parent.innerHTML = '\n\t\t\t<div class="part-score col-xs-12">Score: <span id="part-' + this.model.getId() + '-score" class="text-success"></span></div>\n\t\t\t<div id="part-' + this.model.getId() + '-categories" class="row">\n\t\t\t</div>\n\t\t';

				this.scoreNode = document.getElementById('part-' + this.model.getId() + '-score');

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.model.getCategories()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var cat = _step.value;

						new _CategoryWidget['default'](this, cat);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator['return']) {
							_iterator['return']();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: 'updateScore',
			value: function updateScore() {
				this.scoreNode.innerHTML = this.model.getScore();
			}
		}, {
			key: 'getSheet',
			value: function getSheet() {
				return this.parent;
			}
		}]);

		return PartWidget;
	})();

	module.exports = PartWidget;
});