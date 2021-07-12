import ApiObj from './ApiObj';

export async function validateToken(){
    const apiResponse = await ApiObj.get('/api/validateToken/');
    return apiResponse.ok;
}

export async function Auth(username, password){
    const apiResponse = await ApiObj.post('/api/auth/', {username, password});   
    return apiResponse;
}