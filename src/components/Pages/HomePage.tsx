import React, {useEffect, useState, useCallback} from "react";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {selectUserById, selectUsersByPage, userCount} from "../../redux/user/userSlice";
import UsersTable from "../User/UsersTable";
import Pagination from "../Common/Pagination";
import BlogList from "../Blog/BlogList";
import Loader from "../Common/Loader";
import coverPhoto from "../../images/cover-photo.png";

const StyledWrapper = styled.div`
    background-color: #f1f1f1;
    overflow-x: hidden;
`;

export const HomePage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [activeUser, setActiveUser] = useState(0);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const users = useTypedSelector((state) => selectUsersByPage(state, page, pageSize));
    const usersCount = useTypedSelector(userCount);
    const activeUserInfo = useTypedSelector((state) => selectUserById(state, activeUser));

    useEffect(() => {
        setTotalNumberOfPages(Math.ceil(usersCount / pageSize));
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500); // Delay for half a second
        return () => clearTimeout(timer);
    }, [usersCount, pageSize]);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    return (
        <StyledWrapper>
            <Helmet>
                <title>Home Page - List Of Users</title>
            </Helmet>
            <h1 className="text-xl font-bold mb-3 bg-white p-3 border-b">
                <img src={coverPhoto} alt="Cover" className={"h-6"}/>
            </h1>
            {loading ? (
                <Loader/>
            ) : (
                <div className="grid md:grid-cols-4 grid-cols-1 md:gap-2 p-3">
                    <div className="col-span-3  overflow-x-scroll">
                        <UsersTable users={users} onUserClick={setActiveUser}/>
                        <Pagination page={page} totalNumberOfPages={totalNumberOfPages}
                                    onPageChange={handlePageChange}/>
                    </div>
                    {activeUser > 0 && activeUserInfo ? (
                        <BlogList userId={activeUser}/>
                    ) : (
                        <div className="p-3 border flex items-center justify-center rounded-xl bg-white ">
                            <h2 className="text-lg text-center">Select a user to view their blogs</h2>
                        </div>
                    )}
                </div>
            )}
        </StyledWrapper>
    );
};