const nominals: number[] = [100,50,10,5,2,1];

interface INominalCount {
    100: number,
    50: number,
    10: number,
    5: number,
    2: number,
    1: number,
}

const splitAmount = (amount: number): INominalCount => {
    if (amount <= 0 || !Number.isInteger(amount)) {
        throw new Error("Сумма должна быть целым положительным числом.");
    }

    let result: INominalCount = { 100: 0, 50: 0, 10: 0, 5: 0, 2: 0, 1: 0 };
    let remainingSum = amount;

    for (const nominal of nominals) {
        const count = Math.floor(remainingSum / nominal);
        result = { ...result, [nominal]: count }; 
        remainingSum -= count * nominal;
    }

    return result;
};

function main() {
    console.log(splitAmount(123));
    console.log(splitAmount(555));
    console.log(splitAmount(100)); 
    console.log(splitAmount(7));
    console.log(splitAmount(1));

    try { 
        console.log(splitAmount(-10));
    } catch (e) {
        console.error(e);
    }
}

main()