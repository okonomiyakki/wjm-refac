import React, { useState, useEffect } from "react";

export interface propsType {
    searchKeyword: string;
}

const SearchPlaces = () => {
    const [inputText, setInputText] = useState("");
    const [place, setPlace] = useState("");

    const onChange = (e: { preventDefault: () => void; target: { value: string }; }) => {
        //엔터누르면 현재위치로 검색안되게하는거 추가해야함
        setInputText(e.target.value);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setPlace(inputText);
    };

    return (
        <div id="menu_wrap" className="bg_white">
            <div className="option">
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder=' 출발지를 입력해 주세요!'
                            onChange={onChange}
                            value={inputText}
                            id="keyword"
                            size={15}
                        ></input>
                        <button type="submit">검색하기</button>
                    </form>
                </div>
            </div>
            <hr></hr>
            <ul id="placesList"></ul>
            <div id="pagination"></div>
        </div>
    );
};

export default SearchPlaces;
