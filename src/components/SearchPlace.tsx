import React, { useState, useEffect } from "react";
import MapContainer from "./MapContainer";

export interface propsType {
    searchKeyword: string;
}

const SearchPlaces = () => {
    const [InputText, setInputText] = useState("");
    const [Keyword, setKeyword] = useState("");

    const handleChange = (e: { preventDefault: () => void; target: { value: string }; }) => {
        e.preventDefault();
        setInputText(e.target.value);
        //엔터누르면 현재위치로 검색안되게하는거 추가해야함
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setKeyword(InputText);
    };

    return (
        <>
            <MapContainer searchKeyword={ Keyword }/>
            <div id="menu_wrap" className="bg_white">
                <div className="option">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder='   출발지를 입력해 주세요!'
                                onChange={handleChange}
                                value={InputText}
                                id="keyword"
                                size={20}
                            ></input>
                            <button type="submit">검색</button>
                        </form>
                    </div>
                </div>
                <hr></hr>
                <ul id="placesList"></ul>
                <div id="pagination"></div>
            </div>
        </>
    );
};

export default SearchPlaces;
