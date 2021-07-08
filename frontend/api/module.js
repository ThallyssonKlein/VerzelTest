import API from './ApiObj';

export async function GetAll(){
    const apiResponse = await API.get('/api/v1/module/');

    return apiResponse.data;
}

export async function Post(name){
    const apiResponse = await API.post('/api/v1/module/', {name});

    return apiResponse.ok;
}

export async function Delete(id){
    const apiResponse = await API.delete('/api/v1/module/' + id + '/');

    return apiResponse.ok;
}

export async function Patch(id, name){
    const apiResponse = await API.patch('/api/v1/module/' + id + '/', {name});

    return apiResponse.ok;
}