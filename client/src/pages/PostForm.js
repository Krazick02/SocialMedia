import { Form, Formik, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import { usePosts } from "../context/postContext"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { VscLoading } from "react-icons/vsc";


export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts()
  const navigate = useNavigate()
  const params = useParams()
  const [post, setPost] = useState({
    title: '',
    description: '',
    image: ''
  })


  useEffect(() => {
    (async () => {
      if (params.id) {
        const actual = await getPost(params.id);
        setPost(actual)
      }
    })();
  }, [params.id]);


  return (
    <div className="flex items-center justify-center" >
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">

        <header className="flex items-center py-4 px-4 text-white justify-between">
          <h3 className="text-xl">Nueva Publicacion</h3>
          <Link to='/' className="text-gray-400 text-sm hover:text-gray-300"> Regresar</Link>
        </header>

        <Formik
          initialValues={{
            title: post.title,
            description: post.description,
            image: post.image
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required")
          })}
          onSubmit={async (values, actions) => {

            if (params.id) {
              await updatePost(params.id, values)
            } else {
              await createPost(values)
            }

            actions.setSubmitting(false)

            navigate('/')
          }}
          enableReinitialize={true}
        >
          {({ handleSubmit,setFieldValue , isSubmitting}) => (
            <Form onSubmit={handleSubmit}>

              <label htmlFor="title" className="text-sm block font-bold text-gray-400">Title</label>
              <Field name='title' placeholder="title"
                className='px-3 py-2 focus:outline-nonde rounded bg-gray-600 text-white w-full'
              />
              <ErrorMessage component={'p'} className="text-red-400 textsm" name="title" />
              <label htmlFor="Descrption" className="text-sm block font-bold text-gray-400"> Description</label>
              <Field component={'textarea'} name='description' placeholder="description"
                className='px-3 py-2 focus:outline-nonde rounded bg-gray-600 text-white w-full'
                rows={3}
              />
              <ErrorMessage component={'p'} className="text-red-400 textsm" name="description" />
              <label htmlFor="image" className="text-sm block font-bold text-gray-400">Image</label>
              <input type="file" name="image" id="" className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" 
                onChange={(e) => {
                  setFieldValue('image',e.target.files[0])
                }}
              />
              
              <button disabled={isSubmitting} type="submit" className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md mt-2 text-white focus:outline-none disabled:bg-indigo-300">
                {isSubmitting ? 
                  <VscLoading className="animate-spin h-5 w-5"/>
                : 'Guardar'}

              </button>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  )
}