"use client";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const CoursePage = ({ params }) => {
  const router = useRouter();

  const [questions, setQuestions] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<
    { id: number; option: string }[]
  >([]);

  const { id } = use(params);
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/course/${id}`
      );
      const data = await response.data;
      setQuestions(data.questions.questions);
      if (data.answers?.answers) {
        setSelectedAnswers(data.answers.answers);
      }
    };
    fetchQuestions();
  }, []);

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

  const handleSave = async () => {
    let marks = 0;
    selectedAnswers.forEach((item) => {
      if (item.option === questions[item.id].correct) {
        marks++;
      }
    });

    const progress = selectedAnswers.length;
    const data = {
      selectedAnswers,
      score: marks,
      progress,
    };
    await axios.post(`http://localhost:3000/api/course/${id}`, data);
    router.push("/");
  };

  if (questions) {
    return (
      <div className="px-4 flex flex-col gap-4 pb-4 mx-auto">
        {questions?.map((item, index) => (
          <div key={index} className="border-2 rounded-xl px-3 py-4">
            <h1>{item.question}</h1>
            <RadioGroup
              className="px-3 mt-2"
              onValueChange={(value) => handleSelectAnswer(item.id, value)}
            >
              {item.answers.map((answer, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={answer}
                    id={answer}
                    checked={
                      selectedAnswers &&
                      answer === selectedAnswers[item.id]?.option
                    }
                  />
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
  } else {
    return <Loader2 className="animate-spin mx-auto" />;
  }
};
export default CoursePage;
