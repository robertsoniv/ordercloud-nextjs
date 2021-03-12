import { useSelector } from "react-redux";

const useOrderCloud = () => {
    const {isAnonymous, isAuthenticated, user} = useSelector((state) => state.orderCloud);

    return {
        isAnonymous,
        isAuthenticated,
        user
    }

}

export default useOrderCloud