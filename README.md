This is a simple Express-based API that provides endpoints for creating quizzes, submitting answers, and retrieving quiz results. 
The service does not require any external databases, as data is stored in-memory. This makes it simple and quick to get started, but note that data will be lost when the service is restarted.**

# Getting Started with the Quiz App:
This project was bootstrapped with https://github.com/expressjs/generator?tab=readme-ov-file

# Setup Instructions:
Follow the steps below to set up and run the service

- Clone the Repository to your local machine: 
  `git clone <repo_url>`, 
  `cd <repo_name>`

- Install Dependencies: 
`npm install`

- Access the Service: 
`npm start`

# API Endpoints

1. Create a new quiz: `POST http://localhost:3000/api/quiz`

Request body: 

{
    "title": "My Quiz App",
    "questions": [
        {   
            "id": 1,
            "question": "Is Asia in India?",
            "options": [
                "yes",
                "no",
                "dont know",
                "all of the above"
            ],
            "answer": "no"
        },
         {
             "id": 2,
            "question": "Sun rises in which direction?",
            "options": [
                "north",
                "south",
                "east",
                "west"
            ],
            "answer": "east"
        },
         { 
             "id": 3,
            "question": "Rainbow color?",
            "options": [
                "pink",
                "black",
                "white",
                "indigo"
            ],
            "answer": "indigo"
        }
    ]
}

Response:

"Quiz question submitted"

2. Get quiz by ID (without answers): `GET http://localhost:3000/api/quiz/1`

Response: 
{
    "id": 1,
    "title": "My Quiz App",
    "questions": [
        {
            "id": 1,
            "question": "Is Asia in India?",
            "options": [
                "yes",
                "no",
                "dont know",
                "all of the above"
            ]
        },
        {
            "id": 2,
            "question": "Sun rises in which direction?",
            "options": [
                "north",
                "south",
                "east",
                "west"
            ]
        },
        {
            "id": 3,
            "question": "Rainbow color?",
            "options": [
                "pink",
                "black",
                "white",
                "indigo"
            ]
        }
    ]
}

3. Submit Answer: `POST http://localhost:3000/api/quiz/1/question/1/userid/1`

Request body:
{
   "answer": "no"
}

Response: 
{
    "question_id": 1,
    "is_right_ans": true,
    "answer": "no"
}

4. Get Results: `GET http://localhost:3000/api/quiz/1/userId/1`

Response:
{
    "score": 2,
    "total_questions": 3
}


