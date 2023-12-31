import { useEffect, useReducer } from "react"
import StartScreen from "./components/StartScreen"

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  answer: null,
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
    case 'active':
      return { ...state, status: 'active' }
    case 'error':
      return { ...state }
    default:
      return { ...state }
  }
}

// 

function App() {

  const [{ questions, status }, dispatch] = useReducer(reducer, initialState)

  useEffect(function () {
    fetch('https://opentdb.com/api.php?amount=15&category=11&difficulty=easy&type=multiple')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data.results }))
      .catch((e) => { dispatch({ type: 'dataFailed' }) })
  }, [])


  return (
    <div className="container d-flex flex-column align-items-center mx-auto">
      {status === 'ready' && <StartScreen dispatch={dispatch} />}
      {status === 'active' && <h1>Active</h1>}
    </div>
  )
}

export default App
