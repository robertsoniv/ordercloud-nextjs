import Pagination from "@material-ui/lab/Pagination";
import React, { FunctionComponent, useCallback } from "react";
import { useSelector } from "react-redux";
import { OcRootState } from "../redux/appStore";

interface OcPaginationProps {
    onChange: (page:number) => void;
}

const OcProductPagination:FunctionComponent<OcPaginationProps> = ({
    onChange,
}) => {

    const meta = useSelector((state:OcRootState) => state.ocCatalog.products.meta)

    const handleChange = useCallback((event:React.ChangeEvent<unknown>, value: number) => {
        onChange(value);
    }, [onChange])

    return meta ? <Pagination count={meta.TotalPages} page={meta.Page} onChange={handleChange}/> : <></>
}

export default OcProductPagination;