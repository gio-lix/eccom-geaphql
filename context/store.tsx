import {createContext, useReducer, useState} from "react";

export const createStore = createContext<any | null>(null)
const initialState = {
    cart: []
}


const reducerState = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD_CART':
            const product = action.payload
            const exist = state?.cart?.find((x: any) => x.id === product.id)
            if (exist) {
                state.cart.map((e: any) => e.id === product.id ? {...e, qty: e.qty += Number(1)} : e)
            } else {
                const productOld = action.payload
                return {...state, cart: [...state.cart,{...productOld, qty: 1}]}
            }
        case "DELETE_CART":
            return {...state, cart:  state.cart.filter((el: any) => el.id !== action.payload)}
        case "DELETE_ALL":
            return {...state, cart: []}
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
