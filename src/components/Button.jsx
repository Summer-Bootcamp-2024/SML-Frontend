function Button({label, className, onClick, type='button'}) {
    return (
        <button 
        onClick={onClick} 
        className={`flex justify-center items-center text-stone-50 text-[16px] font-extrabold tracking-tight w-[120px] h-[45px] bg-custom-indigo rounded-[10px] border border-zinc-300 cursor-pointer ${className}`}
        type={type}>
            {label}
        </button>
    )
}

export default Button;