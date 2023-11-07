export const API_END_POINT = "https://mwu1.notion.edu-api.programmers.co.kr"

export const request = async(url, option = {}) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...option,
            headers: {
                "x-username": "test",
                "Content-Type": "application/json"
            }
        })
    
        if (res.ok) {
            return res.json();
        }
        throw new Error('API 처리 문제')
    } catch (e) {
        console.log(e.message)
    }

}