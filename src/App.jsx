import { useEffect, useReducer } from "react"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"

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
    case 'dataFailed':
      return { ...state, status: 'loadFailed' }
    case 'active':
      return { ...state, status: 'active' }
    case 'setAnswers':
      return { ...state, answers: action.payload, userAnswer: null }
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

  const [{ questions, status, index, answers, userAnswer }, dispatch] = useReducer(reducer, initialState)

  useEffect(function () {
    fetch('https://opentdb.com/api.php?amount=15&category=11&difficulty=easy&type=multiple')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data.results }))
      .catch((e) => { dispatch({ type: 'dataFailed' }) })
  }, [])


  return (
    <div className="container d-flex flex-column align-items-center mx-auto">
      {status === 'ready' && <StartScreen dispatch={dispatch} />}
      {status === 'active' && <Question dispatch={dispatch} questions={questions} index={index} userAnswer={userAnswer} answers={answers} />}
      {status === 'loadFailed' && <h2>Data load failed</h2>}
    </div>
  )
}

export default App
