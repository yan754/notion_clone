import { request } from "../../utils/api.js";
import Editor from "./Editor.js";

export default function EditorPage({ $target, initialState }) {
    const $page = document.createElement('div')

    this.state = initialState

    const post = {
        title: '',
        content: ''
    }

    const editor = new Editor({
        $target: $page,
        initialState: post,
        onEditing: async (editPost) => {
            setTimeout(async () => {
                if (this.state.postId === 'new') {
                    const responsePost = await request('/documents', {
                        method: 'POST',
                        body: JSON.stringify(editPost)
                    })
        
                    if (editPost.content) {
                        await request(`/documents/${responsePost.id}`, {
                            method: 'PUT',
                            body: JSON.stringify(editPost)
                        })
                    }
                    history.replaceState(null, null, `/documents/${responsePost.id}`)
                    this.setState({
                        postId: responsePost.id
                    })
                } else {
                    await request(`/documents/${this.state.postId}`, {
                        method: 'PUT',
                        body: JSON.stringify(editPost)
                    })
                }
            }, 500)
        }
    })

    this.setState = async (nextState) => {
        if (nextState === undefined) {
            return
        }
        if (this.state.postId !== nextState.postId) {
            this.state = nextState

            if (this.state.postId === 'new') {
                this.render()
                editor.setState(post)
            } else {
                await fetchPost()
            }
            return
        }
        
        this.state = nextState

        this.render()
        editor.setState(this.state.post || {
            title: '',
            content: ''
        })
    }
    

    this.render = () => {
        $target.appendChild($page)
    }


    const fetchPost = async () => {
        const { postId } = this.state

        if (postId !== 'new') {
            const responsePost = await request(`/documents/${postId}`)
            this.setState({
                ...this.state,
                responsePost
            })
        }
    }
}