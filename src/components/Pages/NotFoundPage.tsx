import React from "react";
import notFound from "../../images/not-found.gif";
import CustomButton from "../Common/Button";
import {useNavigate} from "react-router-dom";

const NotFoundPage: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen bg-slate-100">
            <div className={"flex flex-col justify-center items-center border shadow rounded-xl bg-white p-5"}>
                <img src={notFound} alt={"not found"} className={"h-48 mx-auto"}/>
                <h1 className="text-2xl text-center font-medium">Oops! Page Not Found...</h1>
                <CustomButton text={"Back To Home"} onClick={() => navigate("/")}
                              className={"bg-blue-500 rounded-full text-xs font-bold hover:bg-blue-600 transition all text-white mt-4 mx-auto"}/>
            </div>
        </div>
    );
}

export default NotFoundPage;