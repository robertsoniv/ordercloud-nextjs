import Link from "next/link"
import useOcProductList from "../lib/useOcProductList"
import utilStyles from "../styles/utils.module.css"

export default function OcProductList({page, pageSize, columns = 3}) {

    const {items, meta} = useOcProductList({
        page,
        pageSize
    })
    
    return (
        <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 pt-12">
            {meta && `Showing ${meta.ItemRange[0]} - ${meta.ItemRange[1]} of ${meta.TotalCount} products`}
            {items ? (
                <>
                    <ul className={`grid grid-cols-${columns} gap-2 pt-4`}>
                        {items.map((p, i) => (
                            <li className="list-none p-4 bg-white shadow-md hover:shadow-xl hover:scale-105 transform transition-all" key={i}>
                                <Link href={`/products/${p.ID}`}>
                                    <a className="block mb-3 text-red-500 hover:text-red-700 h-12">{p.Name}</a>
                                </Link>
                                <br/>
                                <small className={utilStyles.lightText} dangerouslySetInnerHTML={{ __html: p.Description}}/>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <h1>Loading Products</h1>
            )}
        </div>
    )
}