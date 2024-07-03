import { OfferContext } from "../context/OfferContext";
import { useContext } from "react";

export const useOffersContext = () => {
    const context = useContext(OfferContext)

    if(!context){
        throw Error('useOffersContext must be used inside a OffersContextProvider')
        
    }
    return context
}
export default {useOffersContext}