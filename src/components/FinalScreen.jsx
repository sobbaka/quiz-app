import RestartButton from "./RestartButton"

export default function FinalScreen({ points, highscore, dispatch }) {
    return <>
        <h2 className="mt-4 custom__h1-start text-center">Your score is {points} <br /> <span className="m-2 d-block">🎉🎉✨</span></h2>
        <h4 className="mb-4">Highscore is {highscore}</h4>
        <RestartButton dispatch={dispatch} />
    </>
}