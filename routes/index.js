var express = require('express');
var app = express.Router();

let quizzes = []
let quizId = 1;
let questionId = 1;
let results = []

//Create a new quiz 
app.post('/api/quiz', (req, res) => {
  const { title, questions } = req.body;
  if (!title || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: 'Invalid quiz data' });
  }
  const quiz = {
    id: quizId++,
    title: title,
    questions: questions
  }
  quizzes.push(quiz);
  res.json('Quiz question submitted')
})

const getQuizById = (quizId) => quizzes.find(q => q.id === quizId);

//Get Quiz by Id (without answers)
app.get('/api/quiz/:quizId', (req, res) => {
  const quizId = parseInt(req.params.quizId);
  const quiz = getQuizById(quizId);
  const quizWithoutAnswers = {
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions.map(({ answer, ...rest }) => rest)
  };
  res.json(quizWithoutAnswers);
});

const getResultByQuizAndUser = (quizId, userId) => results.find(result => result.quiz_id === quizId && result.user_id === userId);

//Submit Answer
app.post('/api/quiz/:quizId/question/:questionId/userId/:userId', (req, res) => {
  const quizId = parseInt(req.params.quizId)
  const userId = parseInt(req.params.userId);
  const quiz = getQuizById(quizId);
  const qtnId = parseInt(req.params.questionId)
  const { answer } = req.body;
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }
  const question = quiz.questions.find(qtn => qtn.id === qtnId)
  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }
  const isRightAnswer = answer === question.answer;
  let result = getResultByQuizAndUser(quizId, userId);
  if (!result) {
    result = {
      quiz_id: quizId,
      user_id: userId,
      score: 0,
      answers: [],
      questionId: qtnId
    };
    results.push(result);
  }
  result.answers.push(answer);
  if (isRightAnswer) {
    result.score++;
  }
  const feedback = {
    question_id: questionId,
    is_right_ans: isRightAnswer,
    answer: question.answer
  };
  res.json(feedback);
})

//Get Results
app.get('/api/quiz/:quizId/userId/:userId', (req, res) => {
  const quizId = parseInt(req.params.quizId)
  const userId = parseInt(req.params.userId);
  const result = getResultByQuizAndUser(quizId, userId);
  if (!result) {
    return res.status(404).json({ message: 'Result not found' });
  }
  console.log(result)
  console.log(result.answers)
  res.json({
    score: result.score,
    total_questions: result.answers.length
  });
});

module.exports = app;
