import { FunctionComponent } from 'react';
import { Provider } from 'react-redux'
import appStore from './appStore';

const OrderCloudProvider:FunctionComponent = ({children}) => {
    return <Provider store={appStore}>
        {children}
    </Provider>
}

export default OrderCloudProvider