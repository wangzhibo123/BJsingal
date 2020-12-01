import axios from 'axios'

const getInterfaceData = () => {
    const instance = axios.create({
<<<<<<< HEAD
        // baseURL: 'http://192.168.1.124:20191',
        // baseURL: 'http://39.100.128.220:12345',
=======
        // baseURL: 'http://39.100.128.220:12345',
        baseURL: 'http://11.82.12.118:20191'
>>>>>>> fac7c0976811dac82518cfe12ff9dffecfbb0c5d
    })
    return instance
}       

export default getInterfaceData()
