import {ChangeEvent, FC, SyntheticEvent, useContext, useState} from "react"
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, useStripe, useElements} from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51J88OTK2GpVXxm4lW3ncjtASUsG9gcsaxQEztH2gkzz4rNiY4pTaE93zroxSzi1duusU3xdJciWvzJJIZBVOjV2800xYOvZ8Pv');
import {createStore} from "../context/store";
import {BACKAND_URL} from "../helper";
import {parseCookies} from "nookies";
import axios from "axios";

interface ICheckoutForm {
    shippingAddress: string
    city: string
    state: string
    pin: any
}

interface CheckOut {
    setCheckout: Function
}

const CheckoutForm: FC<CheckOut> = ({setCheckout}) => {
    const stripe = useStripe();
    const elements = useElements();
    const {state, dispatch} = useContext(createStore);
    const [payButton, setPayButton] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [done, setDone] = useState<boolean>(false);
    const [payProcessing, setPayProcessing] = useState<boolean>(false);
    const [formData, setFormData] = useState<ICheckoutForm>({shippingAddress: '', city: '', state: '', pin: null});
    const {graphqlToken} = parseCookies()


    const makePaymentRequest = async (allFormData: any) => {
        try {
            const {data} = await axios.post(`${BACKAND_URL}/api/orders`, allFormData, {
                headers: {
                    Authorization: `Bearer ${graphqlToken}`
                }
            })
            setDone(true)
            dispatch({type: "DELETE_ALL"})
            return data
        } catch (err) {
            setError(true)
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const items = state?.cart
    const funcTotal = (item: any) => {
        return state?.cart && item.reduce((acc: any, a: any) => {
            return acc + a.price
        }, 0).toFixed(2)
    }
    const cartTotal = funcTotal(state?.cart)

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (elements == null) {
            return
        }
        const cartElement: any = elements.getElement(CardElement)
        const payload = await stripe?.createToken(cartElement)

        const allFormData = {
            ...formData,
            token: payload?.token?.id,
            amount: cartTotal,
            items: items
        }
        setPayProcessing(true)
        await makePaymentRequest(allFormData)
        setPayProcessing(false)

    }
    if (error) return (
        <div className='flex flex-col justify-center space-y-8 items-center'>
            <h1 className='text-2xl font-bold mt-36'>Payment Error</h1>
            <button onClick={() => setCheckout(false)}
                    className="px-6 py-1 font-semibold  text-white tracking-wider bg-red-700 rounded hover:bg-red-900"
            > Cancel
            </button>
        </div>
    )
    if (done) return (
        <div className='flex flex-col justify-center space-y-8 items-center'>
            <h1 className='text-2xl font-bold mt-36'>Payment Done Successfully</h1>
            <button onClick={() => setCheckout(false)}
                    className="px-6 py-1 font-semibold  text-white tracking-wider bg-gray-900 rounded hover:bg-indigo-700"
            > Cancel
            </button>
        </div>
    )
    if (payProcessing) return <p className='text-2xl text-center mt-36 font-bold'>Payment Is Processing...</p>
    return (
        <>
            <div className="leading-loose flex justify-center">
                <form onSubmit={handleSubmit} className="max-w-xl  w-4/6 mt-20 m-4 p-10 bg-white rounded shadow-xl">
                    <p className="text-gray-800 font-medium">Customer information</p>
                    <div className="my-2">
                        <input onChange={handleChange} value={formData.shippingAddress}
                               className="w-full outline-none px-5 py-1 text-gray-700 bg-gray-200 rounded"
                               id="shippingAddress"
                               name="shippingAddress" type="text" required placeholder="Your Name" aria-label="Name"/>
                    </div>
                    <div className="my-2">
                        <input onChange={handleChange} value={formData.city}
                               className="w-full outline-none px-5 py-1 text-gray-700 bg-gray-200 rounded" id="city"
                               name="city" type="text" required placeholder="city" aria-label="Name"/>
                    </div>
                    <div className="my-2">
                        <input onChange={handleChange} value={formData.state}
                               className="w-full outline-none px-5 py-1 text-gray-700 bg-gray-200 rounded" id="state"
                               name="state" type="text" required placeholder="state" aria-label="Name"/>
                    </div>
                    <div className="my-2">
                        <input onChange={handleChange} value={formData.pin}
                               className="w-full outline-none px-5 py-1 text-gray-700 bg-gray-200 rounded" id="pin"
                               name="pin" type="text" required placeholder="pin" aria-label="Name"/>
                    </div>
                    <CardElement onChange={(e) => {
                        if (e.complete) {
                            setPayButton(false)
                        } else {
                            setPayButton(true)
                        }
                    }}/>
                    <div className='flex justify-between items-center mt-4'>
                        <div className="">
                            <button
                                className="px-6  py-1 font-semibold text-white tracking-wider bg-gray-900 rounded hover:bg-green-700"
                                type="submit" disabled={(!stripe || !elements) || payButton}> Pay
                            </button>
                        </div>
                        <div>
                            <button onClick={() => setCheckout(false)}
                                    className="px-6 py-1 font-semibold text-white tracking-wider bg-gray-900 rounded hover:bg-red-700"
                            > Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


const Checkout = ({setCheckout}: any) => (
    <Elements stripe={stripePromise}>
        <CheckoutForm setCheckout={setCheckout}/>
    </Elements>
);
export default Checkout