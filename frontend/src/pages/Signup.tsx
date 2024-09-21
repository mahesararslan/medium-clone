import { Quote } from "../components/Quote";
import { AuthSignup } from "../components/AuthSignup";


export function Signup () {

    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <AuthSignup />
            </div>
            <div className="lg:block" >
                <Quote />
            </div>
        </div>
    </div>
}