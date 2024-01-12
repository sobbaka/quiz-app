import { useEffect, useReducer } from "react"
import hexToRgba from 'hex-to-rgba';
import he from 'he';

import StartScreen from "./components/StartScreen"
import Question from "./components/Question"
import FinalScreen from "./components/FinalScreen"
import Timer from "./components/Timer";
import Loader from "./components/Loader";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  userAnswer: null,
  background: null,
  answers: [],
  points: 0,
  highscore: 0,
  time: 30
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, status: action.payload }
    case 'dataReceived':
      return { ...state, status: 'ready', questions: action.payload, time: 60 * action.payload.length, background: null }
    case 'restart':
      return { ...state, status: 'ready', questions: action.payload, time: 60 * action.payload.length, index: 0, userAnswer: null, points: 0, background: null }
    case 'dataFailed':
      return { ...state, status: 'loading' }
    case 'active':
      return { ...state, status: 'active' }
    case 'tick':
      return { ...state, time: state.time - 1, status: state.time < 0 ? 'finished' : state.status }
    case 'setBackground':
      return { ...state, background: hexToRgba(action.payload, '0.4') }
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
        points: he.decode(action.payload) === he.decode(state.questions[state.index].correct_answer) ?
          state.points + 1 :
          state.points
      }
    case 'error':
      return { ...state }
    default:
      return { ...state }
  }
}


function App() {
  const [{ questions, status, index, answers, userAnswer, points, highscore, time, background }, dispatch] = useReducer(reducer, initialState)

  useEffect(function () {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=15&category=11&difficulty=easy&type=multiple');
        if (response.status === 429) {
          // Handle rate limiting by waiting for a certain period before retrying
          await new Promise(resolve => setTimeout(resolve, 5000));
          fetchData();
        } else if (response.ok) {
          const data = await response.json();
          dispatch({ type: 'dataReceived', payload: data.results });
        } else {
          dispatch({ type: 'dataFailed' });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch({ type: 'dataFailed' });
      }
    };

    fetchData();
  }, [])

  // container p-3 d-flex align-items-center  rounded-3 p-3  
  return (
    <div className={`wrapper ${status === 'finished' ? 'custom__finish' : ''} ${status === 'ready' ? 'custom__start' : ''}`}>
      <div className={`main`} style={{ backgroundColor: background }}>
        <div className='container p-3 d-flex justify-content-center align-items-center flex-column'>
          <div className="window d-flex justify-content-center align-items-center flex-column p-3 rounded">
            {status === 'loading' && <Loader />}
            {status === 'ready' && <StartScreen dispatch={dispatch} />}
            {status === 'active' &&
              <>
                <Timer time={time} dispatch={dispatch} />
                <Question dispatch={dispatch} questions={questions} index={index} userAnswer={userAnswer} answers={answers} />
                <h6 className="mt-2">Your score is {points}</h6>
              </>
            }
            {status === 'loadFailed' && <h2>Data load failed</h2>}
            {status === 'finished' && <FinalScreen points={points} highscore={highscore} dispatch={dispatch} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App