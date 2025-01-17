var Rochambeau = function (playerChoice) {
    var choices = ["Камень", "Ножницы", "Бумага"];
    var computerChoice = choices[Math.floor(Math.random() * 3)];
    var winner = playerChoice === computerChoice
        ? "Ничья"
        : (playerChoice === "Камень" && computerChoice === "Ножницы") ||
            (playerChoice === "Ножницы" && computerChoice === "Бумага") ||
            (playerChoice === "Бумага" && computerChoice === "Камень")
            ? "Игрок"
            : "Компьютер";
    var message = winner === "Ничья"
        ? "\u041D\u0438\u0447\u044C\u044F! \u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 ".concat(playerChoice, ", \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0432\u044B\u0431\u0440\u0430\u043B ").concat(computerChoice, ".")
        : winner === "Игрок"
            ? "\u0412\u044B \u043F\u043E\u0431\u0435\u0434\u0438\u043B\u0438! \u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 ".concat(playerChoice, ", \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0432\u044B\u0431\u0440\u0430\u043B ").concat(computerChoice, ".")
            : "\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u043F\u043E\u0431\u0435\u0434\u0438\u043B! \u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 ".concat(playerChoice, ", \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0432\u044B\u0431\u0440\u0430\u043B ").concat(computerChoice, ".");
    return { playerChoice: playerChoice, computerChoice: computerChoice, winner: winner, message: message };
};
function main() {
    try {
        var result1 = Rochambeau("Камень");
        console.log(result1);
        var result2 = Rochambeau("Бумага");
        console.log(result2);
        var result3 = Rochambeau("Ножницы");
        console.log(result3);
    }
    catch (error) {
        console.error("Ошибка:", error);
    }
}
main();
