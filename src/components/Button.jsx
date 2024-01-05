import he from 'he';

export default function Button({ question, answer, dispatch, userAnswer, hasAnswered }) {
    return (
        <button
            className={`btn btn-primary m-2
            ${hasAnswered &&
                (he.decode(question.correct_answer) === he.decode(answer) ? " btn-success" :
                    he.decode(userAnswer) === he.decode(answer) ? " btn-danger" : " btn-warning")}`}
            onClick={() => dispatch({ type: 'answer', payload: answer })}
            disabled={hasAnswered}
        >
            {he.decode(answer)}
        </button>
    )
}



