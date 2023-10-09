import React, {useState, useEffect} from 'react';
import "./ProfileImage.scss";
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import AvatarEditor from 'react-avatar-edit';

//import EditProfile from "./EditProfile";

function ProfileImage() {
        const [src, setSrc] = useState("");
        const [preview, setPreview] = useState("");
    
        const onClose = () => {
            setPreview("null");
        }
    
        const onCrop = (view: string) => {
            setPreview(view);
        }
    
        //Handle a big file 
        const onBeforeFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
            if(e.target.files && e.target.files[0].size > 71680) {
                alert("File is too big!");
                e.target.value = "";
            }
        }
    
        useEffect(() => {
            console.log(preview)
        }, [preview])
    
    return (
        <div>
        <AvatarEditor 
            width={400}
            height={300}
            onCrop={onCrop}
            onClose={onClose}
            src={src}
            onBeforeFileLoad={onBeforeFileLoad}
        />
        {preview && <img src={preview} />}

        <div className="img-wrap img-upload">
                <img src={profileIcon}/>
            </div>
        </div>
       
    )
}

export default ProfileImage

