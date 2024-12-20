import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state/actionCreators/actions";



export default function ResultTable() {
    const dispatch = useDispatch();
    const results = useSelector((state) => state.tableValues.results);
    const loading = useSelector((state) => state.tableValues.loading);
    const token = useSelector((state) => state.loginRed.token)
    // console.log(token)
    // dispatch(actions.GET_ALL(to))

    useEffect(() => {
        dispatch(actions.GET_ALL(token)); // Fetch data when the component mounts
    }, [dispatch]);

    const handleClear = () => {
        dispatch(actions.CLEAR_REQ(token)) // Clear data when the button is clicked
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <button onClick={handleClear} className="btn btn-danger mb-3">
                Clear Results
            </button>
            <table className="table table-striped table-hover mx-3">
                <thead>
                    <tr>
                        <th scope="col">X</th>
                        <th scope="col">Y</th>
                        <th scope="col">R</th>
                        <th scope="col">SENT</th>
                        <th scope="col">DELAY</th>
                        <th scope="col">RESULT</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(results) && results.length > 0 ? (
                        results.map(result => (
                            <tr key={result.id}>
                                <td>{result.x}</td>
                                <td>{result.y}</td>
                                <td>{result.r}</td>
                                <td>{result.recieved}</td>
                                <td>{result.executionTime}</td>
                                <td>{result.inArea ? "true" : "false"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No results available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
