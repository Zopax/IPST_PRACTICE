function  longestWord(str: string) : string {
    let words = str.split(' ')
    let result: string = "";

    for (let word of words) {
        if (word.length >= result.length)
        {
            result = word;
        }    
    }
    
    return result;
}

console.log(longestWord("sgssdf efesdgg as"));