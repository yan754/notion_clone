export const initRouter = (onRoute) => {
    window.addEventListener('route-change', (e) => {
        const nextUrl = e.detail.nextUrl

        if (nextUrl) {
            history.pushState(null, null, nextUrl)
            onRoute()
        }
    })   
}

// 라우터이동
export const pushUrl = (nextUrl) => {
    window.dispatchEvent(
        new CustomEvent('route-change', {
            detail: {
                nextUrl
            },
        }),
    )
}

