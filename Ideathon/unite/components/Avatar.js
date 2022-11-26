import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = useSupabaseClient()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${uid}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
    <label style={{cursor:'pointer'}}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image rounded-full -ml-12"
          style={{ height: size, width: size }}
        />
      ) : (
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Avatar"
          className="avatar image rounded-full -ml-12"
          style={{ height: size, width: size }}
        />
      )}
      <div style={{ width: size }}>
      
      <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
        <button className="button primary block cursor-pointer mt-2 hover:text-blue-600 hover:underline" htmlFor="single" >
          {uploading ? 'Uploading ...' : 'Upload'}
        </button>
      </div>
        </label>
    </div>
  )
}
