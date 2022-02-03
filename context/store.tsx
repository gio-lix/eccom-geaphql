import {createContext, useReducer, useState} from "react";
import {number} from "prop-types";

export const createStore = createContext<any | null>(null)
const initialState = {
    cart: [],
    currency: ''
}


const reducerState = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD_CART':
            const product = action.payload
            const exist = state.cart.find((x: any) => x.id === product.id)
            if (!exist) {
                const oldProduct = action.payload
                return {...state, cart: [...state.cart, {...oldProduct, qty: 1}]}
            }
            if (exist) {
                return {
                    ...state, cart: state.cart.map((e: any) => e.id === product.id ? {...product, qty: e.qty + 1} : e)
                }
            }
        case "MINUS_CART":
            return {
                ...state, cart: state.cart.map((e: any) => e.id === action.payload.id ? {...action.payload, qty: e.qty - 1} : e)
            }
        case "DELETE_CART":
            return {...state, cart: state.cart.filter((el: any) => el.id !== action.payload)}
        case "DELETE_ALL":
            return {...state, cart: []}
        case "CURRENCY":
            return  {
                ...state, currency: action.payload
            }
        default:
            return state
    }
}


export const StoreProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(reducerState, initialState)

    return (
        <createStore.Provider value={{state, dispatch}}>
            {children}
        </createStore.Provider>
    )

}
