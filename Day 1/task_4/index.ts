function runLengthEncoding(str: string): string {

    if (!str) {
        return "";
    }
  
    let encoded = "";
    let count = 1;
  
    for (let i = 0; i < str.length; i++) {
      if (i + 1 < str.length && str[i] === str[i + 1]) {
        count++;
      } else {
        encoded += str[i] + count;
        count = 1;
      }
    }
  
    return encoded;
}

function runLengthDecoding(encodedStr: string): string {
    if (!encodedStr) {
        return "";
    }
  
    let decoded = "";
    let i = 0;
    while (i < encodedStr.length) {
      const char = encodedStr[i];
      i++;
  
      let countStr = "";
      while (i < encodedStr.length && !isNaN(parseInt(encodedStr[i]))) {
        countStr += encodedStr[i];
        i++;
      }
  
      const count = parseInt(countStr);
      decoded += char.repeat(count);
  
    }
    return decoded;
  }

const strToEncode = "AAAABBBCCDAA";
const encoded = runLengthEncoding(strToEncode);
console.log(`Закодированная строка "${strToEncode}": ${encoded}`);

const strToDecode = "A4B3C2D1A2";
const decoded = runLengthDecoding(strToDecode);
console.log(`Раскодированная строка "${strToDecode}": ${decoded}`);