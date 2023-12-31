export default function StartScreen({ dispatch }) {
    return (
        <>
            <h1>Welcome to our Quiz App. Are you ready?</h1>
            <button className="btn btn-outline-primary btn-lg" onClick={() => dispatch({ type: 'active' })}>Start quiz</button>
        </>

    )
}