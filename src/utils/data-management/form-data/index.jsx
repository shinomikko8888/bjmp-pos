import { Axios } from "../../../config";
import { DOMAIN } from "../../../constants";

export const fetchDataWrapper = async (action, dataArray = []) => {
    try {
        const formattedData = dataArray.map(item => `${item[0]}=${item[1]}`).join('&');
        let response;
        response = await Axios.get(`${DOMAIN}/index.php?a=${action}&${formattedData}`);
        return response.data;
    }
    catch (error){
        throw new Error (`Error fetching data: ${error}`)
    }
}
export const handleSubmitWrapper = async (event, formData, hasFile = false) => {
    event.preventDefault();
    try {
        let data;
        if (hasFile) {
            data = new FormData();
            for (let key in formData) {
                data.append(key, formData[key]);
            }
        } else {
            data = {
                ...formData
            };
        }
        
        const response = await Axios.post(`${DOMAIN}/index.php`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Error handling submit: ${error}`);
    }
};

export const handleChange = (event, callback) => {
    try {
        const { name, value, type } = event.target;
        let val = type === 'file' ? event.target.files[0] : value;

        // Limit the phone number to 11 digits
        if (name === 'user-contact-number' && type === 'number') {
            val = val.slice(0, 11);
        }
        
        callback(prevState => ({
            ...prevState,
            [name]: val
        }));
    } catch (error) {
        throw new Error(`Error handling change: ${error}`);
    }
};

export const handleChangeWrapper = async (event, formData, setFormData) => {
    await handleChange(event, setFormData);
};

export const isFormDataValid = (data) => {
    for (const key in data){
        if(data.hasOwnProperty(key) && (key === 'pdl-medical-condition' || key === 'pdl-other-gender')){
            return true;
        }
        else if(data.hasOwnProperty(key) && (data[key] === '' || data[key] === null)){
            return false;
        }
    }
    return true;
}