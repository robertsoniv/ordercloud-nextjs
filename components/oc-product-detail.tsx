import { useMemo } from "react"
import useOcProductDetail from "../lib/useOcProductDetail"

export function formatPrice(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(amount)
}

export default function OcProductDetail({productId}) {

    const product = useOcProductDetail(productId)

    const price = useMemo(() => {
        return product && formatPrice(product.PriceSchedule.PriceBreaks[0].Price)
    }, [product])

    return (
        <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
            {product && product.ID === productId ? (
                <>
                    <div className="pt-12 flex flex-row flex-nowrap justify-between items-center">
                        <h1 className="text-6xl font-extrabold mb-4">{product.Name}</h1>
                        <p className="text-3xl font-black text-green-500">{price}</p>
                    </div>
                    <p className="text-xl" dangerouslySetInnerHTML={{ __html: product.Description}}/>
                </>
                ) : (
                <h1>Product Data Loading...</h1>
            )}
        </div>
    )
    
}