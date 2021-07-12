import API from './ApiObj';

export async function GetAll(){
    const apiResponse = await API.get('/api/v1/class/');

    return apiResponse.data;
}

export async function Post(name, module, date){
    const apiResponse = await API.post('/api/v1/class/', {name, module, date});

    console.log(apiResponse.data);
    return apiResponse.ok;
}

export async function Delete(id){
    const apiResponse = await API.delete('/api/v1/class/' + id + '/');

    return apiResponse.ok;
}

export async function Patch(id, name){
    const apiResponse = await API.patch('/api/v1/class/' + id + '/', {name});

    return apiResponse.ok;
}