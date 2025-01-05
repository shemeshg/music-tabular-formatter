

function getBarPositions(line: string): number[] {
    let positions: number[] = [];

    for (let i = 0; i < line.length; i++) {
        if (line[i] === '|') {
            positions.push(i);
        }
    }

    return positions;
}

function barsContent(line: string): string[] {
    const positions = getBarPositions(line);
    let ret = [];
    for (let i = 0; i < positions.length - 1; i++) {
        const barContent = line.substring(positions[i] + 1, positions[i + 1]);
        ret.push(barContent);
    }
    return ret;
}

function barItems(barString: string): string[] {


    let result = barString.match(/\([^)]*\)|\S+/g);
    if (result) {
        return result;
    }
    return [];
}

function padLR(text: string, requestedLen: number) {
    // Calculate the total padding needed
    let totalPadding = requestedLen - text.length;

    // Calculate padding for left and right
    let leftPadding = Math.floor(totalPadding / 2);
    let rightPadding = totalPadding - leftPadding;

    // Pad the text
    let paddedText = ' '.repeat(leftPadding) + text + ' '.repeat(rightPadding);

    return paddedText;
}

class FieldsClass {
    forId = 0;
    lens: number[] = [];
    fcs: FieldsClass[] = [];
    totalLen = 0;
}

function spredEven(ary: string[], requestedLen: number, fc: FieldsClass, applayFromFieldClass: boolean): string {
    let lenOfAllItemsInAry = ary.reduce((total, item) => total + item.length, 0);
    let s = "";
    let spacePerItem = Math.floor(requestedLen / (ary.length));

    s = " ";

    let forId = 0;
    ary.forEach(element => {
        // handel pharenses
        let isItEnclosedWithParentheses = element.startsWith('(') && element.endsWith(')');
        if (isItEnclosedWithParentheses) {
            let contentInParentheses = element.slice(1, -1);


            let fcChild: FieldsClass = new FieldsClass();
            fcChild.forId = forId;
            // if not already exists
            const fcFound = fc.fcs.filter((fcItm) => {
                return fcItm.forId === forId;
            });
            if (fcFound.length) {
                fcChild = fcFound[0];
            } else {
                fc.fcs.push(fcChild);
            }

            let parenthesLen = contentInParentheses.length - 2;
   
            parenthesLen = 0;
               
            element = "(" + spredEven(barItems(contentInParentheses), parenthesLen, fcChild, applayFromFieldClass) + ")";

        }

        let elementToAdd = "";
        if (applayFromFieldClass) {            
            elementToAdd = padLR(element, fc.lens[forId]);
        } else {
            if (spacePerItem <= element.length) {
                elementToAdd = " " + element + " ";
            } else {                
                elementToAdd = padLR(element, spacePerItem);
            }
            if (fc.lens[forId]) {
                if (fc.lens[forId] < elementToAdd.length) {
                    fc.lens[forId] = elementToAdd.length;
                }
            } else {
                fc.lens.push(elementToAdd.length);
            }
        }


        s = s + elementToAdd;
        forId++;
    });

    if (s.length < requestedLen) {        
        s = padLR(s, requestedLen);
    }

    if (applayFromFieldClass) {  
        // if re-run required, bug 
        if (fc.totalLen < s.length) {
            fc.totalLen = s.length;           
        } 
        s = padLR(s, fc.totalLen );
    } else {
        if (fc.totalLen < s.length) {
            fc.totalLen = s.length;
        }
    }
    return s;
}

enum LineType {
    MusicBlockData,
    MusicBlockRemark,
    Text
}

class LineObj {
    private _txt:string = "";

    musicBars:string[] = [];
    
    get lineType(): LineType {
        if (this._txt.startsWith('|') ){
            return LineType.MusicBlockData;
        } else if (this._txt.startsWith('//')){
            return LineType.MusicBlockRemark;
        } else {
            return LineType.Text;
        }
    }

    get txt(){
        if (this.lineType === LineType.MusicBlockData && !this._txt.trim().endsWith("|")) {
            return this._txt + "|";
        }
        return this._txt;
    }

    constructor(txt: string){
        this._txt = txt;

    }
}



class FormatMusicBlock {
    private _lines:string[];
    private _fcBars: FieldsClass[] = [];

    private _result:string[] = [];
    constructor(bloack: string){
        this._lines =  bloack.trim().split("\n");
    }

    doParse(applayFromFieldClass: boolean){
       this._result = this.strAryPareseLines(applayFromFieldClass);
    }

    get result(){
        let val = this._result.join('\n');

        val = val.replace(/\| \|/g, "||");
        return val;
    }

    private strAryPareseLines(applayFromFieldClass: boolean): string[] {
        let retLines = this.pareseLines(applayFromFieldClass);
        let newLines = retLines.map(innerArray => 
            { 
                if (innerArray.lineType === LineType.MusicBlockRemark){
                    return innerArray.txt;
                } else {
                    return '|' + innerArray.musicBars.join('|') + '|'; }
                }    
            );
        return newLines;
    }
    
    private pareseLines(applayFromFieldClass: boolean): LineObj[] {
        let retLines: LineObj[] = [];
        this._lines.forEach((valLine, idxLine) => {
    
       
            let lineObj:LineObj = new LineObj(valLine);
            if (lineObj.lineType === LineType.MusicBlockData){
                barsContent(valLine).forEach((valBar, idxBar) => {
                    let fcBar = new FieldsClass();
                    if (this._fcBars[idxBar]) {
                        fcBar = this._fcBars[idxBar];
                    } else {
                        this._fcBars.push(fcBar);
                    }
                    const barText = spredEven(barItems(valBar), 0, fcBar, applayFromFieldClass);
                    lineObj.musicBars.push(barText);
        
                });
            }
    
            retLines.push(lineObj);
        });
    
    
        return retLines;
    }
    


}

function formatMusicBloc(bloack: string): string{
    let f: FormatMusicBlock = new FormatMusicBlock(bloack);
    f.doParse(false); //compact
    f.doParse(true); //calculate apllay apaces
    f.doParse(true); //calculate apllay apaces

    return f.result;
}



export function formatMusicDoc(doc: string):string{
    let retDoc = "";
    const lines = doc.split('\n');
    const totalLinesCount = lines.length;
    let accumulatedMusicBlock = "";
    lines.forEach((line,idx) => {
        let lineObj = new LineObj(line);
        if (lineObj.lineType === LineType.Text){
            if (accumulatedMusicBlock) {
                retDoc += formatMusicBloc(accumulatedMusicBlock) + "\n";
                accumulatedMusicBlock = "";
            }  
            retDoc += lineObj.txt;
            if (idx !== totalLinesCount - 1){
                retDoc += "\n";
            }
            
        } else {
            accumulatedMusicBlock += lineObj.txt + '\n';
        }
    });
    if (accumulatedMusicBlock) {
        retDoc += formatMusicBloc(accumulatedMusicBlock);
    } 
    return retDoc;
}




