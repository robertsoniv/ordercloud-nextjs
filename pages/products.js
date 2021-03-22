import { useRouter } from "next/router"
import { useMemo } from "react";
import OcProductList from "../components/oc-product-list"

export default function Products() {
    const {isReady, query} = useRouter();

    const page = useMemo(() => {
        return query.page ? Number(query.page) : 1
    }, [query])

    const pageSize = useMemo(() => {
        return query.pageSize ? Number(query.pageSize) : 20
    })

    return isReady && (
        <OcProductList page={page} pageSize={pageSize} />
    )
}