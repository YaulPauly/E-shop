import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type CartContextType = {
    cartTotalQty: number
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(10);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null) 

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updateCart;
            if(prev) {
                updateCart = [...prev, product]
            }else {
                updateCart = [product]
            }

            return updateCart;
        })
    }, [])
    

    const value = useMemo(() => ({ cartTotalQty, cartProducts, handleAddProductToCart}), [cartTotalQty, cartProducts, handleAddProductToCart])

    return <CartContext.Provider value={value}  {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used with in a CartContextProvider")
    }

    return context
}