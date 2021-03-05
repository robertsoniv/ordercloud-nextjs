import { useRouter } from "next/router";
import { Me } from "ordercloud-javascript-sdk";
import { useCallback, useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useOrderCloud } from "../../lib/ordercloud-provider";

export function formatPrice(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(amount)
}

export default function ProductDetail() {
    const { query } = useRouter()
    const { isAuthenticated } = useOrderCloud()

    const [data, setData] = useState()

    const retrieveProduct = useCallback(async () => {
        if (!query.productid) return;
        try {
            console.log(query.productid)
            const response = await Me.GetProduct(query.productid)
            setData(response);
        } catch (ex) {
            console.warn('[ProductDetail Error]:', JSON.stringify(ex, null, 2))
        }

    }, [query.productid])

    useEffect(() => {
        if (isAuthenticated) {
            retrieveProduct()
        }
    }, [isAuthenticated, retrieveProduct])

    return (<div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">{data ? (
                <>
                    <div className="pt-12 flex flex-row flex-nowrap justify-between items-center">
                        <h1 className="text-6xl font-extrabold mb-4">{data.Name}</h1>
                        <p className="text-3xl font-black text-green-500">{formatPrice(data.PriceSchedule.PriceBreaks[0].Price)}</p>
                    </div>
                    <p className="text-xl">{data.Description}</p>
                </>
                ) : (
                <h1>Product Data Loading...</h1>
            )}</div>)
    
}