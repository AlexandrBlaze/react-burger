export default function checkResponse(res: Response) {
    return res.ok ? res.json() : new Error();
}
