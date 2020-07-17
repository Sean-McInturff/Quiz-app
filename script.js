const STORE = {
  questions: [//1
    {
      question: "Where is coffee grown?",
      options: [
        "South America",
        "Africa",
        "South-east Asia",
        "All of the above"
      ],
      answer: "All of the above"
    },
    //2
    {
      question: "how many cups of coffee are consumed everyday worldwide?",
      options: [
        "2 billion",
        "5 million",
        "100 million",
        "6"
      ],
      answer: "2 billion"
    },
    //3
    {
      question: "what percentage of Americans drink coffee daily?",
      options: [
        "75%",
        "45%",
        "64%",
        "36%"
      ],
      answer: "64%"
    },
    //4
    {
      question: "What are the main two types of coffee?",
      options: [
        "Arabica and Giorno",
        "Robusta and Espresso",
        "Giorno and Yirgacheffe",
        "Arabica and Robusta"
      ],
      answer: "Arabica and Robusta"
    },
    //5
    {
      question: "How much caffeine(on average) is in one cup of coffee?",
      options: [
        "50 mg",
        "100 mg",
        "150 mg",
        "200 mg"
      ],
      answer: "100 mg"
    },
    //6
    {
      question: "How long does it take for a coffee tree to mature enough to produce it's first crop?",
      options: [
        "12 weeks",
        "24 weeks",
        "2 years",
        "5 years"
      ],
      answer: "5 years"
    },
    //7
    {
      question: "What are the two ingredients of an Americano?",
      options: [
        "Espresso and water",
        "Coffee and milk",
        "Espresso and milk",
        "Espresso and foam"
      ],
      answer: "Espresso and water"
    },
    //8
    {
      question: "What percentage of coffee is consumed during breakfast hours?",
      options: [
        "35%",
        "65%",
        "82%",
        "90%"
      ],
      answer: "65%"
    },
    //9
    {
      question: "Where do coffee beans come from?",
      options: [
        "A seed",
        "A plant",
        "Inside a pod",
        "Red berries"
      ],
      answer: "Red berries"
    },
    //10
    {
      question: "Which store sells the most coffee?",
      options: [
        "Dunkin' Donuts",
        "Starbucks",
        "7-11",
        "McDonalds"
      ],
      answer: "McDonalds"
    },
  ],
  score: 0,
  currentQuestion: 0
};

// Start the quiz when 'Start quiz' button is clicked
function startQuiz() {
  $('#start').on('click', function (event) {
    displayQuestion();
  }
  );
}

//change the score and question counter
function updateScoreAndQuestionCounter() {
  const html = $(`<ul>
    <li id ="js-question-Counter"><b>Question: ${STORE.currentQuestion + 1}
        /${STORE.questions.length}</b></li>
          <li id = "js-score-counter"><b>Score: ${STORE.score}/${STORE.questions.length}
          </b></li>
          </ul>`
  );
  $(".questions-score").html(html);
}

//show options for the current question
function showOptions() {
  let questions = STORE.questions[STORE.currentQuestion];
  for (let i = 0; i < questions.options.length; i++) {
    $('.js-options').append(`
            <li><input type = "radio" name="options" id="option${i + 1}" value = "${questions.options[i]}" tabIndex="${i + 1}">
            <label for="option${i + 1}"> ${questions.options[i]}</label>
            <span class="response" id="js-r${i + 1}"></span></li>`
    );
  }
}

//create the template for the question form
function generateQuestionTemplate(question) {
  let template =
    `<div>
        <form id="js-questions" class= "question-form">

        <fieldset>
            <div class="container-question">
                <div class="item">
                <h3> ${question}</h3>
                </div>
            </div>

            <div class = "container-options">
                <div class ="item">
                    <div>
                    <ul class = "js-options">
                    </ul>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class = "item">
                    <button type ="submit" id="submit-answer" tabindex="5">Submit</button>
                    <button type = "button" id = "next" tabindex="6">Next Question</button>
                </div>
            </div>
        </fieldset>
        </form>
    </div>`;
  return template
}

//Shows the current question
function displayQuestion() {
  let question = STORE.questions[STORE.currentQuestion];
  updateScoreAndQuestionCounter();

  $("main").html(generateQuestionTemplate(question.question));
  showOptions();
  $("#next").hide();
};


//Show results and restart button
function showResults() {
  let resultHtml = $(`<div class = 'results'>
        <form id ="js-restart-quiz">
            <fieldset>
                <div class ="content">
                    <div class="item">
                        <h3> You scored: ${STORE.score}/${STORE.questions.length}!</h3>
                    </div>
                </div>

                <div class ="content">
                    <div class = "item">
                        <button type="button" id="restart"> Restart Quiz </button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>`
  );
  STORE.currentQuestion = 0;
  STORE.score = 0;
  $("main").html(resultHtml);
}

//check if end of quiz
function endOfQuestions() {
  $('body').on('click', '#next', (event) => {
    STORE.currentQuestion === STORE.questions.length ? showResults() :
      displayQuestion();
  });
}

//check whether the answer selected is right or wrong and display a responsive message
function checkResponse() {
  $('body').on("submit", '#js-questions', function (event) {
    event.preventDefault();
    let currentQuestion = STORE.questions[STORE.currentQuestion];
    let selectedresponse = $("input[name=options]:checked").val();
    if (!selectedresponse) {
      alert("select a response");
      return;
    }
    let id_num = currentQuestion.options.findIndex(i => i === selectedresponse);
    let id = "#js-r" + ++id_num;
    $('span').removeClass("correct incorrect");
    if (selectedresponse === currentQuestion.answer) {
      STORE.score++;
      $(`${id}`).append(`<b>Correct!</b>`);
      $(`${id}`).addClass("correct");
    }
    else {
      $(`${id}`).append(`<b>Incorrect =(</br> The correct answer is "${currentQuestion.answer}"</b>`);
      $(`${id}`).addClass("incorrect");
    }

    STORE.currentQuestion++;
    $("#js-score-counter").text(`Score: ${STORE.score}/${STORE.questions.length}`);
    $("#submit-answer").hide();
    $("input[type=radio]").attr("disabled", true);
    $('#next').show();
  });
}

//restart button
function restartQuiz() {
  $('body').on('click', '#restart', (event) => {
    displayQuestion();
  });
}

function runQuizApp() {
  startQuiz();
  endOfQuestions();
  checkResponse();
  restartQuiz();
}

$(runQuizApp);