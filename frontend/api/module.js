import API from './ApiObj';

export async function GetAll(){
    const apiResponse = await API.get('/api/v1/module/');

    return apiResponse.data;
}