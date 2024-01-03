export default function FinishButton({ dispatch }) {
    return <button className="btn btn-info" onClick={() => dispatch({ type: 'finish' })}>Finish quest</button>
}