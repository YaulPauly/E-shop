'use client';

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useCallback, useState } from "react";

interface ProductDetailsProps {
    product: any
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: SelectedImgType,
    quality: number,
    price: number
}

export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {

    const {handleAddProductToCart, cartProducts} = useCart();
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quality: 1,
        price: product.price
    })

    console.log({cartProducts});
    
    const productRating =
        product.reviews.reduce((acc: number, item: any) =>
            item.rating + acc, 0) / product.reviews.length


    const handleColorSelect = useCallback((value: SelectedImgType) => {
        setCartProduct((prev) => {
            return { ...prev, selectedImg: value }
        })
    }, [cartProduct.selectedImg])

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quality === 99) {
            return;
        }
        setCartProduct((prev) => {
            return { ...prev, quality: +prev.quality + 1 }
        });
    }, [cartProduct])
    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quality === 1) {
            return;
        }
        setCartProduct((prev) => {
            return { ...prev, quality: prev.quality - 1 }
        });
    }, [cartProduct])


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
            <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect} />
            <div>
                <h2 className="text-3xl font-medium text-slate-700">
                    {product.name}
                </h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} reviews</div>
                </div>
                <Horizontal />
                <div className="text-justify">
                    {product.description}
                </div>
                <Horizontal />
                <div>
                    <span className="font-semibold">CATEGORY:</span> {product.category}
                </div>
                <div>
                    <span className="font-semibold">BRAND:</span> {product.brand}
                </div>
                <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>{product.inStock ? 'In stock' : 'Out of stock'}</div>
                <Horizontal />
                <SetColor
                    images={product.images}
                    cartProduct={cartProduct}
                    handleColorSelect={handleColorSelect}
                />
                <Horizontal />
                <SetQuantity
                    cartProduct={cartProduct}
                    handleQtyDecrease={handleQtyDecrease}
                    handleQtyIncrease={handleQtyIncrease}
                />
                <Horizontal />
                <div className="max-w-[3000px]">
                    <Button
                        label="Add to Cart"
                        onClick={() => handleAddProductToCart(cartProduct)}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;