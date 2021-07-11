import ApiObj from './ApiObj';

export async function validateToken(){
    const apiResponse = await ApiObj.get('/api/validateToken/');
    return apiResponse.ok;
}