import React,{useState, useRef, useEffect, useCallback} from "react";
import styled from "styled-components";
import Alert from "../util_components/Alert";
import Popup from "../util_components/Popup";
import axiosCustom from "../util_components/axiosCustom";
// redux 에서 user 상태를 가져오기 위한 useSelector
import { useSelector } from 'react-redux';


const Body_container = styled.div`
    // 주요 element component PC 가운데 정렬 + 너비 80%( / 100vw )
    width: 80%;
    margin: 0 auto;
    height: 1200px;
    margin-top: 600px;

    @media (max-width: 1000px) {
        width: 100%;
        margin-top: 150px;
    }
`
const Board_title = styled.p`
    margin-left: 20px;
    font-size: 48px;
    text-shadow: 2px 2px 2px gray;
    font-weight: 600;
    font-family: "Noto Sans KR";

    // mouse scroll 에 따른 opacity 
    opacity: 0;
    transition: opacity 3s;

    @media (max-width: 1000px) {
        font-size: 37px;
    }
`
const Board_div = styled.div`
    width: 100%;
    height: 100%;

    // mouse scroll 에 따른 opacity 
    opacity: 0;
    transition: opacity 3s;
`
const Board_Search_Forum_div = styled.div`
    width: 100%;
    height: 5%;
    display: flex;

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`

const Search_div = styled.div`
    width: 55%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    @media (max-width: 1000px) {
        width: 100%;
    }
`
const Search_select = styled.select`
    width: 20%;
    height: 90%;
    color: white;
    background-color: #181619;
    font-size: 17px;
    border-radius: 5px;
    border: 1px solid #2C2C2D;

    &:focus {
        border-color: #9061F9;
        // input focus 시 테두리 지우기
        outline: none;
    }
`
const Search_input = styled.input`
    width: 55%;
    height: 90%;
    color: white;
    background-color: #181619;
    font-size: 17px;
    border-radius: 5px;
    border: 1px solid #2C2C2D;

    padding-left: 15px;

    &:focus {
        border-color: #9061F9;
        // input focus 시 테두리 지우기
        outline: none;
    }
`
const Search_icon = styled.img`
    width: 40px;
    height: 40px;

    cursor: pointer;
    @media (max-width: 1000px) {
        width: 64px;
        height: 64px;
    }
`
const Forum_button_div = styled.div`
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 1000px) {
        margin-top: 2%;
        width: 100%;
    }
`
const Forum_button_div_button = styled.button`
    width: 30%;
    height: 98%;
    border: none;
    background-color: black;
    border-radius: 15px;

    color: #9061F9;
    font-size: 18px;
    font-weight: bold;
    font-family: 'Noto Sans KR';

    border-radius: 20px;
    cursor: pointer;

    transition: background-color 1s;

    &:hover{
        background-color: white;
    }
`
const Board_list_div = styled.div`
    width: 100%;
    height: 70%;
    margin-top: 7%;
`
const Board_list_item = styled.div`
    width: 100%;
    height: 10%;
    font-size: 17px;
    border-bottom: 1px solid #9061F9;

    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Board_list_pagenation_div = styled.div`
    width: 100%;
    height: 2%;
    font-size: 18px;
    margin-left: -5%;
`
const Board_list_pagenation_ul = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Board_list_pagenation_span = styled.span`
    cursor: pointer;
    font-weight: bold;
    transition: color 0.5s;

    &:hover {
        color: #9061F9;
    }
`
const Board_list_pagenation_li = styled.li`
    list-style: none;
    cursor: pointer;
    transition: color 0.5s;

    &:hover {
        color: #9061F9;
    }
`


const Content_div = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
` 
const Content_div_writer = styled.input`
    width: 20%;
    height: 95%;
    background-color: black;
    color: white;
    border-radius: 5px;
    border: 1px solid #2C2C2D;
    font-size: 15px;

    &:focus {
        border-color: #9061F9;
        // input focus 시 테두리 지우기
        outline: none;
    }
`
const Content_div_title = styled(Content_div_writer)`
    width: 30%;
`
const Content_div_date = styled(Content_div_writer)`
    width: 25%;

    @media (max-width: 1000px) {
        display: none;
    }
`
const Content_div_back = styled.div`
    width: 7%;
    height: 80%;
    background: url('/images/move-left.png') no-repeat;
    background-position: center;
    cursor: pointer;

    @media (max-width: 1000px) {
        width: 13%;
    }
`
const Content_text = styled.textarea`
    width: 95%;
    height: 80%;
    margin-left: 1.5%;
    margin-top: 10px;
    overflow-y: scroll;
    font-size: 35px;

    background-color: black;
    color: white;
    border-radius: 5px;
    border: 1px solid #9061F9;

    padding-left: 15px;

    &:focus {
        border-color: #A47CFB;
        // input focus 시 테두리 지우기
        outline: none;
    }
`
const Content_sub_div = styled.div`
    width: 95%;
    height: 10%;
    margin: 0 auto;
    margin-top: 10px;

    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Content_sub_div_div = styled.div`
    width: 10%;
    height: 95%;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const Loading_div = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Loading_img = styled.img`
    /* 회전 애니메이션 */
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
`

const Body_7_board = () => {
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

    // user 리덕스 store 상태 값 가져오기
    const user = useSelector(state => state.user);
    
    // 팝업 알림 컴포넌트 ref 셋팅
    const popupOpenRef = useRef(null);
    const alertOpenRef = useRef(null);

    // 전체 / 내 글 보기 시 로딩 애니메이션 부여를 위한 ref 셋팅
    const loadingRef = useRef(null);

    // posts 리스트 상태 값 정의
    const [posts, setPosts] = useState([]);
    // 리스트에서 검색 select, input 상태 값
    const [search, setSearch] = useState({
        select: "작성자",
        input: ""
    });
    // 글 보기, 쓰기 또는 수정 상태 인지 
    // 리스트 보기 상태인지 구분 // read, write, put, list, "loading"
    const [mode, setMode] = useState("list");
    // 글 읽기, 쓰기 또는 수정 상태에서 제목, 내용 상태
    const [text, setText] = useState({
        nanoid: "",
        email: "",
        writer: "",
        title: "",
        content: "",
        updateAt: "",
        up: 0
    });
    // pagenation 상태 
    // (search : 검색 모드 (1순위)), (allormy : 전체 글 또는 나의 글 모드 (2순위))
    // searchSelect, searchInput : fixed 값. (실시간으로 변경되지 않음.)
    const [page, setPage] = useState({
        page: 1,
        total: 0,
        totalPage: 0,
        searchMode: false,
        searchSelect: "",
        searchInput: "",
        allormy: "all"
    });

    // 글 삭제 시 popup 컴포넌트로 props 전달 상태
    const [delprop, setDelprop] = useState({
        email: "",
        nanoid: ""
    });

    // 특정 페이지 로드 후 게시글 불러오기, 이후 mode 변경 시 마다 posts, page 정보 read
    useEffect(() => {
        const getdata = async () => {
            // 검색어 모드 (검색어와 검색 타겟(셀렉트 박스)을 대상으로 조회된 글을 가져온다.)
            if(page.searchMode){
                const nowpage = page.page;
                await axiosCustom.get(`/post/getsearchposts/${nowpage}/${page.searchSelect}/${page.searchInput}`)
                .then(res => {
                    setPosts(res.data.posts);
                    setPage((current) => {
                        const newPage = {...current};
                        newPage.total = res.data.total;
                        newPage.totalPage = res.data.totalPage;
                        return newPage;
                    });
                });
                // 전체 글 모드 (전체 글을 가져오고 page.search 값이 초기화된다.)
            } else if (page.allormy === "all") {
                const nowpage = page.page;
                await axiosCustom.get(`/post/getallposts/${nowpage}`)
                .then(res => {
                    setPosts(res.data.posts);
                    setPage((current) => {
                        const newPage = {...current};
                        newPage.total = res.data.total;
                        newPage.totalPage = res.data.totalPage;
                        return newPage;
                    });
                });
                // 나의 글 모드 (나의 글을 가져오고 page.search 값이 초기화된다.)
            } else { // allormy === "my"
                const nowpage = page.page;
                await axiosCustom.post(`/post/getmyposts`,{email: user.email, nowpage: nowpage.toString()})
                .then(res => {
                    setPosts(res.data.posts);
                    setPage((current) => {
                        const newPage = {...current};
                        newPage.total = res.data.total;
                        newPage.totalPage = res.data.totalPage;
                        return newPage;
                    });
                });
            }
            // 검색 상태 초기화 작업
            setSearch((current) => {
                const newSearch = {...current};
                newSearch.input = "";
                newSearch.select = "작성자";
                return newSearch;
            });
        };
        getdata();
    },[mode])

    // page 상태 값에 따라 하단 페이지네이션 원소 배열 생성
    // 5 페이지 씩 만 출력하여야 함
    const pagenationing = useCallback(() => {
        const pageArray = [];

        // 페이지 시작점 계산
        let remainpage = page.page;
        let count = 0;
        while((remainpage - count) % 5 !== 1){
            count++;
        }
        const startpage = page.page - count;

        // 페이지 끝점 계산
        remainpage = startpage + 4;
        if(remainpage > page.totalPage){
            remainpage = page.totalPage;
        }
        const lastpage = remainpage;

        for(let i = startpage;i <= lastpage; i++){
            pageArray.push(i);
        }
        return pageArray;
    });

    // 선택한 페이지로 이동 기능
    const pagenateHandle = useCallback((i) => {
        setPage((current) => {
            const newPage = {...current};
            newPage.page = i;
            return newPage;
        });

        setMode("loading");
        setTimeout(() => {
            setMode("list");
        }, 500);
    });

    // 이전 버튼 클릭 시 최대 5 페이지 이동 기능
    const pagePrevHandle = useCallback(() => {
        // 이동할 페이지 최대 5 페이지(5 페이지가 안되면 최대한 마지막 페이지로)
        let i = page.page - 5;
        if(i < 1){
            i = 1;
        }

        setPage((current) => {
            const newPage = {...current};
            newPage.page = i;
            return newPage;
        });

        setMode("loading");
        setTimeout(() => {
            setMode("list");
        }, 500);
    });

    // 다음 버튼 클릭 시 최대 5 페이지 이동 기능
    const pageNextHandle = useCallback(() => {
        // 이동할 페이지 최대 5 페이지(5 페이지가 안되면 최대한 마지막 페이지로)
        let i = page.page + 5;
        if(i > page.totalPage){
            i = page.totalPage;
        }

        setPage((current) => {
            const newPage = {...current};
            newPage.page = i;
            return newPage;
        });

        setMode("loading");
        setTimeout(() => {
            setMode("list");
        }, 500);
    });

    // 검색 select 박스 변화 감지
    const selectChangeHandle = useCallback((e) => {
        setSearch((current) => {
            const newSearch = {...current};
            newSearch.select = e.target.value;
            return newSearch;
        });
    });
    // 검색 state 실시간 변화
    const inputChangeHandle = useCallback((e) => {
        setSearch((current) => {
            const newSearch = {...current};
            newSearch.input = e.target.value;
            return newSearch;
        });
    });
    // 리스트에서 검색 동작
    const searchHandle = useCallback(() => {
        // 검색어(search.input) 이 없을 때 에러 처리
        if(search.input.length < 2){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "검색어를 2 글자 이상 입력해주세요.");
            return;
        }

        setPage((current) => {
            const newPage = {...current};
            newPage.searchMode = true;
            newPage.searchSelect = search.select;
            newPage.searchInput = search.input;
            newPage.page = 1;
            return newPage;
        });

        setMode("loading");
        setTimeout(() => {
            setMode("list");
        }, 500);
    });
    // 리스트에서 엔터 시 검색 동작 유도
    const inputEnterHandle = useCallback((e) => {
        if(e.key === "Enter"){
            searchHandle();
        }
    });

    // 나의 글 모드 첫 진입 (1page) (로그인 요구)
    const postMyHandle = useCallback(() => {
        if(user.email.length < 1){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "로그인이 필요한 페이지입니다.");
            return;
        }

        setPage((current) => {
            const newSetPage = {...current};
            newSetPage.searchMode = false;
            newSetPage.allormy = "my";
            newSetPage.page = 1;
            return newSetPage;
        });
        setMode("loading");
        setTimeout(() => {
            setMode("list");
        }, 500);
    });

    // 전체 글 모드 첫 진입 (1page) 
    const postAllHandle = useCallback(() => {
        setPage((current) => {
            const newSetPage = {...current};
            newSetPage.searchMode = false;
            newSetPage.allormy = "all";
            newSetPage.page = 1;
            return newSetPage;
        });
        setMode("loading");
        setTimeout(() => {
            setMode("list");
        }, 500);
    });

    // 글 화면에서 리스트 화면으로 뒤로 가기
    const backHandle = useCallback(() => {
        setMode("list");
    });
    // 리스트 화면에서 글쓰기 화면으로
    const writeStartHandle = useCallback(() => {
        if(user.email.length < 1){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "로그인이 필요한 페이지입니다.");
            return;
        }

        setMode("write");

        setText((current) => {
            const newSetText = {...current};
            newSetText.title = "";
            newSetText.content = "";
            return newSetText;
        })
    });
    // 글 보기 화면에서 글 수정 화면으로
    const putStartHandle = useCallback(() => {
        if(user.email.length < 1){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "로그인이 필요한 페이지입니다.");
            return;
        }
        if(user.email !== text.email){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "글 작성자가 아닙니다.");
            return;
        }

        setMode("put");
    });

    // 글쓰기, 글수정 화면에서 text 수정 시 발동
    const writeChangeHandle = useCallback((e) => {
        if(e.target.name === "title"){
            setText((current) => {
                const newSetText = {...current};
                newSetText.title = e.target.value;
                return newSetText;
            });
        } else {
            setText((current) => {
                const newSetText = {...current};
                newSetText.content = e.target.value;
                return newSetText;
            });
        }
    });

    // 글쓰기 동작
    const postWriteHandle = useCallback(() => {
        if(user.email.length < 1){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "로그인이 필요한 페이지입니다.");
            return;
        }
        if(text.title.length > 20){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "글 제목은 20자 이내로 작성해주세요.");
            return;
        }
        if(text.title.length < 3 || text.content.length < 3){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "글 제목 또는 내용은 3자 이상 작성해주세요.");
            return;
        }
        axiosCustom.post('/post/write',{email: user.email, title: text.title, content: text.content})
        .then(res => {
            alertOpenRef.current.handleOpenAlert("게시판 알림", res.data.message);
            if(res.data.code === 200){
                setMode("loading");
                setTimeout(() => {
                    setMode("list");
                }, 500);
            }
            return;
        })
    });

    // 글 수정 동작
    const postPutHandle = useCallback(() => {
        if(user.email.length < 1){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "로그인이 필요한 페이지입니다.");
            return;
        }
        if(user.email !== text.email){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "글 작성자가 아닙니다.");
            return;
        }
        if(text.title.length > 20){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "글 제목은 20자 이내로 작성해주세요.");
            return;
        }
        if(text.title.length < 3 || text.content.length < 3){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "글 제목 또는 내용은 3자 이상 작성해주세요.");
            return;
        }
        axiosCustom.post('/post/put',{email: user.email, title: text.title, content: text.content
            , nanoid: text.nanoid})
        .then(res => {
            alertOpenRef.current.handleOpenAlert("게시판 알림", res.data.message);
            if(res.data.code === 200){
                setMode("loading");
                setTimeout(() => {
                    setMode("list");
                }, 500);
            }
            return;
        })
    });

    // 글 삭제 콜백함수
    const postDelCallback = useCallback((props) => {
        axiosCustom.delete('/post/del',{
            // axios delete 의 경우 두 번째 인자에 data: {} 로 body 데이터를 보낼 수 있다.
            data: {email: props.email, nanoid: props.nanoid}
        })
        .then(res => {
            alertOpenRef.current.handleOpenAlert("게시판 알림", res.data.message);
            if(res.data.code === 200){
                setMode("loading");
                setTimeout(() => {
                    setMode("list");
                }, 500);
            }
            return;
        })
    });

    // 글 삭제 동작
    const postDelHandle = useCallback(() => {
        if(user.email.length < 1){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "로그인이 필요한 페이지입니다.");
            return;
        }
        if(user.email !== text.email){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "글 작성자가 아닙니다.");
            return;
        }
        setDelprop((current) => {
            const newDelprop = {...current};
            newDelprop.email = user.email;
            newDelprop.nanoid = text.nanoid;
            return newDelprop; 
        });
        popupOpenRef.current.handleOpenPopup("게시판 알림", "글 삭제를 진행하시겠습니까?", () => postDelCallback);
        return;
    });

    // 특정 글 읽기 동작
    const postReadHandle = useCallback((e) => {
        const nanoid = e.target.getAttribute("name");
        axiosCustom.get(`/post/read/${nanoid}`)
        .then(res => {
            // 읽기 성공
            if(res.data.code === 200){
                const post = res.data.data;
                setMode("read");
                setText((current) => {
                    const newSetText = {...current};
                    newSetText.nanoid = post.nanoid;
                    newSetText.email = post.author.email;
                    newSetText.writer = post.author.name;
                    newSetText.title = post.title;
                    newSetText.content = post.content;
                    newSetText.updateAt = post.updateAt;
                    newSetText.up = post.up;
                    return newSetText;
                })
            } else { // 읽기 실패
                alertOpenRef.current.handleOpenAlert("게시판 알림", res.data.message);
            }
            return;
        })
    });

    // 특정 글 에서 좋아요 버튼 클릭(같은 계정으로 같은 글의 좋아요를 또 클릭하면 좋아요 제거)
    const postUpHandle = useCallback(() => {
        if(user.email.length < 1){
            alertOpenRef.current.handleOpenAlert("게시판 알림", "로그인이 필요합니다.");
            return;
        }

        axiosCustom.post('/post/uppost',{email: user.email, nanoid: text.nanoid})
        .then(res => {
            alertOpenRef.current.handleOpenAlert("게시판 알림", res.data.message);
            setMode("loading");
                setTimeout(() => {
                    setMode("list");
                }, 100);
            return;
        })
    });


    // console.log(page);

    return (
        <>
        <div style={{marginTop: "600px", width: "80%"}}>
            <Popup parameter={delprop} ref={popupOpenRef} />
            <Alert ref={alertOpenRef} />
        </div>
        <Body_container id="scroll_3">
            <Board_title ref={element => targetRef.current[0] = element}>Open Forum 📝</Board_title>
            <Board_div ref={element => targetRef.current[1] = element}>
                {mode === "read" 
                &&
                <>
                    <Content_div>
                        <Content_div_back onClick={backHandle}></Content_div_back>
                        <Content_div_writer style={{border:"none"}} disabled defaultValue={text.writer}/>
                        <Content_div_title style={{border:"none"}} disabled defaultValue={text.title}/>
                        <Content_div_date style={{border:"none"}} disabled defaultValue={text.updateAt}/>
                    </Content_div>
                    <Content_text disabled defaultValue={text.content}/>
                    <Content_sub_div>
                        <Content_sub_div_div>
                            <img src="/images/good.png" onClick={postUpHandle} style={{width:"50px", height:"50px", cursor:"pointer"}} />
                            <span>{text.up}</span>
                        </Content_sub_div_div>

                        <Content_sub_div_div>
                            <img src="/images/modify.png" onClick={putStartHandle} style={{width:"50px", height:"50px", cursor:"pointer"}} />
                            <span>수정</span>
                        </Content_sub_div_div>
                        <Content_sub_div_div>
                            <img src="/images/delete.png" onClick={postDelHandle} style={{width:"50px", height:"50px", cursor:"pointer"}} />
                            <span>삭제</span>
                        </Content_sub_div_div>
                    </Content_sub_div>
                </>
                }
                {mode === "write" 
                &&
                <>
                    <Content_div>
                        <Content_div_back onClick={backHandle}></Content_div_back>
                        <Content_div_writer style={{border: "none"}} disabled value={user.email.length >= 1 ? user.nickName : "nonLogin"} />
                        <label for="inputTitle">제목 : </label>
                        <Content_div_title onChange={writeChangeHandle} id="inputTitle" name="title" />
                    </Content_div>
                    <label for="inputContent" style={{marginLeft: "1.5%"}}>내용 : </label>
                    <Content_text onChange={writeChangeHandle} id="inputContent" name="content" />
                    <Content_sub_div>
                        <Content_sub_div_div>
                            <img src="/images/write.png" onClick={postWriteHandle} style={{width:"50px", height:"50px", cursor:"pointer"}} />
                            <span style={{marginTop:"5%"}}>작성하기</span>
                        </Content_sub_div_div>
                    </Content_sub_div>
                </>
                }
                {mode === "put" 
                &&
                <>
                    <Content_div>
                        <Content_div_back onClick={backHandle}></Content_div_back>
                        <Content_div_writer style={{border:"none"}} disabled defaultValue={text.writer}/>
                        {/* react 에서는 기본 input value 설정 시 defaultValue 로 지정해야 함 */}
                        <label for="inputTitle">제목: </label>
                        <Content_div_title onChange={writeChangeHandle} id="inputTitle" name="title" defaultValue={text.title} />
                        <Content_div_date style={{border:"none"}} disabled defaultValue={text.updateAt}/>
                    </Content_div>
                    <label for="inputContent" style={{marginLeft: "1.5%"}}>내용: </label>
                    <Content_text onChange={writeChangeHandle} id="inputContent" name="content" defaultValue={text.content}/>
                    <Content_sub_div>
                        <Content_sub_div_div>
                            <img src="/images/write.png" onClick={postPutHandle} style={{width:"50px", height:"50px", cursor:"pointer"}} />
                            <span style={{marginTop:"5%"}}>수정하기</span>
                        </Content_sub_div_div>
                    </Content_sub_div>
                </>
                }
                {mode === "list" 
                &&
                <>
                    <Board_Search_Forum_div>
                        <Search_div>
                            <Search_select onChange={selectChangeHandle}>
                                <option value="작성자">작성자</option>
                                <option value="제목">제목</option>
                                <option value="내용">내용</option>
                            </Search_select>
                            <Search_input onKeyDown={inputEnterHandle} onChange={inputChangeHandle}></Search_input>
                            <Search_icon src="/images/search.png" onClick={searchHandle}></Search_icon>
                        </Search_div>
                        <Forum_button_div>
                            <Forum_button_div_button onClick={postAllHandle}>전체</Forum_button_div_button>
                            <Forum_button_div_button onClick={postMyHandle}>나의 글</Forum_button_div_button>
                            <Forum_button_div_button onClick={writeStartHandle}>글쓰기</Forum_button_div_button>
                        </Forum_button_div>
                    </Board_Search_Forum_div>
                    <Board_list_div>
                        {posts.map((v) => {
                                return (
                                    <Board_list_item>
                                        <span style={{width:"20%"}}>{v.author.name}</span>
                                        <span name={v.nanoid} onClick={postReadHandle} style={{width:"40%", textDecoration:"underLine", cursor:"pointer"}}>{v.up === 0 ? v.title : v.title + " [👍 " + v.up + "]"}</span>
                                        <span style={{width:"30%"}}>{v.updateAt}</span>
                                    </Board_list_item>
                                );
                            })
                        }
                    </Board_list_div>
                    <Board_list_pagenation_div>
                        <Board_list_pagenation_ul>
                            <Board_list_pagenation_span onClick={pagePrevHandle}>이전</Board_list_pagenation_span>
                            {pagenationing().map((v) => {
                                return (
                                    <Board_list_pagenation_li onClick={() => pagenateHandle(v)} style={page.page === v ? {fontWeight: "bold", color: "#9061F9"} : {fontWeight: "400", color: "white"}}>{v}</Board_list_pagenation_li>
                                );
                            })}
                            <Board_list_pagenation_span onClick={pageNextHandle}>다음</Board_list_pagenation_span>
                        </Board_list_pagenation_ul>
                    </Board_list_pagenation_div>
                </>    
                }
                {mode === "loading" &&
                 <Loading_div>
                    <Loading_img src="/images/nowloading.png" style={{animation: "spin 0.5s 3 linear"}} ref={loadingRef} />
                </Loading_div>
                }
            </Board_div>
        </Body_container>
        </>
    )

}


export default Body_7_board;