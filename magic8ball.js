function askMagic8Ball(lang) {
  let questionInput = document.getElementById("question" + lang);
  let answerDiv = document.getElementById("answer" + lang);
  let askButton = document.getElementById("askButton" + lang);
  let userText = questionInput.value.trim();

  //check if empty box
  if (userText.length === 0) {
    if (lang === "En") alert("Please enter a question.");
    else alert("Моля въведете въпрос.");
    return;
  }

  // check if EN or BG
  if (lang === "En") {
    if (!isEnglishText(userText)) {
      alert("Please write your question in English only.");
      return;
    }
    if (isGibberishEN(userText)) {
      alert("Something isn't right. Please write a proper English sentence.");
      return;
    }
  } else {
    if (!isBulgarianText(userText)) {
      alert("Моля, използвайте само български букви.");
      return;
    }
    if (isGibberishBG(userText)) {
      alert("Нещо не е наред. Моля напишете правилно изречение.");
      return;
    }
  }

  // check if real words EN
  function isGibberishEN(text) {
    let lower = text.toLowerCase();
    if (lower.length < 3) return true;
    if (/[bcdfghjklmnpqrstvwxyz]{5,}/.test(lower)) return true;
    if (/(.{2,4})\1{2,}/.test(lower)) return true;

    let keyboardPatterns = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    for (let p of keyboardPatterns) if (lower.includes(p)) return true;

    let vowels = lower.match(/[aeiou]/g) || [];
    if (vowels.length / lower.length < 0.2) return true;

    return false;
  }

  // check if real words BG
  function isGibberishBG(text) {
    let lower = text.toLowerCase();
    if (lower.length < 3) return true;
    if (/[бвгджзклмнпрстфхцчшщ]{5,}/.test(lower)) return true;
    if (/(.{2,4})\1{2,}/.test(lower)) return true;

    let keyboardPatterns = [
      "йцукенхгфгхгфаът;омнхгъеявесасгсдафдсфдсфшщз",
      "фываеядсфгдфврверяпроасдасдасгсеря3вервдсалдж",
      "ячсмевяветретдфгжасджигфдгерврвеяасзцбгдфтьбю",
    ];
    for (let pattern of keyboardPatterns)
      if (lower.includes(pattern)) return true;

    let vowels = lower.match(/[аеёиоуъюя]/g) || [];
    if (vowels.length / lower.length < 0.25) return true;

    return false;
  }

  // check if less than 3 characters
  if (userText.length < 3) {
    if (lang === "En")
      alert("Your question is too short. Please write at least 3 characters.");
    else alert("Въпросът е твърде кратък. Моля напишете поне 3 символа.");
    return;
  }

  // thinking
  if (lang === "En") answerDiv.textContent = "Thinking...";
  else answerDiv.textContent = "Мислене...";
  answerDiv.className = "thinking";
  askButton.disabled = true;

  // final answer
  setTimeout(function () {
    let list;
    if (lang === "En") list = responsesEn;
    else list = responsesBg;

    let randomIndex = Math.floor(Math.random() * list.length);
    answerDiv.textContent = list[randomIndex];
    answerDiv.className = "";
    questionInput.value = "";
    askButton.disabled = false;
  }, 1500);
}

// enter key
document
  .getElementById("questionEn")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") askMagic8Ball("En");
  });

document
  .getElementById("questionBg")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") askMagic8Ball("Bg");
  });

// check EN or BG and for additional symbols
function isEnglishText(text) {
  return /^[A-Za-z0-9 ?!.,'"-]*$/.test(text);
}

function isBulgarianText(text) {
  return /^[А-Яа-я0-9 ?!.,'"-]*$/.test(text);
}

// answers to pick from
let responsesEn = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes - definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
];

let responsesBg = [
  "Със сигурност.",
  "Определено е така.",
  "Без никакво съмнение.",
  "Да - определено.",
  "Можеш да разчиташ на това.",
  "Според мен – да.",
  "Най-вероятно.",
  "Перспективите са добри.",
  "Да.",
  "Знаците сочат „да“.",
  "Отговорът е неясен, опитай отново.",
  "Попитай по-късно.",
  "По-добре да не ти казвам сега.",
  "Не мога да предскажа сега.",
  "Концентрирай се и попитай пак.",
  "Не разчитай на това.",
  "Моят отговор е „не“.",
  "Източниците ми казват „не“.",
  "Перспективите не са много добри.",
  "Много съмнително.",
];
