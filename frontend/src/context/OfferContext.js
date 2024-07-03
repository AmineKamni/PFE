import { createContext, useReducer } from "react";




export const OfferContext = createContext()
export const offersReducer = (state,action) =>{
    switch(action.type){
        case 'SET_OFFERS':
            return{
                offers: action.payload
            }
        case 'CREATE_OFFERS':
            return{
                offers: [action.payload, ...state.offers]
            }
        case 'DELETE_OFFER':{
            return{
                offers: state.offers.filter((w) => w._id!==action.payload._id)
            }
        }
        default:
            return state
    }
}

export const OfferContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(offersReducer,{
        offers: null
    })
    
    return (
        <OfferContext.Provider value={{...state, dispatch}}>
            {children}
        </OfferContext.Provider>
    )
}