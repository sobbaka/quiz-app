import Button from "./Button"
import NextButton from "./NextButton"

export default function Options({ question, userAnswer, dispatch, answers }) {

    const hasAnswered = userAnswer != null
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
            {hasAnswered && <NextButton dispatch={dispatch} />}
        </>
    )
}