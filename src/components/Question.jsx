import { useEffect } from "react";
import Options from "./Options"

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};



export default function Question({ questions, index, dispatch, userAnswer, answers }) {
    const question = questions[index]
    // const answers = shuffle([question.correct_answer, ...question.incorrect_answers])

    useEffect(() => dispatch({ type: 'setAnswers', payload: shuffle([question.correct_answer, ...question.incorrect_answers]) }), [question])


    return (
        <>
            <h2>{question.question}</h2>
            <Options question={question} dispatch={dispatch} userAnswer={userAnswer} answers={answers} />
        </>
    )
}