export default function Button({ question, answer, dispatch, userAnswer, hasAnswered }) {


    return (
        <button
            className={`btn btn-primary ${hasAnswered && (question.correct_answer === answer ? " btn-success" : userAnswer === answer ? " btn-danger" : " btn-warning")}`}
            onClick={() => dispatch({ type: 'answer', payload: answer })}
        >
            {answer}
        </button>
    )
}



