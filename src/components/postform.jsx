import React, {useCallback, useEffect} from 'react'
import Button from './button'
import Input from './input'
import Select from './Select'
import dbservice from '../appwrite/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import RTE from './RTE'

function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues: {
        title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if(post) {
            const file = data.image[0] ? await dbservice.uploadFile(data.image[0]) : null
              
            if(file) {dbservice.deleteFile(post.image)}
                
            const dbPost = await dbservice.updatePost(post.$id, {...data, image: file? file.$id : undefined})
                
            if (dbPost) {
                navigate(`/posts/${dbPost.$id}`)
            }
        } else {
            const file = await dbservice.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.image = fileId
                const dbPost = await dbservice.createPost({...data, userid: userData.$id})
                if (dbPost) {
                    navigate(`/posts/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')     // remove special chars
                .replace(/\s+/g, '-')         // replace spaces with -
                .replace(/-+/g, '-')          // collapse multiple dashes
        }
        return ''
    }, [])

    useEffect(()=> {
        const subscription = watch((value, {name}) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])
    return (
        <form
  onSubmit={handleSubmit(submit)}
  className="flex flex-col lg:flex-row gap-6 p-6 bg-white shadow-md rounded-lg"
>
  {/* Left: Title, Slug, Content */}
  <div className="lg:w-2/3 w-full">
    <div className="mb-4">
      <Input
        label="Title"
        placeholder="Enter post title"
        className="w-full"
        {...register("title", { required: true })}
      />
    </div>

    <div className="mb-4">
      <Input
        label="Slug"
        placeholder="Post slug (auto-generated)"
        className="w-full"
        {...register("slug", { required: true })}
        onInput={(e) =>
          setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
        }
      />
    </div>

    <div className="mb-4">
      <RTE
        label="Content"
        name="content"
        control={control}
        defaultValue={getValues("content")}
      />
    </div>
  </div>

  {/* Right: Image, Status, Submit */}
  <div className="lg:w-1/3 w-full flex flex-col gap-4">
    <div>
      <Input
        label="Featured Image"
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        className="w-full"
        {...register("image", { required: !post })}
      />
    </div>

    {post && (
      <div className="w-full">
        <img
          src={dbservice.getFilePreview(post.image)}
          alt={post.title}
          className="rounded-lg w-full object-cover"
        />
      </div>
    )}

    <Select
      label="Status"
      options={["active", "inactive"]}
      className="w-full"
      {...register("status", { required: true })}
    />

    <Button
      type="submit"
      bgColor={post ? "bg-green-600" : "bg-blue-600"}
      className="text-white font-semibold py-2 w-full hover:opacity-90 transition"
    >
      {post ? "Update Post" : "Submit Post"}
    </Button>
  </div>
</form>

    )
}

export default PostForm