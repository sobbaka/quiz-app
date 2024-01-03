import { useEffect } from "react";
import Options from "./Options";
import NextButton from "./NextButton";
import FinishButton from "./FinishButton";

const shuffle = (array) => {
    array.forEach((element) => element.replaceAll('&quot;', '').replaceAll('&#039;', ''))
    return array.sort(() => Math.random() - 0.5);
};



export default function Question({ questions, index, dispatch, userAnswer, answers }) {
    const question = questions[index]
    const hasAnswered = userAnswer != null
    useEffect(() => dispatch({ type: 'setAnswers', payload: shuffle([question.correct_answer, ...question.incorrect_answers]) }), [question])


    return (
        <>
            <h2 className="mt-4 mb-3 text-center">{question.question.replaceAll('&quot;', '').replaceAll('&#039;', '')}</h2>
            <Options
                question={question}
                dispatch={dispatch}
                userAnswer={userAnswer}
                answers={answers}
                hasAnswered={hasAnswered}
            />
            {questions.length - 1 > index ?
                hasAnswered && <NextButton dispatch={dispatch} /> : hasAnswered && <FinishButton dispatch={dispatch} />}
        </>
    )
}