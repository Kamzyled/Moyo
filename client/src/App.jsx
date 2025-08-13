import React, { useState } from 'react';

const Welcome = ({ onStart }) => (
  <div style={{ textAlign: 'center', maxWidth: 450, padding: 20 }}>
    <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 10, color: '#ec4899' }}>Moyosola</h1>
    <p style={{ fontSize: 20, marginBottom: 30 }}>Welcome to your personalized Love Quiz 💖</p>
    <button
      onClick={onStart}
      style={{
        backgroundColor: '#8a2be2',
        border: 'none',
        padding: '15px 40px',
        fontSize: 18,
        color: 'white',
        borderRadius: 8,
        cursor: 'pointer',
        boxShadow: '0 8px 15px rgba(138, 43, 226, 0.3)',
        transition: '0.3s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#6b21a8')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#8a2be2')}
    >
      Start Quiz
    </button>
  </div>
);

const Quiz = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentIndex];

  const handleChoice = choice => {
    setSelected(choice);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, { questionId: currentQuestion.id, answer: selected }];
    setAnswers(newAnswers);
    setSelected(null);
    if (currentIndex + 1 === questions.length) {
      onComplete(newAnswers);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, textAlign: 'center' }}>
      <h2 style={{ marginBottom: 20 }}>{currentQuestion.question}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
        {currentQuestion.choices.map(choice => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            style={{
              backgroundColor: selected === choice ? '#ec4899' : '#6b21a8',
              border: 'none',
              padding: '12px 20px',
              color: 'white',
              fontSize: 16,
              borderRadius: 6,
              cursor: 'pointer',
              boxShadow: selected === choice ? '0 4px 8px rgba(236, 72, 153, 0.5)' : 'none',
              transition: '0.3s ease',
            }}
          >
            {choice}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={selected === null}
        style={{
          backgroundColor: selected === null ? '#bbb' : '#8a2be2',
          border: 'none',
          padding: '12px 40px',
          fontSize: 18,
          color: 'white',
          borderRadius: 8,
          cursor: selected === null ? 'not-allowed' : 'pointer',
          boxShadow: selected !== null ? '0 6px 12px rgba(138, 43, 226, 0.3)' : 'none',
          transition: '0.3s ease',
        }}
      >
        {currentIndex + 1 === questions.length ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};

const Results = ({ questions, answers, onRestart }) => {
  const score = answers.reduce((acc, ans) => {
    const question = questions.find(q => q.id === ans.questionId);
    if (question && question.answer === ans.answer) return acc + 1;
    return acc;
  }, 0);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, textAlign: 'center' }}>
      <h2 style={{ fontSize: 32, marginBottom: 20 }}>
        Your Score: {score} / {questions.length}
      </h2>
      <div style={{ textAlign: 'left', marginBottom: 30 }}>
        {questions.map(q => {
          const userAns = answers.find(a => a.questionId === q.id)?.answer;
          const correct = q.answer === userAns;
          return (
            <div key={q.id} style={{ marginBottom: 12 }}>
              <p>
                <strong>{q.question}</strong>
              </p>
              <p>
                Your answer:{' '}
                <span style={{ color: correct ? '#34d399' : '#f87171' }}>{userAns || 'No answer'}</span>
              </p>
              <p>Correct answer: {q.answer}</p>
            </div>
          );
        })}
      </div>
      <button
        onClick={onRestart}
        style={{
          backgroundColor: '#8a2be2',
          border: 'none',
          padding: '12px 40px',
          fontSize: 18,
          color: 'white',
          borderRadius: 8,
          cursor: 'pointer',
          boxShadow: '0 6px 12px rgba(138, 43, 226, 0.3)',
          transition: '0.3s ease',
        }}
      >
        Restart Quiz
      </button>
    </div>
  );
};

const questions = [
  {
    id: 1,
    question: "What's your lover's favorite color?",
    choices: ['Red', 'Pink', 'Purple', 'Blue'],
    answer: 'Pink',
  },
  {
    id: 2,
    question: 'What do they enjoy the most?',
    choices: ['Reading', 'Traveling', 'Cooking', 'Dancing'],
    answer: 'Traveling',
  },
  {
    id: 3,
    question: 'Which gift would they prefer?',
    choices: ['Flowers', 'Chocolates', 'Jewelry', 'Books'],
    answer: 'Jewelry',
  },
];

function App() {
  const [stage, setStage] = useState('welcome');
  const [quizAnswers, setQuizAnswers] = useState([]);

  const startQuiz = () => setStage('quiz');
  const finishQuiz = answers => {
    setQuizAnswers(answers);
    setStage('results');
  };
  const restartQuiz = () => {
    setQuizAnswers([]);
    setStage('welcome');
  };

  return (
    <>
      {stage === 'welcome' && <Welcome onStart={startQuiz} />}
      {stage === 'quiz' && <Quiz questions={questions} onComplete={finishQuiz} />}
      {stage === 'results' && <Results questions={questions} answers={quizAnswers} onRestart={restartQuiz} />}
    </>
  );
}

export default App;
