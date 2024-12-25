import { useNavigate } from "react-router-dom";
import useLogin from "../zustandStates/LoginStore"
import { useState } from "react";
import { send_login_request } from "../Apicalls"


//const url = "http://127.0.0.1:8080/api";



export default function Login() {
    // const dispatch = useDispatch()
    // const state = useSelector((state) => state.authRed)
    // const loginReducer = useSelector((state) => state.loginRed)
    // console.log(loginReducer)
        let navigate = useNavigate()
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState('');
        const login = useLogin((state) => state.login)


//   const handleLogin = async (e) => {
//     e.preventDefault();

//     dispatch(
//             authActions.SEND_CREDS(
//                 {email:loginReducer.email,password:loginReducer.password},
//                 () => {
//                     // Success callback
//                     navigate("/home");
//                 },
//                 (error) => {
//                     // Failure callback
//                     alert(`Login failed: ${error}`);
//                 }
//             )
//         );

// }


const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
        email: email,
        password: password
    }

    let token;

     try {
             token =await send_login_request({ credentials });
            console.log("Login successful, token:", token);
            login(token)
            if(token.length > 10){
                navigate("/home")
            }else console.log("token is null")
        } catch (error) {
            console.error("Login failed:", error.message);
        }

    // const response = await axios.post(url + "/login", {
    //             email: credentials.email,
    //             password: credentials.password,
    //             username: "",
    //         });
    
    //         console.log(response); // Log the full response for debugging
    //         const token = response.data; // Assuming the token is in the response data
    //         console.log(token);
    //         login(token)

            
}
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header text-center bg-secondary text-white">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">
                            {/* <form onSubmit={handleSubmit}> */}
                            <form>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button onClick={handleLogin} type="submit" className="btn btn-success">
                                        Login!
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}