import {BASE_URL} from "../api_urls/api_urls";
import checkResponse from "./checkResponse";

export default function request(url, options) {
    return fetch(`${BASE_URL}/${url}`, options).then(checkResponse)
}
