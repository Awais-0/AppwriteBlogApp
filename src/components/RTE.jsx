import React, {useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({label, name, control, defaultValue = ''}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
        <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange, value } }) => (
            <Editor
            apiKey='ax1omdylotcw9keeup5scfn7v4tas8qkr66p4dyxch9v25b1'
            initialValue={defaultValue}
            value={value}
            onEditorChange={onChange}
            init={{
                height: 500,
                menubar: true,
                plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                'undo redo | formatselect | bold italic underline | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | removeformat | help',
                content_style:
                'body { font-family: Helvetica, Arial, sans-serif; font-size:14px }'
            }}
            />
        )}
        />
    </div>
  )
}