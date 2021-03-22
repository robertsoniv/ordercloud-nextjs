import '../styles/global.css'
import '../styles/prism.css'
import Layout from '../components/layout'
import OrderCloudProvider from '../redux/ordercloud.provider';

export default function App({ Component, pageProps }) {
    return (
        <OrderCloudProvider>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </OrderCloudProvider>
    )
}