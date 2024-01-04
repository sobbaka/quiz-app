import Button from "./Button"

export default function Options({ question, userAnswer, hasAnswered, dispatch, answers }) {

    return (
        <>
            <div className="d-flex justify-content-center flex-column flex-sm-row w-100">
                {answers.map((answer) =>
                    <Button
                        question={question}
                        answer={answer}
                        key={answer}
                        dispatch={dispatch}
                        userAnswer={userAnswer}
                        hasAnswered={hasAnswered}
                    />)}
            </div>

        </>
    )
}