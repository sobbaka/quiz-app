import { useEffect, useReducer } from "react"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"
import FinalScreen from "./components/FinalScreen"

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  userAnswer: null,
  answers: [],
  points: 0,
  highscore: 0,
  time: 30
}

function reducer(state, action) {

  switch (action.type) {
    case 'loading':
      return { ...state }
    case 'dataReceived':
      return { ...state, status: 'ready', questions: action.payload, time: 30 * action.payload.length }
    case 'restart':
      return { ...state, status: 'ready', questions: action.payload, time: 30 * action.payload.length, index: 0, userAnswer: null, points: 0 }
    case 'dataFailed':
      return { ...state, status: 'loadFailed' }
    case 'active':
      return { ...state, status: 'active' }
    case 'setAnswers':
      return { ...state, answers: action.payload, userAnswer: null }
    case 'finish':
      return { ...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore }
    case 'nextQuestion':
      return { ...state, index: state.index + 1 }
    case 'answer':
      return {
        ...state,
        userAnswer: action.payload,
        points: action.payload === state.questions[state.index].correct_answer ?
          state.points + 1 :
          state.points
      }
    case 'error':
      return { ...state }
    default:
      return { ...state }
  }
}

// 

function App() {

  const [{ questions, status, index, answers, userAnswer, points, highscore }, dispatch] = useReducer(reducer, initialState)

  useEffect(function () {

    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=15&category=11&difficulty=easy&type=multiple');

        if (response.status === 429) {
          // Handle rate limiting by waiting for a certain period before retrying
          await new Promise(resolve => setTimeout(resolve, 5000)); // You can adjust the delay as needed
          fetchData(); // Retry the request
        } else if (response.ok) {
          const data = await response.json();
          dispatch({ type: 'dataReceived', payload: data.results });
        } else {
          // Handle other errors
          dispatch({ type: 'dataFailed' });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch({ type: 'dataFailed' });
      }
    };

    fetchData();
  }, [])




  return (
    <>

      <div className="container d-flex flex-column align-items-center mx-auto">
        {status === 'ready' && <StartScreen dispatch={dispatch} />}
        {status === 'active' &&
          <>
            <Question dispatch={dispatch} questions={questions} index={index} userAnswer={userAnswer} answers={answers} />
            <h6 className="mt-2">Your score is {points}</h6>
          </>
        }
        {status === 'loadFailed' && <h2>Data load failed</h2>}
        {status === 'finished' && <FinalScreen points={points} highscore={highscore} dispatch={dispatch} />}
      </div>
    </>
  )
}

export default App
