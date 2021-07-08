import API from './ApiObj';

export async function GetAll(){
    const apiResponse = await API.get('/api/v1/module/');

    return apiResponse.data;
}

export async function Post(name){
    const apiResponse = await API.post('/api/v1/module/', {name});

    return apiResponse.ok;
}