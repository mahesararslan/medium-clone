import { Quote } from "../components/Quote";
import { AuthSignin } from "../components/AuthSignin";


export function Signin () {

    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <AuthSignin />
            </div>
            <div className="lg:block" >
                <Quote />
            </div>
        </div>
    </div>
}