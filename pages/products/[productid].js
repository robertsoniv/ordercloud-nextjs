import { useRouter } from "next/router";
import OcProductDetail from "../../components/OcProductDetail"

export function formatPrice(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(amount)
}

export default function ProductDetail() {
    const { isReady, query } = useRouter()

    return isReady && <OcProductDetail productId={query.productid}/>
}