import axios from 'axios';

export async function ApiPost(url, userData){
    /*
    return new Promise( (resolve,reject) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })

        .catch((error) => {
            reject(error);
        })
    });
    */

    /*
    return new Promise( async (resolve,reject) => {
        await axios.post(url, userData)
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })

        .catch((error) => {
            reject(error);
        })
    });
    */

    console.log('comenzando post');
    await axios.post(url, userData)
    .then(response => {
        console.log('good');
        console.log(response);
        console.log(response.status);
        return response;
        /*
        if(response.status == 204){
            return response;
        }else{
            return response;
        }
        */
    })

    .catch(error => {
        console.log('mal');
        console.log(error);
        console.log(error.status);
        return error;
    })
}