import axios from 'axios'

export const getPostsRequests = async () => await axios.get('/posts')

export const createPostsRequests = async (post) => {
  const form = new FormData()

  for(let key in post){
    form.append(key,post[key])
  }

  return await axios.post('/posts',form , {
    headers:{
      "Content-Type" : "multipart/form-data"
    }
  })
}

export const getPostRequests = async (id) => await axios.get('/posts/' + id)

export const deletePostsRequests = async (id) => await axios.delete('/posts/' + id)

export const updatePostRequests = async (id,post) => {
  const form = new FormData()

  form.append(id,id)
  for(let key in post){
    form.append(key,post[key])
  }

  return await axios.post('/posts',form , {
    headers:{
      "Content-Type" : "multipart/form-data"
    }
  })
}