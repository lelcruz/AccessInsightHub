import React, {useState, useEffect} from 'react';
import "./ProfileImage.scss";
import AvatarEditor from 'react-avatar-edit';     
import Modal from "../Modal Component/ModalComponent";
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import BasicButtonComponent from '../Buttons/BasicButtonComponent';


function ProfileImage() {
    const [src, setSrc] = useState("");
    const [img, setImg] = useState("");
    const [preview, setPreview] = useState("");
    const [show, setModalShow] = useState(false); 
    const [isMatched, setIsMatched] = useState(false);
   
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
        }
        else{
            return Number(450);
        }
    }

    const widthSize: number = setWidthSize();

    //Handle a big file 
    const onBeforeFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0].size > 2000000) {
            alert("File is too big!");
            e.target.value = "";
        }
    }

    return (
        <div>
            
            <div className="img-upload" onClick={openModal}>
                <img src={img? img : profileIcon} />
            </div>
                
        <Modal isOpen={show} onClose={closeModal} size="l">
            <div className="crop-modal">
                <AvatarEditor 
                    width={widthSize}
                    imageWidth={widthSize}
                    height={300}
                    onCrop={onCrop}
                    onClose={onClose}
                    src={src}
                    onBeforeFileLoad={onBeforeFileLoad}
                />
            
                {preview && <img src={preview} alt="Preview" />}
                <div>
                    <BasicButtonComponent color={"light"} title={"Save"} onClick={() => {setImg(preview); closeModal();}} />
                </div>
                
            </div>
        </Modal>
        </div>

    )
}

export default ProfileImage

