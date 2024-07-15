import Sidebar from "../components/Sidebar";
import Search from "../components/search/SearchBar";
import { MdPeople } from "react-icons/md";

function SearchPageMain() {
    return (
        <div>
            <div className="flex w-full h-[100vh]">
                <Sidebar></Sidebar>
                <div className="flex flex-col items-center w-[calc(100vw-296px)] h-full">
                    <div className="flex h-[150px] items-center justify-start w-full border-b-[1px] border-custom-grey">
                        <Search></Search>
                    </div>
                    <div className="flex items-center justify-center w-full h-full">
                        <div className="flex flex-col items-center justify-center text-custom-grey">
                            <MdPeople className="w-[200px] h-[200px]"></MdPeople>
                            <span className="text-2xl font-bold">나의 일촌의 일촌과 친구가 되어보세요!</span>
                            <span className="font-bold">원하는 관심분야를 검색하면 해당되는 이촌을 보여드립니다</span>
                         </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default SearchPageMain;