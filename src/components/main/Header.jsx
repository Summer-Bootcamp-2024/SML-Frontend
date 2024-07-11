import Lottiefile from "../Logolottie"

function Header() {
    return(
        <div>
            <div className="flex w-full h-[80px]items-center justify-between">
                <div className="flex w-[175px] h-[80px] items-center justify-between p-[10px] ml-[80px]">
                    <Lottiefile/>
                    <a href="/" className="text-[28px] text-custom-indigo font-bold">SML</a>
                </div>
                <div className="flex w-[190px] h-[80px] items-center justify-between mr-[80px] p-[10px]">
                    <a href="/signup" className="text-[20px] text-custom-indigo font-bold">Sign Up</a>
                    <a href="/login" className="text-[20px] text-custom-indigo font-bold">Login</a>
                </div>
                
            </div>
        </div>
    )
}
export default Header