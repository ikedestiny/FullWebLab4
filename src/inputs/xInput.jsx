import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../state/actionCreators/actions";





export default function Xbuttons() {
    const request = useSelector((state) => state)
    const dispatch = useDispatch()
    const ac = bindActionCreators(actions, dispatch)
    console.log(ac)

    return (
        <div className="card shadow-sm my-3 mx-auto" style={{ maxWidth: '18rem' }}>
            <div className="card-header text-center bg-dark text-white">
                <h5>SET X</h5>
            </div>
            <div className="card-body d-flex flex-column gap-2">
                <button onClick={() => ac.setX(-4)} className="btn" style={{ backgroundColor: '#adb5bd', color: 'white' }}>
                    -4
                </button>
                <button onClick={() => ac.setX(-3)} className="btn" style={{ backgroundColor: '#9ca3af', color: 'white' }}>
                    -3
                </button>
                <button onClick={() => ac.setX(-2)} className="btn" style={{ backgroundColor: '#8a939c', color: 'white' }}>
                    -2
                </button>
                <button onClick={() => ac.setX(-1)} className="btn" style={{ backgroundColor: '#788089', color: 'white' }}>
                    -1
                </button>
                <button onClick={() => ac.setX(0)} className="btn" style={{ backgroundColor: '#666d75', color: 'white' }}>
                    0
                </button>
                <button onClick={() => ac.setX(1)} className="btn" style={{ backgroundColor: '#545a61', color: 'white' }}>
                    1
                </button>
                <button onClick={() => ac.setX(2)} className="btn" style={{ backgroundColor: '#42464d', color: 'white' }}>
                    2
                </button>
                <button onClick={() => ac.setX(3)} className="btn" style={{ backgroundColor: '#303335', color: 'white' }}>
                    3
                </button>
                <button onClick={() => ac.setX(4)} className="btn" style={{ backgroundColor: '#1e1f21', color: 'white' }}>
                    4
                </button>
            </div>
        </div>
    );

}