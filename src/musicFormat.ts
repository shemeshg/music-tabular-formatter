

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
    const positions = getBarPositions(line)
    let ret = []
    for (let i = 0; i < positions.length - 1; i++) {
        const barContent = line.substring(positions[i] + 1, positions[i + 1])
        ret.push(barContent)
    }
    return ret
}

function barItems(barString: string): string[] {


    let result = barString.match(/\([^)]*\)|\S+/g);
    if (result) {
        return result;
    }
    return []
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
    lens: number[] = []
    fcs: FieldsClass[] = []
    totalLen = 0
}

function spredEven(ary: string[], requestedLen: number, fc: FieldsClass, applayFromFieldClass: boolean): string {
    let lenOfAllItemsInAry = ary.reduce((total, item) => total + item.length, 0);
    let s = ""
    let spacePerItem = Math.floor(requestedLen / (ary.length))

    s = " "

    let forId = 0
    ary.forEach(element => {
        // handel pharenses
        let isItEnclosedWithParentheses = element.startsWith('(') && element.endsWith(')');
        if (isItEnclosedWithParentheses) {
            let contentInParentheses = element.slice(1, -1);


            let fcChild: FieldsClass = new FieldsClass();
            fcChild.forId = forId
            // if not already exists
            const fcFound = fc.fcs.filter((fcItm) => {
                return fcItm.forId === forId
            })
            if (fcFound.length) {
                fcChild = fcFound[0]
            } else {
                fc.fcs.push(fcChild)
            }

            let parenthesLen = contentInParentheses.length - 2
   
            parenthesLen = 0
               
            element = "(" + spredEven(barItems(contentInParentheses), parenthesLen, fcChild, applayFromFieldClass) + ")"

        }

        let elementToAdd = ""
        if (applayFromFieldClass) {            
            elementToAdd = padLR(element, fc.lens[forId])
        } else {
            if (spacePerItem <= element.length) {
                elementToAdd = " " + element + " "
            } else {                
                elementToAdd = padLR(element, spacePerItem)
            }
            if (fc.lens[forId]) {
                if (fc.lens[forId] < elementToAdd.length) {
                    fc.lens[forId] = elementToAdd.length
                }
            } else {
                fc.lens.push(elementToAdd.length)
            }
        }


        s = s + elementToAdd
        forId++;
    });

    if (s.length < requestedLen) {        
        s = padLR(s, requestedLen)
    }

    if (applayFromFieldClass) {  
        // if re-run required, bug 
        if (fc.totalLen < s.length) {
            fc.totalLen = s.length            
        } 
        s = padLR(s, fc.totalLen )
    } else {
        if (fc.totalLen < s.length) {
            fc.totalLen = s.length
        }
    }
    return s;
}


function pareseLines(lines: string[], applayFromFieldClass: boolean, fcBars: FieldsClass[]): any[] {
    let retLines: any[] = []
    lines.forEach((valLine, idxLine) => {

        let retLine: any[] = []
        if (valLine.startsWith('//')) {
            retLine.push(valLine);            
        } else {
            barsContent(valLine).forEach((valBar, idxBar) => {
                let fcBar = new FieldsClass();
                if (fcBars[idxBar]) {
                    fcBar = fcBars[idxBar]
                } else {
                    fcBars.push(fcBar)
                }
                const barText = spredEven(barItems(valBar), 0, fcBar, applayFromFieldClass)
                retLine.push(barText)
    
            })
        }

        retLines.push(retLine)
    })


    return retLines;
}

function formatMusicBloc(bloack: string): string{
    let lines =  bloack.trim().split("\n")
    let fcBars: FieldsClass[] = []
    let preLines = pareseLines(lines, false, fcBars)
    let newLines = preLines.map(innerArray => 
        { 
            if (innerArray.length ===  1 && innerArray[0].trim().startsWith('//')){
                return innerArray[0];
            } else {
                return '|' + innerArray.join('|') + '|'; }
            }            
        )

    let retLines = pareseLines(newLines, true, fcBars)
    newLines = retLines.map(innerArray => 
        { 
            if (innerArray.length ===  1 && innerArray[0].trim().startsWith('//')){
                return innerArray[0];
            } else {
                return '|' + innerArray.join('|') + '|'; }
            }   
        )
    retLines = pareseLines(newLines, true, fcBars)

    let result = retLines.map(innerArray => 
        { 
            if (innerArray.length ===  1 && innerArray[0].trim().startsWith('//')){
                return innerArray[0];
            } else {
                return '|' + innerArray.join('|') + '|'; }
            }
            
        ).join('\n');

    result = result.replace(/\| \|/g, "||");
    return result;
}

export function formatMusicDoc(doc: string):string{
    let retDoc = ""
    const lines = doc.split('\n');
    let accumulatedMusicBlock = "";
    lines.forEach(line => {
        if (line.startsWith('|') || line.startsWith('//')) {
            accumulatedMusicBlock += line + '\n';
        } else {
            if (accumulatedMusicBlock) {
                retDoc += formatMusicBloc(accumulatedMusicBlock) + "\n";
                accumulatedMusicBlock = ""
            }  
            retDoc += line + "\n";
        }
    })
    if (accumulatedMusicBlock) {
        retDoc += formatMusicBloc(accumulatedMusicBlock)
    } 
    return retDoc;
}




