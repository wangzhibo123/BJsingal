import axios from 'axios'

const getInterfaceData = () => {
    const instance = axios.create({
        // baseURL: 'http://192.168.1.53:20194',
    })
    return instance
}

export default getInterfaceData()
