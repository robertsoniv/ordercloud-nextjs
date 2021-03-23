import Layout from '../components/layout'
import OrderCloudProvider from '../redux/ordercloud.provider';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/cssBaseline';
import theme from '../lib/theme';

export default function App({ Component, pageProps }) {
    return (
        <OrderCloudProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
            </ThemeProvider>
        </OrderCloudProvider>
    )
}