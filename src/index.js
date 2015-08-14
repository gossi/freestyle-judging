import JudgingSystem from "freestyle-judging/model/JudgingSystem";
import Sheet from "freestyle-judging/ui/pages/Sheet";
import {judgingSystemDescriptor as freestyleJudging2015} from "freestyle-judging/judging-systems/freestyle-judging-2015";

export default class App {

    constructor() {
        let judgingSystem = new JudgingSystem(freestyleJudging2015);
        let sheetPage = new Sheet({
            model: judgingSystem,
            root: document.getElementById('pages-sheet')
        });
    }
}
