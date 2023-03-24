import * as Network from 'expo-network'
import { useState, useEffect } from "react"


export const networkStatus = async () => {
    const networkStatus = await Network.getNetworkStateAsync().catch(err => console.log(err));
    return { isConnected: networkStatus.isInternetReachable, networkType: networkStatus.type }
}
