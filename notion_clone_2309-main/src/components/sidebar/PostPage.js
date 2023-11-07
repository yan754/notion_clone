import NewBtn from "../\bbutton/NewBtn.js"
import { pushUrl } from "../../utils/Router.js"
import { request } from "../../utils/api.js"
import PostList from "./PostList.js"

export default function PostPage ({ $target }) {
    const $page = document.createElement("div")
    $page.className = 'documentDiv'
    $target.appendChild($page)

    const postList = new PostList({ 
      $target: $page,
      initialState: [],
      onAttach: async (id) => {
        await request('/documents', {
           method: 'POST',
           body: JSON.stringify({
            title: '제목없음',
            parent: id
           })
        })
        this.setState()
      },
      onDelete: async (id) => {
        await request(`/documents/${id}`, {
          method: 'DELETE'
        })

        pushUrl('/')

        this.setState()
      }
    })
    
    new NewBtn({
      $target: $page,
      initialState: {
        text: '+ New Page',
        name: 'addNew',
        link: 'new'
      }
    })
    
    this.setState = async () => {
      const posts = await request('/documents')
      postList.setState(posts)
      this.render()
    }

    this.render = () => {
        $target.appendChild($page)
    }
}