export default function NextButton({ dispatch }) {
    return <button className="btn btn-info" onClick={() => dispatch({ type: 'nextQuestion' })}>Next question</button>
}