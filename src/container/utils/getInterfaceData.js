import axios from 'axios'

const getInterfaceData = () => {
    const instance = axios.create()
    return instance
}

export default getInterfaceData()
