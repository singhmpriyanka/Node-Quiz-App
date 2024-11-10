1. Create a new quiz
POST http://localhost:3000/api/quiz
Request: 
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

2. Get quiz by ID (without answers)
GET http://localhost:3000/api/quiz/1
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

3. Submit Answer
POST http://localhost:3000/api/quiz/1/question/1/userid/1
Request:
{
   "answer": "no"
}

Response: 
{
    "question_id": 1,
    "is_right_ans": true,
    "answer": "no"
}

4. Get Results
GET http://localhost:3000/api/quiz/1/userId/1
Response:
{
    "score": 2,
    "total_questions": 3
}


