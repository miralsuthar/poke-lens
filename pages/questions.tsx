import { useEffect, useState } from "react";
import { findDuplicates } from "../utils/helper";

type TOptions = {
  id: number;
  text: string;
  type: "Fire" | "Water" | "Grass" | "Electric";
};

type TQuestions = {
  text: string;
  id: number;
  options: TOptions[];
};

const questions = [
  {
    id: 1,
    text: "How would you describe your energy level during social gatherings?",
    options: [
      {
        id: 0,
        text: "I'm often the calm and composed one, observing and listening.",
        type: "Grass",
      },
      {
        id: 1,
        text: "I'm usually the one spreading excitement and getting people engaged.",
        type: "Electric",
      },
      {
        id: 2,
        text: "I bring a warm and welcoming presence, making people feel comfortable.",
        type: "Fire",
      },
      {
        id: 3,
        text: "I adapt to the energy of the group, finding my balance between active participation and reflection.",
        type: "Water",
      },
    ],
  },
  {
    id: 2,
    text: "When faced with challenges, what's your typical approach?",
    options: [
      {
        id: 0,
        text: "I focus on finding practical solutions and adapting to the situation.",
        type: "Water",
      },
      {
        id: 1,
        text: "I tackle them with enthusiasm and a positive attitude.",
        type: "Electric",
      },
      {
        id: 2,
        text: "I approach them with determination and a sense of purpose.",
        type: "Fire",
      },
      {
        id: 3,
        text: "I prefer to analyze the situation before taking action, maintaining a sense of inner calm.",
        type: "Grass",
      },
    ],
  },
  {
    id: 3,
    text: "Which activity resonates with you the most?",
    options: [
      {
        id: 0,
        text: "Spending time in a garden or natural setting.",
        type: "Grass",
      },
      {
        id: 1,
        text: "Dancing and enjoying lively social events.",
        type: "Electric",
      },
      {
        id: 2,
        text: "Pursuing a creative endeavor or passionately discussing a topic.",
        type: "Fire",
      },
      {
        id: 3,
        text: "Relaxing by the water or engaging in peaceful, introspective activities.",
        type: "Water",
      },
    ],
  },
  {
    id: 4,
    text: "How do you usually provide support to your friends?",
    options: [
      {
        id: 0,
        text: "By offering practical advice and a listening ear.",
        type: "Grass",
      },
      {
        id: 1,
        text: "By boosting their spirits and bringing excitement to their lives.",
        type: "Electric",
      },
      {
        id: 2,
        text: "By encouraging them to pursue their passions and stay determined.",
        type: "Fire",
      },
      {
        id: 3,
        text: "By providing a calming presence and helping them find balance.",
        type: "Water",
      },
    ],
  },
  {
    id: 5,
    text: "Which element resonates with you the most?",
    options: [
      {
        id: 0,
        text: "Earth (plants, grounding, stability)",
        type: "Grass",
      },
      {
        id: 1,
        text: "Lightning (energy, excitement, enthusiasm)",
        type: "Electric",
      },
      {
        id: 2,
        text: "Fire (passion, determination, warmth)",
        type: "Fire",
      },
      {
        id: 3,
        text: "Water (adaptability, tranquility, emotional depth)",
        type: "Water",
      },
    ],
  },
];

const StepForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [showCategory, setShowCategory] = useState<boolean>(false);

  const chooseAnswer = (type: string) => {
    setAnswers([...answers, type]);
  };

  useEffect(() => {
    console.log(answers);
    if (answers.length === 5) {
      setCategory(findDuplicates(answers)[0]);
    }
  }, [answers]);

  const categoryName = (category: string) => {
    if (category === "Water") {
      return "Aquatide";
    } else if (category === "Fire") {
      return "Pyroflame";
    } else if (category === "Electric") {
      return "Volttide";
    } else {
      return "Floraforge";
    }
  };

  return (
    <main className="h-screen flex justify-center items-center">
      {!showCategory ? (
        <div className="text-center space-y-14 bg-slate-900 p-14 rounded-xl">
          <h1 className="text-xl">
            {currentQuestion + 1}. {questions[currentQuestion].text}
          </h1>
          <ul className="space-y-5">
            {questions[currentQuestion].options.map((option) => (
              <li
                key={option.id}
                className="p-2 bg-slate-700 rounded-md hover:bg-slate-500 cursor-pointer transition-all"
                onClick={() => {
                  chooseAnswer(option.type);
                  if (currentQuestion < 4) {
                    setCurrentQuestion((prev) => prev + 1);
                  } else {
                    setShowCategory(true);
                  }
                }}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-slate-900 p-5 rounded-xl text-center flex flex-col gap-5">
          <p>Your are the type of </p>
          {category === "Fire" ? (
            <span>🔥</span>
          ) : category === "Water" ? (
            <span>💧</span>
          ) : category === "Grass" ? (
            <span>☘️</span>
          ) : (
            <span>⚡️</span>
          )}
          <span className="text-2xl">{categoryName(category)}</span>
        </div>
      )}
    </main>
  );
};

export default StepForm;
