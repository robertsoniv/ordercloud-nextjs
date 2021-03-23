import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import GridListTile from "@material-ui/core/GridListTile"
import Typography from '@material-ui/core/Typography'
import useOcProductList from "../lib/useOcProductList"
import CardActionAreaLink from './cardActionAreaLink'

export default function OcProductList({page, pageSize}) {

    const {items, meta} = useOcProductList({
        page,
        pageSize
    })
    
    return (
        <Box marginY={4}>
            <Container maxWidth="md">
                {items ? (
                    <Grid container spacing={2}>
                        {items.map((p, i) => (
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
                        ))}
                    </Grid>
                ) : (
                    <h1>Loading Products</h1>
                )}
            </Container>
        </Box>
    )
}