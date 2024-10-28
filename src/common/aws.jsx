import axios from "axios"

const uploadImage = async(img) =>{

    let imgURL= null;
    await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/get-upload-url`)
    .then(async({ data: {uploadURL}}) =>{
        await axios({
            method : 'PUT',
            url: uploadURL,
            headers: {'Content-Type': 'multipart/form-data'},
            data: img
        })
        .then(()=>{
            //console.log(uploadURL)
            imgURL = uploadURL.split("?")[0]
        })
    })
    return imgURL;

}
export default uploadImage;