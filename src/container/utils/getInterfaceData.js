import axios from 'axios'

const getInterfaceData = () => {
    const instance = axios.create({
        // baseURL: 'http://39.100.128.220:12345',
    })
    return instance
}

export default getInterfaceData()
