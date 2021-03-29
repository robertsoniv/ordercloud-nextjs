
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography'
import Skeleton from "@material-ui/lab/Skeleton"
import { Filters } from 'ordercloud-javascript-sdk'
import { FunctionComponent, useMemo } from 'react'
import useOcProductList from "../lib/useOcProductList"
import CardActionAreaLink from './Card-ActionAreaLink'

interface OcProductListProps {
    catalogId?: string;
    categoryId?: string;
    search?: string;
    page?: number;
    pageSize?: number;
    searchOn?: string | string[];
    sortBy?: string | string[];
    filters?: Filters
}

const OcProductList:FunctionComponent<OcProductListProps> = ({
    children,
    pageSize = 20,
    ...rest
}) => {

    const placeholderArray = useMemo(() => new Array(pageSize).fill(1), [pageSize]);

    const { items } = useOcProductList({pageSize, ...rest})
    
    return (
        <Grid container spacing={2}>
            {items ? items.map((p, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                    <Card style={{height:'100%'}}>
                        <CardActionAreaLink href={`/products/${p.ID}`}>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {p.Name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p"  dangerouslySetInnerHTML={{ __html: p.Description}}/>
                            </CardContent>
                        </CardActionAreaLink>
                    </Card>
                </Grid>
            )) : placeholderArray.map((_, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4}>
                        <Skeleton height={111} variant="rect" animation="wave" width="100%"/>
                    </Grid>
            ))}
        </Grid>
    )
}

export default OcProductList;