import RestartButton from "./RestartButton"

export default function FinalScreen({ points, highscore, dispatch }) {
    return <>
        <h2 className="mt-4">Your score is {points}</h2>
        <h4 className="mt-2">Highscore is {highscore}</h4>
        <RestartButton dispatch={dispatch} />
    </>
}