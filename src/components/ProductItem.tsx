import { memo, useState, lazy, Suspense } from "react"

interface ProoductItemsProps {
    product: {
        id: number
        price: number
        title: string
        priceFormatted: string
    },
    onAddToWishList: (id: number) => void;
}

const ProductItemComponent = ( { product, onAddToWishList }: ProoductItemsProps ) => {
    const [isAddingToWishList, setIsAddingToWishList] = useState<boolean>(false)
    const AddProductToWishList = lazy(() => import("./AddProductToWishList"))

    return ( 
        <li>
            {product.title} - <strong>{product.priceFormatted}</strong>
            <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
            <br />
            {isAddingToWishList
            &&<Suspense fallback={<span style={{background: "blue"}}>Loading...</span>}>
                <AddProductToWishList 
                    onAddToWishList={() => {onAddToWishList(product.id)}}
                    onRequestClose={() => {setIsAddingToWishList(false)}}
                />
            </Suspense> }
        </li>
    )
}

export default memo(ProductItemComponent, (prevProps, nextProps) => {
    return prevProps.product == nextProps.product||Object.is(prevProps.product, nextProps.product)
})