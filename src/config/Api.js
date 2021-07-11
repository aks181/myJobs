// import axios from "axios";


export const baseURL = 'https://jobs-api.squareboat.info/api/v1';


export function fetchData(url = '', token) {
   
        const myHeaders = new Headers();
        
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        
       return (fetch(url, {
        method: 'GET',
        headers: myHeaders,
       })
        .then((response) => response.json())    
        .catch((error) => {
            console.log(error);
        }))
    
}


export async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST', 
        mode: 'cors', 
        body: JSON.stringify(data)
    });
    return response.json(); 
}  

