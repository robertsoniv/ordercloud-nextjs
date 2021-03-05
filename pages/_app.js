import '../styles/global.css'
import OrderCloudProvider from '../lib/ordercloud-provider'

export default function App({ Component, pageProps }) {
    return (
        <OrderCloudProvider>
            <Component {...pageProps}/>
        </OrderCloudProvider>
    )
}