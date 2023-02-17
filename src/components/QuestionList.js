import React, {useEffect,useState} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({firstquestions,handleDelete,isDeleted}) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, [firstquestions,isDeleted]);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            question={question}
            key={question.id}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
