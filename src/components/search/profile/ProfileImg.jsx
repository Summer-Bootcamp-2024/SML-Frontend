import { useApiUrlStore, useUserIdStore } from "../../../store/store";
import basicProfile from '../../../assets/images/myprofile/basicProfile.png';
import { useState, useEffect } from "react";
function ProfileImg({image_url}) {
    const [profile, setProfile] = useState({});
    const { apiUrl} = useApiUrlStore();
    const { user_id } = useUserIdStore();

    const getProfile = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/${user_id}`, {
                withCredentials: true,
            });
            setProfile(response.data);
        } catch (err) {
            console.error('Error fetching profile data:', err);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <img src={profile.image_url || basicProfile}
        className="w-[100px] h-[100px] rounded-full" />
    )
}

export default ProfileImg;