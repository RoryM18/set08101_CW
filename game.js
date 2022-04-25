const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestion = {};

var mySound

let questions = [
    {
        question: "Eminem's 8 Mile is named after a road in which city?",
        choice1: 'Chicago',
        choice2: 'Portland',
        choice3: 'Detroit',
        choice4: 'Seattle',
        answer: 3,
    },
    {
        question: 'The Weeknd samples which 80s megahit in “Blinding Lights?”',
        choice1: '“Take On Me” by A-ha',
        choice2: '"Never Gonna Give You Up" Rick Astley',
        choice3: '"Sweet Child O Mine" Guns N Roses',
        choice4: '"Livin On A Prayer" Bon Jovi',
        answer: 1,
    },
    {
        question: "What artists recorded two of their bestselling albums while they were behind bars?",
        choice1: 'Tupac',
        choice2: 'Metalica',
        choice3: 'The Beatles',
        choice4: 'Johnny Cash',
        answer: 4,
    },
    {
        question: "Which classical composer was deaf?",
        choice1: 'Johann Sebastian Bach ',
        choice2: 'Ludwig van Beethoven',
        choice3: 'Igor Stravinsky',
        choice4: 'Wolfgang Amadeus Mozart',
        answer: 2,
    },
    {
        question: 'Which astronomer is namedropped in “Bohemian Rhapsody?”',
        choice1: 'Galileo Galilei',
        choice2: 'Isaac Newton',
        choice3: 'Nicolaus Copernicus',
        choice4: 'Tycho Brahe',
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestion = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/set08101_CW/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestion.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selcetedAnswer = selectedChoice.dataset['number']

        let classToApply = selcetedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
            mySound = new Audio("/set08101_CW/audio/correct.wav")

            mySound.play()
        }
        if(classToApply === 'incorrect') {
            mySound = new Audio("/set08101_CW/audio/wrong.wav")

            mySound.play()
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()