export default function FinishButton({ dispatch }) {
    return <button className="btn btn-info mt-3 mb-2" onClick={() => dispatch({ type: 'finish' })}>Finish quest</button>
}