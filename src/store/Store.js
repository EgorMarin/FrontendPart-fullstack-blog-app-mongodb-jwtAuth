import {types, getParent, flow, getSnapshot, onSnapshot} from 'mobx-state-tree'
import axios from 'axios'

// User Model
const UserModel = types.model('User', {
  token: types.maybeNull(types.string),
  userId: types.maybeNull(types.string),
  registered: types.boolean
})
.actions(self => ({
  register: flow(function* register({username, email, password}) {
    const {data} = yield axios.post("http://localhost:4000/api/user/register", {username, email, password})
    if (data.error) {
      // getRoot(self).setError(data.error)
      return getParent(self).setError(data.error)
    }
    self.registered = true
  }),
  login: flow(function* login({email, password}) {
    const {data} = yield axios.post("http://localhost:4000/api/user/login", {email, password})
    if (data.error) {
      return getParent(self).setError(data.error)
    }
    // set token and user id
    localStorage.setItem('storage', JSON.stringify({token: data.token, userId: data.userId}))
    // self.token = data.token
    // self.userId = data.userId
  }),
  getUserId() {
    const {userId} = JSON.parse(localStorage.getItem('storage') || "{}")
    self.userId = userId
  },
  getToken() {
    const {token} = JSON.parse(localStorage.getItem('storage') || "{}")
    self.token = token
  }
}))


//Post Model
const PostModel = types.model('Post', {
  _id: types.optional(types.string, ''),
  username: types.optional(types.string, ''),
  text: types.optional(types.string, ''),
  userId: types.optional(types.string, ''),
  createdAt: types.optional(types.string, ''),
  updatedAt: types.optional(types.string, ''),
  __v: types.maybe(types.number)
})


// Store Model
const StoreModel = types.model('Store', {
  posts: types.array(PostModel),
  post: PostModel,
  user: UserModel,
  error: types.maybeNull(types.string),
  count: types.number,
  loading: types.boolean
})
.actions(self => ({
  setError(error) {
    self.error = error
  },
  fetchPosts: flow(function* fetchPosts(index) {
    self.loading = true
    const {data} = yield axios.get(`http://localhost:4000/api/posts/${index}`)
    // Ошибка способ №1: вносим error в self.error
    if (data.error) {
      return self.error = data.error
    }
    self.posts = data.posts
    self.count = data.count
    self.loading = false
  }),
  fetchPost: flow(function* fetchPost(id) {
    self.loading = true
    const {data} = yield axios.get(`http://localhost:4000/api/posts/post/${id}`)
    if (data.error) {
      return self.error = data.error
    }
    self.post = data
    self.loading = false
    //не успевает текст занестись в форму, поэтому возращаем text из запроса
    return self.post.text
  }),
  createPost: flow(function* createPost(text) {
    const {data} = yield axios.post("http://localhost:4000/api/posts/create", {text}, { headers: {'authtoken': self.user.token}})
    // Ошибка способ №2: возвращаем error в ответ на запрос
    if (data.error) return data.error
  }),
  editPost: flow(function* editPost({id, text}) {
    const {data} = yield axios.post(`/api/posts/edit/${id}`, {text}, { headers: {'authtoken': self.user.token}})
    if (data.error) return data.error
  }),
  deletePost: flow(function* deletePost(id) {
    const {data} = yield axios.delete(`/api/posts/delete/${id}`, { headers: {'authtoken': self.user.token}})
    if (data.error) return data.error
  }),
  setLoading(boolValue) {
    self.loading = boolValue
  }
}))


// Instance of Store
export const store = StoreModel.create({
  posts: [],
  post: {},
  user: {
    token: null,
    userId: null,
    registered: false
  },
  error: null,
  count: 0,
  loading: false
})

console.log("Store", getSnapshot(store))
onSnapshot(store, (snapshot) => console.log(snapshot))
