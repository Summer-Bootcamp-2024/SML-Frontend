import { useApiUrlStore, useUserIdStore } from "../../../store/store";
import basicProfile from '../../../assets/images/myprofile/basicProfile.png';
import { useState, useEffect } from "react";
import axios from "axios";
function ProfileImg({src}) {
    return (
        <img src={src || basicProfile}
        className="w-[100px] h-[100px] rounded-full" />
    )
}

export default ProfileImg;