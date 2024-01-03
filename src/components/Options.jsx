import Button from "./Button"

export default function Options({ question, userAnswer, hasAnswered, dispatch, answers }) {

    return (
        <>
            <div>
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