const request = require('supertest');
const express = require('express');
const app = require('./app');

describe('Quiz API', () => {
  let quizId; 
  
  //Creating a quiz
  it('should create a new quiz successfully', async () => {
    const response = await request(app)
      .post('/api/quiz')
      .send({
        title: 'General Knowledge',
        questions: [
          { id: 1, question: 'What is 2 + 2?', answer: '4' },
          { id: 2, question: 'What is the capital of France?', answer: 'Paris' }
        ]});
    expect(response.status).toBe(200);
    expect(response.body).toBe('Quiz question submitted');
    const quiz = await request(app).get('/api/quiz/1');
    quizId = quiz.body.id; 
  });
  
  //Get Quiz by Id (without answers)
  it('should get a quiz by ID without answers', async () => {
    const response = await request(app).get(`/api/quiz/${quizId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(quizId);
    expect(response.body.title).toBe('General Knowledge');
    expect(response.body.questions).toHaveLength(2);
    expect(response.body.questions[0].answer).toBeUndefined();
    expect(response.body.questions[1].answer).toBeUndefined();
  });
  
  //Submit Answer
  it('should submit an answer and return correct feedback', async () => {
    const response = await request(app)
      .post(`/api/quiz/${quizId}/question/1/userId/1`)
      .send({ answer: '4' });
    expect(response.status).toBe(200);
    expect(response.body.is_right_ans).toBe(true);
    expect(response.body.answer).toBe('4');
  });

  it('should submit an incorrect answer and return feedback', async () => {
    const response = await request(app)
      .post(`/api/quiz/${quizId}/question/2/userId/1`)
      .send({ answer: 'London' });
    expect(response.status).toBe(200);
    expect(response.body.is_right_ans).toBe(false);
    expect(response.body.answer).toBe('Paris');
  });

  //Get Results
  it('should get the quiz results for a user', async () => {
    await request(app).post(`/api/quiz/${quizId}/question/1/userId/1`).send({ answer: '4' });
    await request(app).post(`/api/quiz/${quizId}/question/2/userId/1`).send({ answer: 'London' });
    const response = await request(app).get(`/api/quiz/${quizId}/userId/1`);
    expect(response.status).toBe(200);
    expect(response.body.score).toBe(1); 
    expect(response.body.total_questions).toBe(2); 
  });

  //Invalid quiz creation (missing title)
  it('should return error for invalid quiz creation', async () => {
    const response = await request(app)
      .post('/api/quiz')
      .send({
        questions: [
          { id: 1, question: 'What is 2 + 2?', answer: '4' }
        ]
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid quiz data');
  });

  //Submitting an answer for a non-existing quiz
  it('should return error for non-existing quiz', async () => {
    const response = await request(app)
      .post('/api/quiz/999/question/1/userId/1')
      .send({ answer: '4' });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Quiz not found');
  });

  // Submitting an answer for a non-existing question
  it('should return error for non-existing question', async () => {
    const response = await request(app)
      .post(`/api/quiz/${quizId}/question/999/userId/1`)
      .send({ answer: '4' });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Question not found');
  });
  
  //Retrieving results for a non-existing user
  it('should return error when retrieving results for non-existing user', async () => {
    const response = await request(app).get(`/api/quiz/${quizId}/userId/999`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Result not found');
  });
});
