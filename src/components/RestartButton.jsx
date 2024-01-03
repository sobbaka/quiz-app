export default function RestartButton({ dispatch }) {

    const fetchData = async () => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=15&category=11&difficulty=easy&type=multiple');

            if (response.status === 429) {
                // Handle rate limiting by waiting for a certain period before retrying
                await new Promise(resolve => setTimeout(resolve, 5000)); // You can adjust the delay as needed
                fetchData(); // Retry the request
            } else if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'restart', payload: data.results });
            } else {
                // Handle other errors
                dispatch({ type: 'dataFailed' });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            dispatch({ type: 'dataFailed' });
        }
    };

    return <button className="btn btn-outline-primary btn-lg" onClick={() => fetchData()}>Restart</button>
}