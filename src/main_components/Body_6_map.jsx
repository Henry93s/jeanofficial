import React, { useEffect,useRef } from "react";
import styled from "styled-components";
import L from 'leaflet';

const Main_container = styled.div`
    // 주요 element component PC 가운데 정렬 + 너비 80%( / 100vw )
    width: 80%;
    margin: 0 auto;
    height: 1200px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    margin-top: 600px;
    
    @media (max-width: 1000px) {
        // 주요 element component mobile은 100% 유지
        width: 100%;
    }
`
const Map_p = styled.p`
    margin-left: 20px;
    font-size: 48px;
    text-shadow: 2px 2px 2px gray;
    font-weight: 600;

    // mouse scroll 에 따른 opacity 
    opacity: 0;
    transition: opacity 3s;

    @media (max-width: 1000px) {
        font-size: 37px;
    }
`
const Map_container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 1000px) {
        flex-direction: column;
        gap: 100px;
    }
`
const Map_sub_div = styled.div`
    width: 48%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    // mouse scroll 에 따른 opacity 
    opacity: 0;
    transition: opacity 3s;

    @media (max-width: 1000px) {
        width: 100%;
    }
`
const Map_sub_div_poster = styled.div`
    width: 100%;
    height: 80%;
    border-radius: 20px;

    background: url('/images/concert.jpeg') no-repeat;
    background-size: cover;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 1000px) {
        height: 70%;
    }
`
const Map_sub_div2_p = styled(Map_sub_div_poster)`
    background: none;
    width: 100%;
    height: 20%;
    border-radius: 20px;
    font-family: "Gamja Flower";
    color: black;
    font-size: 30px;
    text-align: center;
    text-shadow: 1px 1px 1px gray;
    background-color: #F8EFE6;

    @media (max-width: 1000px) {
        font-size: 23px;
        height: 30%;
    }
`
const Map_main_div = styled.div`
    width: 48%;
    height: 100%;
    border-radius: 20px;
    z-index: 1;

    // mouse scroll 에 따른 opacity 
    opacity: 0;
    transition: opacity 3s;

    @media (max-width: 1000px) {
        width: 100%;
        height: 80%;
    }
`

const Body_6_map = () =>{
    // useRef [] 배열로 관리하기 !
    const targetRef = useRef([]);
    // scroll animation 동작 구현
    useEffect(() => {
        const osv = new IntersectionObserver((e) => {
            e.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.style.opacity = 1;
                } else {
                    entry.target.style.opacity = 0;
                }
            })
        },{
            threshold: 0.25
        });
        targetRef.current.forEach(v => {
            osv.observe(v);
        })
    },[]);

    useEffect(() => {
        // Leaflet map 생성
        const map = L.map('map', {
            center: [35.7057, 139.7514], // 도쿄 돔 위도와 경도
            zoom: 16, // 지도 확대 레벨
        });

        // OpenStreetMap 타일 레이어 추가
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // 도쿄 돔에 마커 추가
        L.marker([35.7057, 139.7514]).addTo(map)
        .bindPopup('<b>Tokyo Dome</b><br />NewJeans Fan Meeting ! <br />2024/6/26(WED) - 27(THU)')
        .openPopup();

        // 컴포넌트 언마운트 시 맵 제거
        return () => {
        map.remove(); 
        };
    },[])


    return (
        /* Link to="scroll_2" 와 연결 */
        <Main_container id="scroll_2">
            <Map_p ref={v => targetRef.current[0] = v}>Fan Meeting <br/>Bunnies Camp! ✨</Map_p>
            <Map_container>           
                <Map_sub_div ref={v => targetRef.current[1] = v}>
                    <Map_sub_div_poster/>
                    <Map_sub_div2_p>NewJeans Fan Meeting 🎶<br/>📍 Bunnies Camp 2024 Tokyo Dome<br/>📅 2024/6/26(WED) - 27(THU)<br/>⏱️ DOORS 17:00 / SHOW 19:00</Map_sub_div2_p>
                </Map_sub_div>
                <Map_main_div id="map" ref={v => targetRef.current[2] = v}/>
            </Map_container>
        </Main_container>
    )
}

export default Body_6_map;