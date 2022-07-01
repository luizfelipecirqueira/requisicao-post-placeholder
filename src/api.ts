import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {


    getAllPosts: async () => {
        let response = await axios.get(`${BASE_URL}/posts`);
        return response.data;
        /*let response = await fetch(`${BASE_URL}/posts`);
        let json = await response.json();
        return json;*/
    },
    addNewPost: async (title: string, body: string, userId: number) => {
        let response = await axios.post(`${BASE_URL}/posts`, {
            title, body, userId
        });
        return response.data;
        /*let response = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let json = await response.json();
        return json;*/
    }
   
}