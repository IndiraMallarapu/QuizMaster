
import { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8080/Quiz';

function App() {
  const [category, setCategory] = useState('Java');
  const [numq, setNumq] = useState(5);
  const [title, setTitle] = useState('Java Quiz');

  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Create a quiz and fetch its questions
  const createQuiz = async () => {
    if (!title.trim() || Number(numq) < 1) {
      setMessage('Please enter a title and a valid number of questions.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      setQuizId(null);
      setQuestions([]);
      setAnswers({});
      setScore(null);

      const response = await axios.post(
        `${API_URL}/Create`,
        null,
        {
          params: {
            category,
            numq: Number(numq),
            title: title.trim()
          }
        }
      );

      const id = response.data;
      setQuizId(id);

      const questionResponse = await axios.get(
        `${API_URL}/quiz/${id}`
      );

      setQuestions(questionResponse.data);
      setMessage(`Quiz "${title}" created successfully!`);
    } catch (error) {
      console.error('Quiz creation error:', error);

      setMessage(
        error.response
          ? `Server error: ${error.response.status}`
          : 'Could not connect to the backend. Check Spring Boot and CORS.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Store the selected answer for each question
  const selectAnswer = (questionId, answer) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [questionId]: answer
    }));
  };

  // Submit answers and receive the score
  const submitQuiz = async () => {
    if (Object.keys(answers).length !== questions.length) {
      setMessage('Please answer every question before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      setMessage('');

      const responses = questions.map((question) => ({
        id: question.id,
        response: answers[question.id]
      }));

      const result = await axios.post(
        `${API_URL}/submit/${quizId}`,
        responses
      );

      setScore(result.data);
      setMessage('Quiz submitted successfully!');
    } catch (error) {
      console.error('Quiz submission error:', error);

      setMessage(
        error.response
          ? `Submission failed: ${error.response.status}`
          : 'Could not connect to the backend.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">
      <header className="navbar">
        <h2>QuizMaster</h2>
        <span>Test Your Knowledge</span>
      </header>

      <main className="quiz-container">
        <h1>Welcome to QuizMaster!</h1>
        <p>
          Challenge yourself and test your programming knowledge.
        </p>

        {/* Quiz creation form */}
        <div className="quiz-card">
          <h2>Create Your Quiz</h2>

          <label htmlFor="category">Select Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading || submitting}
          >
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="SQL">SQL</option>
          </select>

          <label htmlFor="numq">Number of Questions</label>
          <input
            id="numq"
            type="number"
            min="1"
            value={numq}
            onChange={(e) => setNumq(e.target.value)}
            disabled={loading || submitting}
          />

          <label htmlFor="title">Quiz Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading || submitting}
          />

          <button
            type="button"
            onClick={createQuiz}
            disabled={loading || submitting}
          >
            {loading ? 'Loading...' : 'Create Quiz'}
          </button>

          {message && <p role="status">{message}</p>}
        </div>

        {/* Display quiz questions */}
        {quizId !== null && questions.length > 0 && (
          <section className="questions-section">
            <h2>{title}</h2>
            <p>Quiz ID: {quizId}</p>

            {questions.map((question, index) => (
              <div className="question-card" key={question.id}>
                <h3>
                  {index + 1}. {question.questionTitle}
                </h3>

                {[1, 2, 3, 4].map((optionNumber) => {
                  const option =
                    question[`option${optionNumber}`];

                  return (
                    <label
                      className="option"
                      key={optionNumber}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={
                          answers[question.id] === option
                        }
                        onChange={() =>
                          selectAnswer(question.id, option)
                        }
                        disabled={score !== null || submitting}
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            ))}

            {/* Submit button appears once, after all questions */}
            <button
              type="button"
              onClick={submitQuiz}
              disabled={submitting || score !== null}
            >
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>

            {/* Display the final score */}
            {score !== null && (
              <div className="result-card">
                <h2>Quiz Completed!</h2>
                <p>
                  Your Score: {score} / {questions.length}
                </p>
              </div>
            )}
          </section>
        )}

        {quizId !== null &&
          questions.length === 0 &&
          !loading && (
            <p>No questions were returned for this quiz.</p>
          )}
      </main>
    </div>
  );
}

export default App;
