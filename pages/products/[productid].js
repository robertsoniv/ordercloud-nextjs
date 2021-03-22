import { useRouter } from "next/router";
import useOcProductDetail from "../../lib/useOcProductDetail";
import OcProductDetail from "../../components/oc-product-detail"

export function formatPrice(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(amount)
}

export default function ProductDetail() {
    const { isReady, query } = useRouter()

    return isReady && <OcProductDetail productId={query.productid}/>
    
}