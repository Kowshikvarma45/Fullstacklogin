import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState} from "recoil"
import { LoginButtonAtom, LogindivAtom } from "../store/atoms/Loginstates"

export function Login() {

    const Navigate = useNavigate()
    const [divtext,setdivtext] = useRecoilState(LogindivAtom)
    const usernameref = useRef()
    const divref = useRef()
    const passwordref = useRef()
    const showbuttonref = useRef()
    const emailref = useRef()
    const [buttontext,setButtontext] = useRecoilState(LoginButtonAtom)

    async function onclicked() {
        const username = usernameref.current.value
        const password = passwordref.current.value
        const email = emailref.current.value
        const response = await fetch(`http://localhost:3000/Login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}`, {
            method: 'GET',
        });
        const data = await response.json();
        alert(data.msg)
        setdivtext(data.msg)

    }
    
    return (
            <div className="signup-container">
            <h1>Login</h1>
            <div>
                <h1 ref={divref}>{divtext}</h1>
            </div>
            <input ref={usernameref} type="text" placeholder="Username" className="input-field" required /> <br />
            <input type="password" ref={passwordref} placeholder="Password" className="input-field" required />
            <input ref={emailref} type="email" placeholder="Email" className="input-field" required /><br />
            <button className="show-button" onClick={()=>{
                if(passwordref.current.type == "text") {
                    passwordref.current.type = "password"
                    setButtontext("show password")
                }
                else {
                    passwordref.current.type = "text"
                    setButtontext("hide password")
                }
            }} ref={showbuttonref}>{buttontext}</button>
            <button onClick={onclicked} className="submit-button">Submit</button>
            <button className="signup-button" onClick={()=>{
                Navigate('/')
            }}>Signup</button>
            
        </div>
    )
}
