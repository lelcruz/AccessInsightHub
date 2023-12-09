import React, {useEffect, useState} from 'react';
import "./ProfileImage.scss";
import AvatarEditor from 'react-avatar-edit';
import Modal from "../Modal Component/ModalComponent";
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import BasicButtonComponent from '../Buttons/BasicButtonComponent';
import {auth, upload} from '../../configurations/firebase';

function ProfileImage() {
    // State for image source, upload, and loading status
    const [src, setSrc] = useState("");
    const [photoURL, setPhotoURL] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState("");
    const [show, setModalShow] = useState(false);

    //------------------------------------//BACKENND//------------------------------------//
    const user = auth.currentUser

    //Handle a big file, if not, update file
    const onBeforeFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0].size > 2000000) {
            alert("File is too big!");
            e.target.value = "";
        }
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
    }

    // Handle click event to upload the selected photo
    async function handleClick() {
        if (photo && user) {
            await upload(photo, user, setLoading);
        }
        setModalShow(false);
        setPreview("");
    }

    // useEffect to set the user's photo URL
    useEffect(() => {
        if (user && user.photoURL) {
            setPhotoURL(user.photoURL);
        }
    }, [user])
    //------------------------------------//BACKENND//------------------------------------//
    // Modal control functions
    const openModal = () => {
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
        setPreview("");
    };

    const onClose = () => {
        setPreview("");
    };

    const onCrop = (view: string) => {
        setPreview(view);
    };

    //Function to set width for small screen
    const setWidthSize = () => {
        if (window.matchMedia("(max-width: 500px)").matches) {
            return Number(300);
        } else {
            return Number(450);
        }
    }
    const widthSize: number = setWidthSize();
    
    // Render the profile image component with modal for image editing
    return (
        <div>

            <div className="img-upload" onClick={openModal}>
                <img src={photoURL ? photoURL : profileIcon}/>
            </div>

            <Modal isOpen={show} onClose={closeModal} size="l">
                <div className="crop-modal">
                    <AvatarEditor
                        width={widthSize}
                        //imageWidth={widthSize}
                        height={300}
                        onCrop={onCrop}
                        onClose={onClose}
                        src={src}
                        onBeforeFileLoad={onBeforeFileLoad}
                    />

                    {preview && <img src={preview} alt="Preview"/>}
                    <div>
                        <BasicButtonComponent color={"light"} title={"Save"} onClick={() => {
                            setPhotoURL(preview);
                            handleClick();
                        }}/>
                    </div>

                </div>
            </Modal>
        </div>

    )
}

export default ProfileImage;

