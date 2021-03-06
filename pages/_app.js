import Layout from '../components/Layout'
import OrderCloudProvider from '../redux/ordercloud.provider';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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