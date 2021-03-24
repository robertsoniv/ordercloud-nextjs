import { useRouter } from "next/router"
import { ChangeEvent, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import OcProductList from "../components/oc-product-list"
import OcProductPagination from "../components/oc-product-pagination"
import Box from '@material-ui/core/Box'
import Container from "@material-ui/core/Container"
import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import useDebounce from "../lib/useDebounce"
import { stringifyUrl } from "query-string";

const DebouncedTextField = forwardRef<any, TextFieldProps>((props, ref) => {
    const {onChange, value, ...rest} = props;

    const [localValue, setLocalValue] = useState(value);

    const debouncedValue:string = useDebounce(localValue, 350);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    }

    useEffect(() => {
        if (debouncedValue !== value) {
            onChange({target: {value: debouncedValue}} as ChangeEvent<HTMLInputElement>)
        }
    }, [debouncedValue, value])

    return <TextField ref={ref} value={localValue} onChange={handleChange} {...rest}/>
})

export default function Products() {
    const {isReady, query, pathname, replace, asPath} = useRouter();

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

    const handleUpdateQueryParam = useCallback((key:string, value:string | undefined) => {
        const newQueryUrlQuery = {...query, [key]:value}
        const newAsPathQuery = {[key]:value}
        if (key === 's') {
            delete newQueryUrlQuery['p']
            newAsPathQuery['p'] = undefined
        }
        replace(stringifyUrl({url: pathname, query: newQueryUrlQuery}), stringifyUrl({url: asPath, query: newAsPathQuery}), {shallow:true})
    }, [replace, asPath, pathname, query])

    const handleSearchChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        if ((!e.target.value && query.s === undefined) || (e.target.value && e.target.value === query.s)) {
            return;
        }
        if (e.target.value) {
            handleUpdateQueryParam('s', e.target.value)
        } else {
            handleUpdateQueryParam('s', undefined)
        }

    }, [query.s, handleUpdateQueryParam])

    const handlePageChange = useCallback((value) => {
        handleUpdateQueryParam('p', String(value))
    }, [handleUpdateQueryParam])

    return isReady && (
        <Box marginY={4}>
            <Container maxWidth="md">
                <DebouncedTextField variant="outlined" fullWidth margin="normal" label="Search products..."  value={query.s || ''} onChange={handleSearchChange}/>
                <OcProductList {...productListOptions}/>
                <Box display="flex" justifyContent="center" mt={3}>
                    <OcProductPagination onChange={handlePageChange}></OcProductPagination>
                </Box>
            </Container>
        </Box>
    )
}