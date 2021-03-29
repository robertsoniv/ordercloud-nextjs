
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useOcAuth from '../lib/useOcAuth';
import { logout } from '../redux/slices/ocAuth';
import ButtonLink from './ButtonLink';

export const siteTitle = 'Next.js OrderCloud Authentication'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    spacer: {
      width: theme.spacing(2)
    },
    grow: {
      flexGrow: 1,
    },
  }),
);

export default function Layout({ children }) {
  const classes = useStyles()
  const dispatch = useDispatch()


  const {isAnonymous, user} = useOcAuth();

  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])
  
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Example showing one pattern on using OrderCloud authentication with Next.JS. This does not include the client credentials grant-type as that is not recommended for use in client-side applications."
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        <AppBar position="static" component="nav">
          <Container maxWidth="md">
            <Toolbar disableGutters>
              <Typography variant="h6">
                OrderCloud Next.js
              </Typography>
              <div className={classes.spacer}></div>
              <ButtonLink color="inherit" href="/">Home</ButtonLink>
              <ButtonLink color="inherit" href="/products?ps=2">Products</ButtonLink>
              <div className={classes.grow}></div>
              {isAnonymous ? (
                <ButtonLink color="inherit" href="/login">Login</ButtonLink>
                ) : (
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </header>
      <main>{children}</main>
    </>
  )
}