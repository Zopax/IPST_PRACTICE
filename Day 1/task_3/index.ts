function indexOf (str: string, sub: string): number {
    if(sub.length > str.length) {
        return -1;
    }

    for (let i = 0; i <= str.length - sub.length; i++) {
        const currentSub = str.substring(i, i + sub.length);
        if (currentSub === sub) {
            return i; 
        }
    }

    return -1;
}

const str2 = "programming is fun";
const sub2 = "fun";
const index2 = indexOf(str2, sub2);
console.log(`Индекс "${sub2}" в "${str2}": ${index2}`);