import Link from "next/link";
import { useRouter } from "next/router"
import { useMemo } from "react";

const inactiveClasses = "text-red-500 hover:bg-red-200 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium"
const activeClasses = "bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium"

export default function NavLink({children, href}) {
    const router = useRouter();
    const isActive = useMemo(() => {
        return href === '/' ? router.pathname === href : router.pathname.startsWith(href);
    }, [router.pathname, href])
    return (
        <Link href={href}>
            <a className={isActive ? activeClasses : inactiveClasses}>{children}</a>
        </Link>
    )
}