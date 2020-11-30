import axios from 'axios'

const getInterfaceData = () => {
    const instance = axios.create({
<<<<<<< HEAD
        // baseURL: 'http://192.168.1.124:20191',
=======
        // baseURL: 'http://39.100.128.220:12345',
>>>>>>> 097117c6f8eb33c8ca201d93302aad68daeb66df
        // baseURL: 'http://11.82.12.118:20191'
    })
    return instance
}

export default getInterfaceData()
