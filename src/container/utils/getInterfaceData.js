import axios from 'axios'

const getInterfaceData = () => {
    const instance = axios.create()
    instance.BaseUrl = ''   
    return instance
}

export default getInterfaceData()
