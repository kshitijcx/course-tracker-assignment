"use client";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const questions = [
  {
    id: 0,
    question: "What is 2+2?",
    answers: ["1", "2", "3", "4"],
    correct: "4",
  },
  {
    id: 1,
    question: "What is 2+2?",
    answers: ["1", "2", "3", "4"],
    correct: "4",
  },
  {
    id: 2,
    question: "What is 2+2?",
    answers: ["1", "2", "3", "4"],
    correct: "4",
  },
  {
    id: 3,
    question: "What is 2+2?",
    answers: ["1", "2", "3", "4"],
    correct: "4",
  },
  {
    id: 4,
    question: "What is 2+2?",
    answers: ["1", "2", "3", "4"],
    correct: "4",
  },
  {
    id: 5,
    question: "What is 2+2?",
    answers: ["1", "2", "3", "4"],
    correct: "4",
  },
  {
    id: 6,
    question: "What is 2+2?",
    answers: ["1", "2", "3", "4"],
    correct: "4",
  },
  {
    id: 7,
    question: "What is 2+2?",
    answers: ["1", "2", "3", "4"],
    correct: "4",
  },
  {
    id: 8,
    question: "What is 2+2?",
    answers: ["1", "2", "3", "4"],
    correct: "3",
  },
];

const CoursePage = ({ params }: { params: { id: string } }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    { id: number; option: string }[]
  >([]);
  const [score, setScore] = useState(0);

  const handleSelectAnswer = (id: number, option: string) => {
    setSelectedAnswers((prevAnswers) => {
      const found = prevAnswers.findIndex((item) => item.id === id);
      if (found !== -1) {
        const updatedList = [...prevAnswers];
        const foundItem = updatedList[found];
        updatedList[found] = { ...foundItem, option };
        return updatedList;
      } else {
        return [...prevAnswers, { id, option }];
      }
    });
  };

  const handleSave = () => {
    let marks = 0;
    selectedAnswers.forEach((item) => {
      if (item.option === questions[item.id].correct) {
        marks++;
      }
    });
    setScore(marks);
    console.log(marks);
  };

  return (
    <div className="px-4 flex flex-col gap-4 pb-4 mx-auto">
      {questions.map((item, index) => (
        <div key={index} className="border-2 rounded-xl px-3 py-4">
          <h1>{item.question}</h1>
          <RadioGroup
            className="px-3 mt-2"
            onValueChange={(value) => handleSelectAnswer(item.id, value)}
          >
            {item.answers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={answer} id={answer} />
                <label>{answer}</label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
      <Button className="sm:max-w-fit mx-auto" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};
export default CoursePage;
