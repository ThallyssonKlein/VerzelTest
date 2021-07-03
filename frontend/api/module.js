import API from './ApiObj';

export async function GetAll(){
    const apiResponse = await API.get('/api/v1/module/');

    console.log(apiResponse);
    return apiResponse.data;
}