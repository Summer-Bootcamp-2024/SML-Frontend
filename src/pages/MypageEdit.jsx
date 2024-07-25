import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { MdPhotoCamera } from "react-icons/md";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useApiUrlStore, useUserIdStore } from "../store/store";
import axios from "axios";

function MypageEdit() {
    const { apiUrl } = useApiUrlStore();
    const { user_id } = useUserIdStore();
    const [_postImg, setPostImg] = useState([]);
    const [previewImg, setPreviewImg] = useState([]);
    const imgRef = useRef(null);
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        name: '',
        age: '',
        job: '',
        gender: '',
        company: '',
        region: '',
        category: '',
        image_url: ''
    });

    const categoryList = [
        { value: 'IT/SW', name: 'IT/SW' },
        { value: 'Finance/Insurance', name: '금융/보험' },
        { value: 'Production', name: '제조업' },
        { value: 'Service', name: '서비스업' },
        { value: 'Education', name: '교육' },
        { value: 'Medical', name: '의료/보건' },
        { value: 'Legal', name: '법률' },
        { value: 'Media', name: '미디어/홍보' },
        { value: 'Art', name: '예술/디자인' },
        { value: 'Science', name: '연구/과학' }
    ];

    const jobList = [
        { name: '개발자', value: 'Developer'},
        { name: '금융 전문가', value: 'Finance Professional'},
        { name: '생산 관리자', value: 'Production Manager'},
        { name: '서비스 관리자', value: 'Service Manager'},
        { name: '교육 전문가', value: 'Education Professional'},
        { name: '의료 전문가', value: 'Healthcare Professional'},
        { name: '법률 전문가', value: 'Legal Professional'},
        { name: '미디어/커뮤니케이션 전문가', value: 'Media & Communication Professional'},
        { name: '디자이너', value: 'Designer'},
        { name: '연구원', value: 'Researcher'}
    ];


    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users/${user_id}`, {
                    withCredentials: true,
                });
                const data = response.data;
                setProfileData({
                    name: data.name,
                    age: data.age,
                    job: data.job,
                    gender: data.gender,
                    company: data.company,
                    region: data.region,
                    category: data.category,
                    image_url: data.image_url
                });
                setPreviewImg(data.image_url);
            } catch (err) {
                console.error('Error fetching profile data:', err);
            }
        }
        fetchProfileData();
    }, []);

    const postProfileImg = async (e) => {
        try {
            const selectedFile = e.target.files?.[0];
            if (!selectedFile) {
                return;
            }

            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.put(`${apiUrl}/users/profile/${user_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            setProfileData({...profileData, image_url: response.data.s3Url});
        } catch (err) {
            console.error('Error fetching profile image upload:', err);
        }

    }

    const showImg = (e) => {
        //imgRef가 참조하는 요소 존재, 그 요소에 파일이 있는지 확인
        if (imgRef.current && imgRef.current.files) {
            //img 변수에 사용자가 선택한 첫 번째 파일 저장
            const img = imgRef.current.files[0];
            //선택한 이미지 파일을 저장
            setPostImg(img);
            //이미지 미리보기를 위한 객체 생성
            const reader = new FileReader();
            //객체를 사용해 이미지를 읽고 url 형태로 변환
            reader.readAsDataURL(img);
            //파일을 다 읽으면 onload가 발생하고, 변환된 url을 미리보기 상태에 저장
            reader.onload = () => {
                setPreviewImg(reader.result);
            }
        }
        postProfileImg(e); //이미지 미리보기 후 서버에 업로드
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData, 
            [name]: value
         });
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        
        try {
            await axios.put(`${apiUrl}/users/${user_id}`, profileData, {
                withCredentials: true,
            });
            navigate('/mypage');
        } catch (err) {
            window.alert('프로필 수정 실패');
        }
    }

    return (
        <div className="flex justify-end w-full h-[100vh] font-[Pretendard]">
            <Sidebar />
            <div className="flex flex-col gap-[46px] justify-center items-center w-[calc(100vw-296px)] h-[100vh]">
                <div className="flex w-[840px] h-[450px] bg-custom-grey/10 rounded-[10px] shadow-custom-blue/30 shadow-lg border-2 border-custom-blue">
                    <div className="flex flex-col gap-[20px] pl-[50px] pt-[28px]">
                        <h1 className="text-2xl font-black tracking-tight underline text-custom-indigo">My PROFILE</h1>
                        <form className="flex flex-col gap-[10px] w-[142.64px] items-center">
                            <input onChange={showImg} ref={imgRef} id="photo" className="hidden" type="file" accept=".png, .jgeg, .jpg" />
                            <label htmlFor="photo" className="bg-gray-300 w-[142.64px] h-[137.74px] flex justify-center items-center cursor-pointer">
                            {previewImg ? (
                                <img className="w-full h-full" src={previewImg} />
                                ) : (
                                <MdPhotoCamera size={60} className="text-white" />
                            )}
                            </label>
                            <label htmlFor="photo" className="text-sm font-medium cursor-pointer text-custom-indigo">프로필 사진 선택</label>
                        </form>
                    </div>
                    <div className="flex w-[80%] gap-[30px] pt-[75px] pl-[68px]">
                        <ul className="flex flex-col gap-[23px]">
                            <li>이름</li>
                            <li>나이</li>
                            <li>직업</li>
                            <li>관심분야</li>
                            <li>성별</li>
                            <li>회사</li>
                            <li>위치</li>
                        </ul>
                        <form onSubmit={handleUpdateProfile} className="relative w-[80%] flex flex-col gap-[20px]">
                            <input 
                            type="text" 
                            placeholder="Jhon" 
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="w-[250px] h-[27px] pl-[15px] text-black bg-custom-white rounded-[5px] border border-custom-grey" />
                            <input 
                            type="text" 
                            placeholder="27" 
                            name="age"
                            value={profileData.age}
                            onChange={handleInputChange}
                            className="w-[250px] h-[27px] pl-[15px] text-black bg-custom-white rounded-[5px] border border-custom-grey" />
                             <select 
                                name="job"
                                value={profileData.job}
                                onChange={handleInputChange}
                                className="w-[250px] h-[27px] pl-[15px] text-black bg-custom-white rounded-[5px] border border-custom-grey"
                            >
                                {jobList.map((item) => (
                                    <option value={item.value} key={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <select 
                                name="category"
                                value={profileData.category}
                                onChange={handleInputChange}
                                className="w-[250px] h-[27px] pl-[15px] text-black bg-custom-white rounded-[5px] border border-custom-grey"
                            >
                                {categoryList.map((item) => (
                                    <option value={item.value} key={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                             </select>
                            <input 
                            type="text" 
                            placeholder="Men" 
                            name="gender"
                            value={profileData.gender}
                            onChange={handleInputChange}
                            className="w-[250px] h-[27px] pl-[15px] text-black bg-custom-white rounded-[5px] border border-custom-grey" />
                            <input 
                            placeholder="실리콘밸리" 
                            name="company"
                            value={profileData.company}
                            onChange={handleInputChange}
                            className="w-[250px] h-[27px] pl-[15px] text-black bg-custom-white rounded-[5px] border border-custom-grey" />
                            <input 
                            type="text" 
                            placeholder="서울시 중구" 
                            name="region"
                            value={profileData.region}
                            onChange={handleInputChange}
                            className="w-[250px] h-[27px] pl-[15px] text-black bg-custom-white rounded-[5px] border border-custom-grey" />
                            <Button type="submit" label="수정 완료" className="absolute right-4 bottom-6"></Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default MypageEdit;