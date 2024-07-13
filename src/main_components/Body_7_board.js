import React,{useState, useRef, useEffect} from "react";
import styled from "styled-components";
import Alert from "../util_components/Alert";
import Popup from "../util_components/Popup";
import axiosCustom from "../util_components/axiosCustom";
// redux 에서 user 상태를 가져오기 위한 useSelector
import { useSelector, useDispatch } from 'react-redux';


const Body_container = styled.div`
    // 주요 element component PC 가운데 정렬 + 너비 80%( / 100vw )
    width: 80%;
    margin: 0 auto;
    height: 1200px;
    margin-top: 600px;

    border: 1px solid white;

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
    opacity: 1;
    transition: opacity 3s;

    @media (max-width: 1000px) {
        font-size: 37px;
    }
`
const Board_div = styled.div`
    width: 100%;
    height: 85%;
    
    border: 1px solid red;
`
const Search_div = styled.div`
    width: 55%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Search_select = styled.select`
    width: 150px;
    height: 40px;
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
    width: 250px;
    height: 40px;
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
`
const Forum_button_div = styled.div`
    width: 45%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Forum_button_div_button = styled.button`
    width: 25%;
    height: 50%;
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
    height: 80%;


    border: 1px solid blue;
`
const Board_list_item = styled.div`
    width: 100%;
    height: 8%;
    font-size: 17px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 0.5px solid yellow;
`
const Board_list_pagenation_div = styled.div`
    width: 100%;
    height: 10%;
    font-size: 18px;
`
const Board_list_pagenation_ul = styled.ul`
    border: 1px solid red;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Board_list_pagenation_span = styled.span`
    cursor: pointer;
`
const Board_list_pagenation_li = styled.li`
    list-style: none;
    cursor: pointer;
`


const Content_div = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
` 
const Content_div_writer = styled.input`
    width: 22%;
    height: 80%;
    background-color: black;
    color: white;
    border-radius: 5px;
    border: 1px solid #2C2C2D;
    font-size: 18px;

    padding-left: 15px;

    &:focus {
        border-color: #9061F9;
        // input focus 시 테두리 지우기
        outline: none;
    }
`
const Content_div_title = styled(Content_div_writer)`
    width: 35%;
    height: 80%;
`
const Content_div_date = styled(Content_div_writer)`
    width: 25%;
    height: 80%;
`
const Content_div_back = styled.div`
    width: 5%;
    height: 80%;
    background: url('/images/move-left.png') no-repeat;
    background-position: center;
    cursor: pointer;
`
const Content_text = styled.input`
    width: 95%;
    height: 80%;
    margin-left: 1.5%;
    margin-top: 10px;
    overflow-y: scroll;
    font-size: 25px;

    background-color: black;
    color: white;
    border-radius: 5px;
    border: 1px solid #2C2C2D;

    padding-left: 15px;

    &:focus {
        border-color: #9061F9;
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

const Body_7_board = () => {
    const user = useSelector(state => state.user);
    const [posts, setPosts] = useState([]);
    // 리스트에서 검색 select, input 상태 값
    const [search, setSearch] = useState({
        select: "작성자",
        input: ""
    });
    // 글 보기, 쓰기 또는 수정 상태 인지 
    // 리스트 보기 상태인지 구분 // read, write, put, list
    const [mode, setMode] = useState("list");
    // 글 읽기, 쓰기 또는 수정 상태에서 제목, 내용 상태
    const [text, setText] = useState({
        writer: "",
        title: "",
        content: "",
        updateAt: "",
        up: 0,
        down: 0,
    });
    // pagenation 상태 저장
    const [page, setPage] = useState({
        page: 1,
        total: 0,
        totalPage: 0
    });

    // 첫 페이지 로드 시 (1page) 게시글 불러오기, 이후 mode 변경 시 마다 post, page read
    useEffect(() => {
        const getdata = async () => {
            const nowpage = `${page}`;
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
        };
        getdata();
    },[mode])

    const pagenationing = () => {
        const pageArray = [];
        for(let i = 1;i <= page.totalPage; i++){
            pageArray.push(i);
        }
        return pageArray;
    };


    // 팝업 알림 컴포넌트 ref 셋팅
    const popupOpenRef = useRef(null);
    const alertOpenRef = useRef(null);

    // 검색 select 박스 변화 감지
    const selectChangeHandle = (e) => {
        setSearch((current) => {
            const newSearch = {...current};
            newSearch.select = e.target.value;
            return newSearch;
        });
    };
    // 검색 state 실시간 변화
    const inputChangeHandle = (e) => {
        setSearch((current) => {
            const newSearch = {...current};
            newSearch.input = e.target.value;
            return newSearch;
        });
    };
    // 리스트에서 검색 동작
    const searchHandle = () => {
        console.log("searchHandle")
    };
    // 리스트에서 엔터 시 검색 동작 유도
    const inputEnterHandle = (e) => {
        if(e.key === "Enter"){
            searchHandle();
        }
    };
    // 글 화면에서 리스트 화면으로 뒤로 가기
    const backHandle = () => {
        setMode("list");
    };
    // 리스트 화면에서 글쓰기 화면으로
    const writeStartHandle = () => {
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
    };
    // 글 보기 화면에서 글수정 화면으로
    const writePutHandle = () => {
        setMode("put");

        setText((current) => {
            const newSetText = {...current};
            newSetText.title = "nanoid_hide_title";
            newSetText.content = "nanoid_hide_title_text";
            return newSetText;
        })
    };
    // 글쓰기, 글수정 화면에서 text 수정 시 발동
    const writeChangeHandle = (e) => {
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
    };

    // 글쓰기 동작
    const postWriteHandle = () => {
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
                backHandle();
            }
            return;
        })
    }

    // 특정 글 읽기 동작
    const postReadHandle = (e) => {
        const nanoid = e.target.getAttribute("name");
        axiosCustom.get(`/post/read/${nanoid}`)
        .then(res => {
            // 읽기 성공
            if(res.data.code === 200){
                const post = res.data.data;
                setMode("read");
                setText((current) => {
                    const newSetText = {...current};
                    newSetText.writer = post.author.name;
                    newSetText.title = post.title;
                    newSetText.content = post.content;
                    newSetText.updateAt = post.updateAt;
                    newSetText.up = post.up;
                    newSetText.down = post.down;
                    return newSetText;
                })
            } else { // 읽기 실패
                alertOpenRef.current.handleOpenAlert("게시판 알림", res.data.message);
            }
            return;
        })
    }

    return (
        <>
        <div style={{marginTop: "600px", width: "80%"}}>
            <Popup parameter={"put or delete 시 nanoid"} ref={popupOpenRef} />
            <Alert ref={alertOpenRef} />
        </div>
        <Body_container>
            <Board_title>Open Forum</Board_title>
            <Board_div>
                {mode === "read" 
                &&
                <>
                    <Content_div>
                        <Content_div_back onClick={backHandle}></Content_div_back>
                        <Content_div_writer style={{border:"none"}} disabled defaultValue={text.writer}/>
                        <Content_div_title style={{border:"none"}} disabled defaultValue={text.title}/>
                        <Content_div_date style={{border:"none"}} disabled defaultValue={text.updateAt}/>
                    </Content_div>
                    <Content_text style={{border:"none"}} disabled defaultValue={text.content}/>
                    <Content_sub_div>
                        <Content_sub_div_div>
                            <img src="/images/good.png" style={{width:"50px", height:"50px", cursor:"pointer"}} />
                            <span>좋아요</span>
                            <span>{text.up}</span>
                        </Content_sub_div_div>
                        <Content_sub_div_div>
                            <img src="/images/bad.png" style={{width:"50px", height:"50px", cursor:"pointer"}} />
                            <span>싫어요</span>
                            <span>{text.down}</span>
                        </Content_sub_div_div>

                        <Content_sub_div_div>
                            <img src="/images/modify.png" onClick={writePutHandle} style={{width:"50px", height:"50px", cursor:"pointer"}} />
                            <span>수정하기</span>
                        </Content_sub_div_div>
                        <Content_sub_div_div>
                            <img src="/images/delete.png" style={{width:"50px", height:"50px", cursor:"pointer"}} />
                            <span>삭제하기</span>
                        </Content_sub_div_div>
                    </Content_sub_div>
                </>
                }
                {mode === "write" 
                &&
                <>
                    <Content_div>
                        <Content_div_back onClick={backHandle}></Content_div_back>
                        <Content_div_writer disabled value={user.email.length >= 1 ? user.nickName : "nonLogin"} />
                        <Content_div_title onChange={writeChangeHandle} name="title" />
                    </Content_div>
                    <Content_text onChange={writeChangeHandle} name="content" />
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
                        <Content_div_writer disabled value="read_writer"/>
                        {/* react 에서는 기본 input value 설정 시 defaultValue 로 지정해야 함 */}
                        <Content_div_title onChange={writeChangeHandle} name="title" defaultValue={text.title} />
                        <Content_div_date disabled value="read_date"/>
                    </Content_div>
                    <Content_text onChange={writeChangeHandle} name="content" defaultValue={text.content}/>
                    <Content_sub_div>
                        <Content_sub_div_div>
                            <img src="/images/write.png" style={{width:"50px", height:"50px", cursor:"pointer"}} />
                            <span style={{marginTop:"5%"}}>작성하기</span>
                        </Content_sub_div_div>
                    </Content_sub_div>
                </>
                }
                {mode === "list" 
                &&
                <>
                    <div style={{display:"flex"}}>
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
                            <Forum_button_div_button>전체</Forum_button_div_button>
                            <Forum_button_div_button>내 글만 보기</Forum_button_div_button>
                            <Forum_button_div_button onClick={writeStartHandle}>글쓰기</Forum_button_div_button>
                        </Forum_button_div>
                    </div>
                    <Board_list_div>
                        {posts.map((v) => {
                                return (
                                    <Board_list_item>
                                        <span style={{width:"20%"}}>{v.author.name}</span>
                                        <span name={v.nanoid} onClick={postReadHandle} style={{width:"40%", textDecoration:"underLine", cursor:"pointer"}}>{v.title}</span>
                                        <span style={{width:"30%"}}>{v.updateAt}</span>
                                    </Board_list_item>
                                );
                            })
                        }
                    </Board_list_div>
                    <Board_list_pagenation_div>
                        <Board_list_pagenation_ul>
                            <Board_list_pagenation_span>이전</Board_list_pagenation_span>
                            {pagenationing().map((v) => {
                                return (
                                    <Board_list_pagenation_li style={page.page === v ? {fontWeight: "bold"} : {fontWeight: "400"}}>{v}</Board_list_pagenation_li>
                                );
                            })}
                            <Board_list_pagenation_span>다음</Board_list_pagenation_span>
                        </Board_list_pagenation_ul>

                    </Board_list_pagenation_div>
                </>    
                }
            </Board_div>
        </Body_container>
        </>
    )

}


export default Body_7_board;