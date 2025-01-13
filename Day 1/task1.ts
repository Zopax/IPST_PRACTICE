function identicalLetters(firstString: string, secondString: string): string {
    let result: string = "";
    for (let letterF of firstString) {
        for (let letterS of secondString) {
            if (letterF.toLowerCase() == letterS.toLowerCase() && letterS != " ") {
                result += letterS;
            }
        }
    }

    return "";
}

// hello
// world 
// return l