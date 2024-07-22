import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { MdPhotoCamera } from "react-icons/md";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useApiUrlStore, useUserIdStore } from "../store/store";
import axios from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function MypageEdit() {
    const { apiUrl } = useApiUrlStore();
    const { user_id } = useUserIdStore();
    const [postImg, setPostImg] = useState([]);
    const [previewImg, setPreviewImg] = useState([]);
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

    const imgRef = useRef(null);
    const navigate = useNavigate();

    //S3 설정
    const S3_BUCKET = 'm-team-bucket';
    const REGION = 'ap-northeast-2';

    //업로드 할 파일 정보 설정
    const s3Client = new S3Client({
        region: REGION,
        credentials: {
            accessKeyId: 'AKIA6ODUZREPJZJU7HMV',
            secretAccessKey: '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',
        }
    });

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
                window.alert('프로필 조회 실패');
            }
        }
        fetchProfileData();
    }, []);

    //S3에 파일 업로드
    const uploadToS3 = async (file) => {
        const fileName = `${Date.now()}_${file.name}`;
        const params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Body: file,
            ACL: 'public-read',
        }

        try {
            const command = new PutObjectCommand(params);
            const data = await s3Client.send(command);
            return `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const showImg = () => {
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

        if (postImg) {
            try {
                const image_url = await uploadToS3(postImg);
                profileData.image_url = image_url;
            } catch (err) {
                window.alert('이미지 업로드 실패');
                return;
            }
        }
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
                            <label className="text-sm font-medium text-custom-indigo">프로필 사진 선택</label>
                        </form>
                    </div>
                    <div className="flex w-[80%] gap-[30px] pt-[75px] pl-[68px]">
                        <ul className="flex flex-col gap-[23px]">
                            <li>이름</li>
                            <li>나이</li>
                            <li>직업</li>
                            <li>성별</li>
                            <li>회사</li>
                            <li>위치</li>
                            <li>관심분야</li>
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
                            <input 
                            type="text" 
                            placeholder="백엔드 개발자"
                            name="job"
                            value={profileData.job}
                            onChange={handleInputChange} 
                            className="w-[250px] h-[27px] pl-[15px] text-black bg-custom-white rounded-[5px] border border-custom-grey" />
                            <input 
                            type="text" 
                            placeholder="Men" 
                            name="gender"
                            value={profileData.gender}
                            onChange={handleInputChange}
                            className="w-[250px] h-[27px] pl-[15px] text-black bg-custom-white rounded-[5px] border border-custom-grey" />
                            <input 
                            type="text" 
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
                            <input 
                            type="text" 
                            placeholder="면접" 
                            name="category"
                            value={profileData.category}
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