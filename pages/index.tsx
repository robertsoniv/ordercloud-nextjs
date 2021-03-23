import { useMemo } from 'react';
import useOcAuth from '../lib/useOcAuth';
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme:Theme) => createStyles({
  pre: {
    background: theme.palette.grey[600],
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2)
  },
  label: {
    fontWeight: 'bolder'
  }
}))

export default function Home({ allPostsData }) {
  const classes = useStyles()
  const oc = useOcAuth();

  const jsonContent = useMemo(() => {
    let content = JSON.stringify(oc, null, 2);
    return content
  }, [oc])

  return (
    <Container maxWidth="md">
      <Box paddingTop={4}>
        <Typography variant="h5" component="h1" className={classes.label}>Current Context</Typography>
        <pre id="orderCloudContext" className={classes.pre}>
          <code>{jsonContent}</code>
        </pre>
      </Box>
    </Container>
  )
}