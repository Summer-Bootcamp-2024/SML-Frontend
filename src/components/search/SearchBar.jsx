import Button from "../Button";
import axios from "axios";
import { useState } from "react";
import { useApiUrlStore, useUserIdStore } from "../../store/store";

function SearchBar({ setSearchResults }) {
    const { apiUrl } = useApiUrlStore();
    const { user_id } = useUserIdStore();
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categoryList = [
        { value: 'category', name: '카테고리' },
        { value: 'job', name: '직업' },
        { value: 'company', name: '회사' },
    ];

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }

        try {
            const response = await axios.get(`${apiUrl}/search`, {
                params: { user_id, search: query, filter_by: selectedCategory }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error(error.response?.data?.detail || error.message);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex">
            <select
                name="filter"
                value={selectedCategory}
                onChange={handleCategoryChange}
                required
                className="w-[120px] h-[50px] bg-stone-50 rounded-[10px] border border-custom-grey pl-[23px] ml-[20px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight"
            >
                {categoryList.map((item) => (
                    <option value={item.value} key={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="이촌을 찾기위한 관심분야를 적어보세요!"
                className="w-[400px] h-[50px] bg-custom-white rounded-[10px] indent-[20px] text-[16px] ml-[20px] border-[1px] border-custom-grey"
            />
            <Button type="submit" label="검색" className="w-[95px] h-[50px] text-[16px] ml-[30px]" />
        </form>
    );
}

export default SearchBar;
