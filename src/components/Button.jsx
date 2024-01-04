export default function Button({ question, answer, dispatch, userAnswer, hasAnswered }) {

    return (
        <button
            className={`btn btn-primary m-2
            ${hasAnswered &&
                (question.correct_answer === answer ? " btn-success" :
                    userAnswer === answer ? " btn-danger" : " btn-warning")}`}
            onClick={() => dispatch({ type: 'answer', payload: answer })}
            disabled={hasAnswered}
        >
            {answer}
        </button>
    )
}



