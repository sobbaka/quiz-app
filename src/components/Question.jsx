import { useEffect } from "react";
import he from 'he';
import Options from "./Options";
import NextButton from "./NextButton";
import FinishButton from "./FinishButton";
import ProgressBar from "./ProgressBar";

const shuffle = (array) => {
    array.forEach((element) => element.replaceAll('&quot;', '').replaceAll('&#039;', ''))
    return array.sort(() => Math.random() - 0.5);
};



export default function Question({ questions, index, dispatch, userAnswer, answers }) {
    const question = questions[index]
    const hasAnswered = userAnswer != null
    useEffect(() => dispatch({ type: 'setAnswers', payload: shuffle([question.correct_answer, ...question.incorrect_answers]) }), [question])


    return (
        <div className="custom__question d-flex flex-column align-items-center mx-auto">
            <ProgressBar index={index} length={questions.length} hasAnswered={hasAnswered} />
            <h2 className="mt-4 mb-3 text-center">{he.decode(question.question)}</h2>
            <Options
                question={question}
                dispatch={dispatch}
                userAnswer={userAnswer}
                answers={answers}
                hasAnswered={hasAnswered}
            />
            {
                questions.length - 1 > index ?
                    hasAnswered && <NextButton dispatch={dispatch} /> : hasAnswered && <FinishButton dispatch={dispatch} />
            }
        </div >
    )
}