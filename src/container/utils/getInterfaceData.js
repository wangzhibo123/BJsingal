import axios from 'axios'

const getInterfaceData = () => {
    const instance = axios.create({
        // baseURL: 'http://39.100.128.220:12345',
        baseURL: 'http://11.82.12.118:20191'
    })
    return instance
}

export default getInterfaceData()
