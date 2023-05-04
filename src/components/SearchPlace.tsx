import React, { useState, useEffect } from "react";
import MapContainer from "./MapContainer";

const kakao = (window as any).kakao;
export interface propsType {
    searchKeyword: string;
}

interface placeType {
    place_name: string;
    road_address_name: string;
    address_name: string;
    phone: string;
    place_url: string;
}

const SearchPlaces = () => {
    const [InputText, setInputText] = useState("");
    const [Keyword, setKeyword] = useState("");

let markers: any[] = [];
    useEffect(() => {
        const container = document.getElementById("map"),
            mapOption = {
                center: new kakao.maps.LatLng(
                    37.566826004661,
                    126.978652258309
                ),
                level: 9,
            };
        // 지도를 생성합니다
        const map = new kakao.maps.Map(container, mapOption);

        const ps = new kakao.maps.services.Places();

        searchPlaces();

        function searchPlaces() {
            let keyword = Keyword;
            if (keyword != "") {
                if (!keyword.replace(/^\s+|\s+$/g, "")) {
                    alert("검색 결과 중 오류가 발생했습니다.");
                    return false;
                }

                ps.keywordSearch(keyword, placesSearchCB); // 키워드로 장소검색 요청
            }
        }

        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data: any, status: any, pagination: any) {
            if (status === kakao.maps.services.Status.OK) {
                // 정상적으로 검색이 완료됐으면
                // 검색 목록을 표출합니다
                displayPlaces(data);

                displayPagination(pagination);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                alert("검색 결과가 존재하지 않습니다.");
                // setInputText("");
                return;
            } else if (status === kakao.maps.services.Status.ERROR) {
                alert("검색 결과 중 오류가 발생했습니다.");
                // setInputText("");
                return;
            }
        }

        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places: string | any[]) {
            var listEl = document.getElementById("placesList"),
                menuEl = document.getElementById("menu_wrap"),
                fragment = document.createDocumentFragment(),
                listStr = "";

            // 검색 결과 목록에 추가된 항목들을 제거합니다
            listEl && removeAllChildNods(listEl);

            for (var i = 0; i < places.length; i++) {
                var itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                // (function (address_name, lat, lng, place_name) {
                //     itemEl.onclick = function () {
                //         setClickPlace(address_name);
                //         setLat(lat);
                //         setLng(lng);
                //         setName(place_name);
                //     };
                // })(
                //     places[i].address_name,
                //     places[i].y,
                //     places[i].x,
                //     places[i].place_name
                // );

                fragment.appendChild(itemEl);
            }

            // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
            listEl && listEl.appendChild(fragment);
            if(menuEl) menuEl.scrollTop = 0;
        }

        // 검색결과 항목을 Element로 반환하는 함수입니다
        function getListItem(index: number, places: placeType) {
            var el = document.createElement("li"),
                itemStr =
                    '<span class="markerbg marker_' +
                    (index + 1) +
                    '"></span>' +
                    '<div class="info">' +
                    "   <h5>" +
                    places.place_name +
                    "</h5>";

            itemStr += "    <span>" + places.address_name + "</span>";

            el.innerHTML = itemStr;
            el.className = "item";

            return el;
        }

        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        function displayPagination(pagination: { last: number; current: number; gotoPage: (arg0: number) => void }) {
            var paginationEl = document.getElementById("pagination") as HTMLElement,
                fragment = document.createDocumentFragment(),
                i;

            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationEl.hasChildNodes()) {
                paginationEl.lastChild &&
                paginationEl.removeChild(paginationEl.lastChild);
            }

            for (i = 1; i <= pagination.last; i++) {
                var el = document.createElement("a") as HTMLAnchorElement;
                el.href = "#";
                el.innerHTML = i.toString();;

                if (i === pagination.current) {
                    el.className = "on";
                } else {
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i);
                        };
                    })(i);
                }

                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }

        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        function removeAllChildNods(el: HTMLElement) {
            while (el.hasChildNodes()) {
                el.lastChild &&
                el.removeChild(el.lastChild);
            }
        }
    }, [Keyword]);

    const handleChange = (e: {
        preventDefault: () => void;
        target: { value: string };
    }) => {
        e.preventDefault();
        setInputText(e.target.value);
        //엔터누르면 현재위치로 검색안되게하는거 추가해야함
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setKeyword(InputText);
    };

    return (
        <>
            {/* <MapContainer searchKeyword={Keyword} /> */}
            <div
                id="map"
                style={{
                    width: "100%",
                    height: "800px",
                    position: "relative",
                    overflow: "hidden",
                }}
            ></div>
            <div id="menu_wrap" className="bg_white">
                <div className="option">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="   출발지를 입력해 주세요!"
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
