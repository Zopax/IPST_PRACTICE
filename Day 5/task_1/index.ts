type ChoiceType = "Камень" | "Ножницы" | "Бумага";

type GameResultType = {
    playerChoice: ChoiceType;
    computerChoice: ChoiceType;
    winner: "Игрок" | "Компьютер" | "Ничья";
    message: string;
  };

const Rochambeau = (playerChoice: ChoiceType): GameResultType => {
    const choices: ChoiceType[] = ["Камень", "Ножницы", "Бумага"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    const winner =
        playerChoice === computerChoice
        ? "Ничья"
        : (playerChoice === "Камень" && computerChoice === "Ножницы") ||
          (playerChoice === "Ножницы" && computerChoice === "Бумага") ||
          (playerChoice === "Бумага" && computerChoice === "Камень")
        ? "Игрок"
        : "Компьютер";

    const message =
        winner === "Ничья"
        ? `Ничья! Вы выбрали ${playerChoice}, компьютер выбрал ${computerChoice}.`
        : winner === "Игрок"
        ? `Вы победили! Вы выбрали ${playerChoice}, компьютер выбрал ${computerChoice}.`
        : `Компьютер победил! Вы выбрали ${playerChoice}, компьютер выбрал ${computerChoice}.`;

    return { playerChoice, computerChoice, winner, message };
}


function main()
{
    
    try {
        const result1 = Rochambeau("Камень");
        console.log(result1);
        const result2 = Rochambeau("Бумага");
        console.log(result2);
        const result3 = Rochambeau("Бумага");
        console.log(result3);
    } catch (error) {
        console.error("Ошибка:", error);
    }
}

main()