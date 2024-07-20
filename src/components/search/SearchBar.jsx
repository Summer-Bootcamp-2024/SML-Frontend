import Button from "../Button";
import axios from "axios";
import { useState } from "react";
import { useApiUrlStore, useUserIdStore } from "../../store/store";

function SearchBar({ setSearchResults }) {
    const { apiUrl } = useApiUrlStore();
    const { user_id } = useUserIdStore();
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!query.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }

        try {
            const response = await axios.get(`${apiUrl}/search`, {
                params: { user_id, search: query }
            });
            setSearchResults(response.data);
        } catch (err) {
            console.error(err.response.data.detail);
        }
    }
    return (
        <form onSubmit={handleSearch} className="flex">
            <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이촌을 찾기위한 관심분야를 적어보세요!"
            className="w-[500px] h-[50px] bg-custom-white rounded-[10px] indent-[20px] text-[16px] ml-[50px] border-[1px] border-custom-indigo" />
            <Button type="submit" label="검색" className=" w-[95px] h-[50px] text-[16px] ml-[30px]"></Button>
        </form>
    )
}

export default SearchBar;