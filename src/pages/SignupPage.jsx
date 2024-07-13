import Button from "../components/Button";

function SignupPage() {
    return (
        <div className="flex w-full h-[100vh] items-center justify-center bg-[#D7ECFF]">
            <div className="flex flex-col gap-[28px] justify-center items-center w-[450px] h-[550px] rounded-[20px] shadow-2xl bg-white">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-600">Sign up</h1>
                <form className="flex flex-col gap-[18px]">
                    <input 
                    type="text" 
                    placeholder="name"
                    className="w-[300px] h-[50px] bg-stone-50 rounded-[10px] border border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight" />
                    <input 
                    type="email" 
                    placeholder="email"
                    className="w-[300px] h-[50px] bg-stone-50 rounded-[10px] border border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight" />
                    <input 
                    type="password" 
                    placeholder="password"
                    className="w-[300px] h-[50px] bg-stone-50 rounded-[10px] border border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight" />
                    <input 
                    type="text" 
                    placeholder="gender"
                    className="w-[300px] h-[50px] bg-stone-50 rounded-[10px] border border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight" />
                    <input 
                    type="text" 
                    placeholder="region"
                    className="w-[300px] h-[50px] bg-stone-50 rounded-[10px] border border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight" />
                </form>
                <Button label="Join"></Button>
            </div>
        </div>
    )
}

export default SignupPage;