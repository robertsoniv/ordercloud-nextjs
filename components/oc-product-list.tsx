import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography'
import Skeleton from "@material-ui/lab/Skeleton"
import useOcProductList from "../lib/useOcProductList"
import CardActionAreaLink from './cardActionAreaLink'

const placeholderArray = [1,1,1,1,1,1];

export default function OcProductList({page, pageSize}) {

    const {items, meta} = useOcProductList({
        page,
        pageSize
    })
    
    return (
        <Box marginY={4}>
            <Container maxWidth="md">
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
            </Container>
        </Box>
    )
}