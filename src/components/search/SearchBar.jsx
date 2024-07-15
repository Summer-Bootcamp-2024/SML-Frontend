import Button from "../Button";
import { Link } from "react-router-dom";

function SearchCon() {
    return (
        <div className="flex ">
            <input 
        type="text"
        placeholder="이촌을 찾기위한 관심분야를 적어보세요!"
        className="w-[500px] h-[50px] bg-custom-white rounded-[10px] indent-[20px] text-[16px] ml-[50px] border-[1px] border-custom-indigo" />
            <Link to='/search/result'>
                <Button label="검색" className=" w-[95px] h-[50px] text-[16px] ml-[30px]"></Button>
            </Link>
            
        </div>
    )
}

export default SearchCon;