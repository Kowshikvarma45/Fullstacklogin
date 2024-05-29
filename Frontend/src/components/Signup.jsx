import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { SignupButtonAtom, SignupdivAtom } from "../store/atoms/Signupstates"
import { useRef } from "react"

export function Signup() {
    const Navigate = useNavigate()
    const [divtext,setdivtext] = useRecoilState(SignupdivAtom)
    const usernameref = useRef()
    const divref = useRef()
    const passwordref = useRef()
    const showbuttonref = useRef()
    const emailref = useRef()
    const phoneref = useRef()
    const [buttontext,setButtontext] = useRecoilState(SignupButtonAtom)
    
    function onclicked() {
        const username = usernameref.current.value
        const password = passwordref.current.value
        const email = emailref.current.value
        const phone = phoneref.current.value

        fetch("http://localhost:3000/Signup",{
            method:"post",
            body:JSON.stringify({
                username:username,
                password:password,
                email:email,
                phone:phone
            }),
            headers: {
                "content-type" : "application/json"
            }
        }).then(async(val)=>{
            const res = await val.json()
            setdivtext(res.msg)
            alert(res.msg)
        })

    }

    return (
        <div className="signup-container">
            <h1>Signup</h1>
            <div>
                <h1 ref={divref}>{divtext}</h1>
            </div>
            <input ref={usernameref} type="text" placeholder="Username" className="input-field" required={true} /> <br />
            <input type="password" ref={passwordref} placeholder="Password" className="input-field" required={true} /><br />
            <input ref={emailref} type="email" placeholder="Email" className="input-field" required={true} /><br />
            <input ref={phoneref} type="text" placeholder="Phone" className="input-field" required={true} /><br />
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
                Navigate('/Login')
            }}>Login</button>
            
        </div>
    )
}