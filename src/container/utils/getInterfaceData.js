import axios from 'axios'

const getInterfaceData = () => {
    const instance = axios.create({
        // baseURL: 'http://192.168.1.124:20191',
        // baseURL: 'http://11.82.12.118:20191'
    })
    return instance
}

export default getInterfaceData()
