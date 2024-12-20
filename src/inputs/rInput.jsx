import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../state/actionCreators/actions";

export default function Rbuttons() {
    const request = useSelector((state) => state)
    const dispatch = useDispatch()
    const ac = bindActionCreators(actions, dispatch)
    return (
        <div className="card shadow-sm my-3 mx-auto" style={{ maxWidth: '18rem' }}>
            <div className="card-header text-center bg-dark text-white">
                <h5>SET R</h5>
            </div>
            <div className="card-body d-flex flex-column gap-2">
                <button onClick={() => ac.setR(1)} className="btn" style={{ backgroundColor: '#545a61', color: 'white' }}>
                    1
                </button>
                <button onClick={() => ac.setR(2)} className="btn" style={{ backgroundColor: '#42464d', color: 'white' }}>
                    2
                </button>
                <button onClick={() => ac.setR(3)} className="btn" style={{ backgroundColor: '#303335', color: 'white' }}>
                    3
                </button>
                <button onClick={() => ac.setR(4)} className="btn" style={{ backgroundColor: '#1e1f21', color: 'white' }}>
                    4
                </button>
                <button onClick={() => ac.setR(5)} className="btn" style={{ backgroundColor: '#1e1f21', color: 'white' }}>
                    5
                </button>
                <button onClick={() => ac.setR(6)} className="btn" style={{ backgroundColor: '#1e1f21', color: 'white' }}>
                    6
                </button>
            </div>
        </div>
    );

}