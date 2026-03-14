"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const questions = [
  {
    questionText: "What is your level of understanding React?",
    answers: [
      { answerText: "Beginner", isCorrect: true, id: 1 },
      { answerText: "Intermediate", isCorrect: false, id: 2 },
      { answerText: "Advanced", isCorrect: false, id: 3 },
      { answerText: "Expert", isCorrect: false, id: 4 },
    ],
  },
  {
    questionText: "What is the virtual DOM in React?",
    answers: [
      { answerText: "A representation of the real DOM", isCorrect: true, id: 1 },
      { answerText: "A new JavaScript framework", isCorrect: false, id: 2 },
      { answerText: "A type of database", isCorrect: false, id: 3 },
      { answerText: "A CSS library", isCorrect: false, id: 4 },
    ],
  },
  {
    questionText: "What is JSX in React?",
    answers: [
      { answerText: "A syntax extension for JavaScript", isCorrect: true, id: 1 },  
      { answerText: "A new programming language", isCorrect: false, id: 2 },
      { answerText: "A type of API", isCorrect: false, id: 3 },
      { answerText: "A CSS preprocessor", isCorrect: false, id: 4 },
    ],
  }
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNext = () => {
    if(!started) {
    setStarted(true);
    }

    if(currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="flex flex-col flex-1">
    <main className="flex justify-center flex-1">
      {!started ?
       <h1 className="text-3xl font-bold">Welcome to the quizz page 👋</h1> 
      :
       <div>
        <h2 className="text-3xl font-bold">
          {questions[currentQuestion].questionText}
        </h2>
        <div className="grid grid-cols-1 gap-6 mt-6">
          {
            questions[currentQuestion].answers.map(answer => {
              return (
                <Button key={answer.id} variant={"secondary"} >
                  {answer.answerText}
                </Button>
              )
            })
          }
        </div>
      </div>}
    </main>
    <footer className="footer pb-9 px-6 relative mb-0 ">
      <Button onClick={handleNext}>{!started ? 'Start' : 'Next'}</Button>
    </footer>
    </div>
  )
}
