import Post from "./posts/Post";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useState} from "react";

const Login = ({ loginSuccess, title }) => {

    const [showLoginSuccess, setShowLoginSuccess] = useState(false);

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onBlur" // "onChange"
    });

    const onSubmit = (data) => {
        console.log(data);
        axios.post("https://60dff0ba6b689e001788c858.mockapi.io/tokens", data)
            .then(res => {
                setShowLoginSuccess(true);
                loginSuccess({ userId: res.data.userId, token: res.data.token });
                axios.defaults.headers.common['Authorization'] = res.data.token;
            }).catch(err => {
        });
    };

    return (
        <div style={{margin: "10px"}}>
            { title && <h5>{ title }</h5> }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        placeholder="Email"
                        {...register("email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                        })}
                    />
                    {errors.email?.type === "required" && <p class="error">This is required</p>}
                    {errors.email?.type === "pattern" && <p class="error">This is must email</p>}
                </div>

                <div>
                    <input
                        placeholder="Password"
                        {...register("password", {required: true, minLength: 8})}
                    />
                    {errors.password?.type === "required" && <p class="error">This is required</p>}
                    {errors.password?.type === "minLength" && <p class="error">At least 8 characters</p>}
                </div>
                <button type="submit">Submit</button>
                { showLoginSuccess && <div>Login success</div> }
            </form>
        </div>
    );
}

export default Login;