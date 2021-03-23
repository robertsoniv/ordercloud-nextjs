import { useRouter } from "next/router"
import { useMemo } from "react";
import OcProductList from "../components/oc-product-list"

export default function Products() {
    const {isReady, query} = useRouter();

    /**
     * Map the Next.js Router query params to the correct
     * product list options. If you need to use filters it is 
     * recommended that you come up with some new shorthand
     * mapping keys to keep the querystring short.
     * 
     * Ex: Filtering by custom XP
     * 
     * import { Filters } from 'ordercloud-javascript-sdk'
     * ...
     * const filters:Filters = {
     *    ["xp.Tags"]: query.t
     * }
     */
    const productListOptions = useMemo(() => {
        return {
            search: query.s ? String(query.s) : undefined,
            page: query.p ? Number(query.p) : 1,
            pageSize: query.ps ? Number(query.ps) : 18,
            searchOn: query.so,
            sortBy: query.o,
        }
    }, [query])

    return isReady && <OcProductList {...productListOptions}/>
}