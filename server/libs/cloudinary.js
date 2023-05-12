import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: "dlxh56jjm",
    api_key: "499893948246342",
    api_secret: "XbajelkdZRekR0HIVS4ywEr_xhw"
})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'posts'
    })
}
export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}