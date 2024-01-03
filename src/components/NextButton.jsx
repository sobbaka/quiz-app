export default function NextButton({ dispatch }) {
    return <button className="btn btn-info mt-3 mb-2" onClick={() => dispatch({ type: 'nextQuestion' })}>Next question</button>
}