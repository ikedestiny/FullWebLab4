import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../state/actionCreators/actions";
import Notification from "../layout/Notification";
import { useState } from "react";

export default function RequestForm() {
    const reqReducer = useSelector((state) => state.request);
    const loginReducer = useSelector((state) => state.loginRed);
    const dispatch = useDispatch();
    const { setX, setY, setR } = bindActionCreators(actions, dispatch);
    const token = loginReducer.token;

    const [notification, setNotification] = useState({ show: false, message: "", type: "" });

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 15000);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.SEND_POINT(token, reqReducer, showNotification));
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
                                onChange={(e) => setX(e.target.value)}
                                value={reqReducer.x}
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
                                value={reqReducer.y}
                                onChange={(e) => setY(e.target.value)}
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
                                value={reqReducer.r}
                                onChange={(e) => setR(e.target.value)}
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
