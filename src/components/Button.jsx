function Button({label, className}) {
    return (
        <div className={`flex justify-center items-center text-stone-50 text-xl font-extrabold tracking-tight w-[150px] h-[50px] bg-gray-600 rounded-[10px] border border-zinc-300 cursor-pointer ${className}`}>
            {label}
        </div>
    )
}

export default Button;