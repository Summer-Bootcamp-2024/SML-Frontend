import Logo from "../../assets/images/LogoImg.png"

function Header() {
    return(
        <div>
            <div className="flex w-full h-[80px]items-center justify-between font-[GmarketSansMedium]">
                <div className="flex h-[80px] items-center justify-between p-[10px] ml-[80px]">
                    <a href="/">
                        <img src={Logo} className="w-[230px]"/>
                    </a>
                </div>
                <div className="flex w-[190px] h-[80px] items-center justify-between mr-[80px] p-[10px]">
                    <a href="/signup" className="text-[20px] text-custom-indigo font-bold">회원가입</a>
                    <a href="/login" className="text-[20px] text-custom-indigo font-bold">로그인</a>
                </div>
                
            </div>
        </div>
    )
}
export default Header