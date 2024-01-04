export default function ProgressBar({ index, hasAnswered, length }) {

    const barWidth = (index + hasAnswered) / length * 100
    return (
        <>
            <div style={{ width: '100%' }}>
                <p className="text-center h6 mt-3">Question {index + 1} of {length}</p>
                <div className="progress mt-3" role="progressbar" aria-label="Info example" aria-valuenow={index + hasAnswered} aria-valuemin="0" aria-valuemax={length}>
                    <div className="progress-bar bg-info" style={{ width: parseInt(barWidth) + "%" }}></div>
                </div>
            </div>
        </>

    )
}