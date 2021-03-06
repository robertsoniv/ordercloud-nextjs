import Box from "@material-ui/core/Box"
import { green } from "@material-ui/core/colors"
import Container from "@material-ui/core/Container"
import Divider from "@material-ui/core/Divider"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography"
import Skeleton from "@material-ui/lab/Skeleton"
import { useMemo } from "react"
import useOcProductDetail from "../lib/useOcProductDetail"
import Error from 'next/error'

const useStyles = makeStyles((theme:Theme) => createStyles({
    name: {
        fontWeight: 'bolder',
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    price: {
        marginLeft: theme.spacing(3),
        color: green[500],
        fontWeight: 'bold'
    },
    grow: {
        flexGrow: 1
    }
}))

export function formatPrice(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(amount)
}

export default function OcProductDetail({productId}) {

    const classes = useStyles()

    const {product, error} = useOcProductDetail(productId)

    const price = useMemo(() => {
        return product ? formatPrice(product.PriceSchedule.PriceBreaks[0].Price) : ''
    }, [product])

    return error ? (
            <Error statusCode={404}/>
        ) : (
            <Container maxWidth="md">
                <Box marginY={4}>
                    {product && product.ID === productId ? (
                        <Box display="flex" alignItems="center">
                            <div className={classes.grow}>
                                <Typography variant="h5" component="h2" className={classes.name}>{product.Name}</Typography>
                                <Divider className={classes.divider}/>
                                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: product.Description}}/>
                            </div>
                            <Typography variant="h4" component="p" className={classes.price}>{price}</Typography>
                        </Box>
                        ) : (
                        <Box display="flex" alignItems="center">
                            <div className={classes.grow}>
                                <Skeleton variant="text" animation="pulse" height={32} width={400}/>
                                <Divider className={classes.divider}/>
                                <Skeleton variant="text" animation="pulse" height={48} width={600}/>
                            </div>
                            <Skeleton variant="text" animation="pulse" height={41} width={200}/>
                        </Box>
                    )}
                </Box>
            </Container>
        )
    
}