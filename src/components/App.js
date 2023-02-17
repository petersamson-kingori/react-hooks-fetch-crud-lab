import React, { useState, useEffect} from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [firstquestions, setQuestions] = useState([]);
  const [isDeleted,setDeleted] = useState(false)
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, [firstquestions]);

  

  function handleSubmitted(formData) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => setQuestions([...firstquestions, data]));
      
  }
  
  

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(firstquestions.filter((question) => question.id !== id));
      setDeleted(!isDeleted)
    });
  }

  function handleUpdate(id, formData) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedQuestions = firstquestions.map((question) =>
          question.id === id ? data : question
        );
        setQuestions(updatedQuestions);
      });
  }
  
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleSubmitted={handleSubmitted}/> : <QuestionList questions={firstquestions} handleDelete={handleDelete} handleUpdate={handleUpdate} isDeleted={isDeleted} />}
    </main>
  );
}

export default App;
