import SearchBar from "./SearchBar";
import Button from "../Button";
import { Link } from "react-router-dom";

function SearchCon() {
    return (
        <div className="flex gap-[38px]">
            <SearchBar></SearchBar>
            <Link to='/search/result'>
                <Button label="검색" className="h-[66px]"></Button>
            </Link>
            
        </div>
    )
}

export default SearchCon;