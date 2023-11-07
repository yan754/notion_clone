export default function Editor({ $target, initialState, onEditing }) {
    const $editor = document.createElement("div")
    $editor.className = "editorDiv"
    $target.appendChild($editor)

    this.state = initialState
    let isInit = false

    this.setState = (nextState) => {
        this.state = nextState
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').value = this.state.content
        this.render()
    }


    this.render = () => {
        if (!isInit) {
            $editor.innerHTML = `
                <input type="text" name="title" class="editorTitle value=${this.state.title}" placeholder="제목 없음" autofocous />
                <textarea name="content" class="editorContent" value="${this.state.content}" placeholder="내용을 입력하세요" autofocous></textarea>
            `
        isInit = true
        }
    
    }


    $editor.addEventListener('keyup', (e) => {
        const attrName =  e.target.getAttribute('name')
        
        this.setState({
            ...this.state,
            [attrName]: e.target.value
        })

        onEditing(this.state)
    })

    this.render()
}