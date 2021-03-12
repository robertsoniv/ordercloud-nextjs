import '../styles/global.css'
import '../styles/prism.css'
import Layout from '../components/layout'
import { Provider } from 'react-redux'
import appStore from '../redux/appStore';

export default function App({ Component, pageProps }) {
    return (
        <Provider store={appStore}>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </Provider>
    )
}