function identicalLetters(firstString: string, secondString: string): string {
    let result: string = "";
    for (let letterF of firstString) {
        for (let letterS of secondString) {
            if (letterF.toLowerCase() == letterS.toLowerCase() && letterS != " ") {
                result += letterS;
                break;
            }
        }
    }

    return result;
}

let f: string = "asdffg"
let s: string = "asdqffwe"

console.log(`\nСтрока 1: ${f}\nСтрока 2: ${s}\nРезультат: ` + identicalLetters(f, s));