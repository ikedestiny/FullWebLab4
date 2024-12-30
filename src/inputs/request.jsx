import Notification from "../layout/Notification";
import { useState } from "react";
import RequestStore from "../zustandStates/RequestStore";
import LoginStore from "../zustandStates/LoginStore";

export default function RequestForm() {
    // const reqReducer = useSelector((state) => state.request);
    // const loginReducer = useSelector((state) => state.loginRed);
    // const dispatch = useDispatch();
    // const { setX, setY, setR } = bindActionCreators(actions, dispatch);
    const { token } = LoginStore()
    const { add_point, set_r, set_x, set_y, x, y, r, get_all } = RequestStore()

    const [notification, setNotification] = useState({ show: false, message: "", type: "" });

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 15000);
    };

    const onSubmit = async (e) => {
        console.log("token: " + token)
        e.preventDefault();
        await add_point(token)
    };

    return (
        <div className="col-md-4">
            <div className="card shadow-sm my-3 mx-auto " style={{ maxWidth: '18rem' }}>
                <div className="card-header text-center bg-secondary text-white">
                    <h3>Current Coordinates</h3>
                </div>
                <div className="card-body d-flex flex-column gap-2">
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="x" className="form-label">X</label>
                            <input
                                type="text"
                                className="form-control"
                                id="x"
                                name="x"
                                onChange={(e) => set_x(e.target.value)}
                                value={x}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="y" className="form-label">Y </label>
                            <input
                                type="text"
                                className="form-control"
                                id="y"
                                name="y"
                                value={y}
                                onChange={(e) => set_y(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="r" className="form-label">R</label>
                            <input
                                type="text"
                                className="form-control"
                                id="r"
                                name="r"
                                value={r}
                                onChange={(e) => set_r(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-secondary">
                                Send Coordinates
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type} // Add type styling if needed
                    onClose={() => setNotification({ show: false, message: "", type: "" })}
                />
            )}
        </div>
    );
}
