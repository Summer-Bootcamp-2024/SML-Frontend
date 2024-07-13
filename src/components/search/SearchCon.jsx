import SearchBar from "./SearchBar";
import Button from "../Button";

function SearchCon() {
    return (
        <div className="flex gap-[38px]">
            <SearchBar></SearchBar>
            <Button label="검색" className="h-[66px]"></Button>
        </div>
    )
}

export default SearchCon;