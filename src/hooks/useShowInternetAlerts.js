import { useState } from "react"
import { networkStatus } from "./useNetworkInfo";


export const useShowInternetAlerts = () => {

    const [showNoInternetAlert, setShowNoInternet] = useState(false);
    const [showDataChargeAlert, setShowDataCharge] = useState(false);


    const checkConnectionStatus = async (useCellular = false) => {
        const conn = await networkStatus();

        if (!conn.isConnected) {
            setShowNoInternet(() => true)
            return true
        }

        if (conn.networkType === "CELLULAR" && !useCellular) {
            setShowDataCharge(() => true)
            return true
        }

        resetModalState();
        return false

    }

    const resetModalState = () => {
        setShowNoInternet(() => false)
        setShowDataCharge(() => false)
    }

    return [checkConnectionStatus, resetModalState, { showNoInternetAlert, showDataChargeAlert }]

}