import {BASE_URL} from "../ApiUlrs/apiUrls";
import checkResponse from "./checkResponse";

export default function request(url: string, options?: RequestInit) {
    return fetch(`${BASE_URL}/${url}`, options).then(checkResponse)
}
