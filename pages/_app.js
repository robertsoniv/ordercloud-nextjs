import '../styles/global.css'
import '../styles/prism.css'
import OrderCloudProvider from '../lib/ordercloud-provider'
import Layout from '../components/layout'

export default function App({ Component, pageProps }) {
    return (
        <OrderCloudProvider
            baseApiUrl={process.env.NEXT_PUBLIC_OC_BASE_API_URL}
            clientId={process.env.NEXT_PUBLIC_OC_CLIENT_ID}
            scope={process.env.NEXT_PUBLIC_OC_SCOPE}
            allowAnonymous
        >
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </OrderCloudProvider>
    )
}