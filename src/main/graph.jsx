import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state/actionCreators/actions";
import { useState, useEffect } from "react";
import Notification from "../layout/Notification";
import Circle from "./clicks";
import LoginStore from "../zustandStates/LoginStore";
import RequestStore from "../zustandStates/RequestStore";


export default function Graph() {
    const xO = 280; // Origin X (center of SVG)
    const yO = 280; // Origin Y (center of SVG)
    const scale = 39; // Scale factor for -5 to 5 range (560px width / 10 units)

    const [notification, setNotification] = useState({ show: false, message: "", type: "" });

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 2000);
    };

    const radius = RequestStore(state => state.r) // to be used for sizing the graph

    // const dispatch = useDispatch();
    // const store = useSelector((state) => state);
    // const results = useSelector((state) => state.tableValues.results);
    const token = LoginStore(state => state.token)
    const { get_all, results, add_click, set_r, set_x, set_y } = RequestStore()

    // useEffect(() => {
    //     get_all(token); // Fetch data when the component mounts
    // }, []);

    const handleClick = (e) => {
        const svg = e.target.closest("svg"); // Get the SVG element
        const point = svg.createSVGPoint(); // Create an SVGPoint to map coordinates

        point.x = e.clientX;
        point.y = e.clientY;

        const svgCoords = point.matrixTransform(svg.getScreenCTM().inverse());

        const xCoord = (((svgCoords.x - xO) / scale) * 10 / 10).toFixed(2);
        const yCoord = (((yO - svgCoords.y) / scale) * 10 / 10).toFixed(2);

        set_r(radius)
        set_x(xCoord)
        set_y(yCoord)
        add_click(token, showNotification)
        //dispatch(actions.SEND_POINT(store.loginRed.token, { ...store.request, x: xCoord, y: yCoord, clicked: true, r: radius }, showNotification));
    };

    return (
        <div className="graph-container">
            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ show: false, message: "", type: "" })}
                />
            )}
            <svg
                onClick={handleClick}
                id="svgGraph"
                className="svg-graph"
                viewBox="0 0 560 560"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Axis */}
                <line className="axis" stroke="black" x1="4" x2="556" y1="280" y2="280"></line>
                <line className="axis" stroke="black" x1="280" x2="280" y1="4" y2="556"></line>

                {/* X-axis markings */}
                {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((val) => (
                    <g key={`x-${val}`}>
                        <line
                            x1={xO + val * scale}
                            x2={xO + val * scale}
                            y1={yO - 5}
                            y2={yO + 5}
                            stroke="black"
                        />
                        <text
                            x={xO + val * scale}
                            y={yO + 20}
                            fontSize="12"
                            textAnchor="middle"
                        >
                            {val}
                        </text>
                    </g>
                ))}

                {/* Y-axis markings */}
                {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((val) => (
                    <g key={`y-${val}`}>
                        <line
                            x1={xO - 5}
                            x2={xO + 5}
                            y1={yO - val * scale}
                            y2={yO - val * scale}
                            stroke="black"
                        />
                        <text
                            x={xO - 20}
                            y={yO - val * scale + 5}
                            fontSize="12"
                            textAnchor="end"
                        >
                            {val}
                        </text>
                    </g>
                ))}

                {/* Rectangles, triangles, and curves */}
                <polygon
                    id="rectangle"
                    fill="black"
                    fillOpacity="0.4"
                    points={`
                        ${xO - radius * scale},${yO - radius * scale}
                        ${xO},${yO - radius * scale}
                        ${xO},${yO}
                        ${xO - radius * scale},${yO}
                    `}
                />
                <polygon
                    id="triangle"
                    fill="black"
                    fillOpacity="0.4"
                    points={`
                        ${xO},${yO}
                        ${xO},${yO + radius * scale}
                        ${xO - 0.5 * radius * scale},${yO}
                    `}
                />
                <path
                    id="curve"
                    d={`
                        M ${xO} ${yO + radius * scale}
                        S ${xO + radius * scale} ${yO + radius * scale}
                          ${xO + radius * scale} ${yO}
                        L ${xO} ${yO}
                        Z
                    `}
                    fill="black"
                    fillOpacity="0.4"
                />

                {/* Render circles */}
                {Array.isArray(results) &&
                    results.map((result, i) => (
                        result.clicked && (
                            <Circle
                                key={i}
                                cx={result.x * scale + xO}
                                cy={yO - result.y * scale}
                                inArea={result.inArea}
                            />
                        )
                    ))}
            </svg>
        </div>
    );
}
