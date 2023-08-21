export default function checkResponse(res) {
    return res.ok ? res : new Error();
}
