import Sidebar from "../components/Sidebar";
import SearchCon from "../components/search/SearchCon";
import { MdPeople } from "react-icons/md";

function SearchPageMain() {
    return (
        <div>
            <div className="flex w-full h-[100vh]">
                <Sidebar></Sidebar>
                <div className="flex flex-col gap-[50px] items-center w-[calc(100vw-296px)] h-full overflow-y-auto">
                    <div className="flex flex-shrink-0 h-[150px] items-center justify-center w-full border-b-2">
                        <SearchCon></SearchCon>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-full text-custom-grey/100">
                        <MdPeople className="w-[295px] h-[243px]"></MdPeople>
                        <span className="text-2xl font-bold">나의 일촌의 일촌과 친구가 되어보세요!</span>
                        <span className="font-bold">원하는 관심분야를 검색하면 해당되는 이촌을 보여드립니다</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPageMain;