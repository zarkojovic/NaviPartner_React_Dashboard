import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {deleteUser} from "../../redux/user/userSlice";
import {useNavigate} from "react-router-dom";
import CustomButton from "../Common/Button";
import CustomModal from "../Common/CustomModal";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
}

interface UsersTableProps {
    users: User[];
    onUserClick: (id: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = React.memo(({users, onUserClick}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleDeleteUser = (user: User) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const confirmDeleteUser = () => {
        if (selectedUser) {
            dispatch(deleteUser(selectedUser.id));
            setShowModal(false);
            setSelectedUser(null);
            setSuccessMessage(`User ${selectedUser.first_name} ${selectedUser.last_name} deleted successfully.`);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000); // Hide message after 3 seconds
        }
    };

    return (
        <>
            {successMessage && (
                <div
                    className="bg-green-100 text-green-700 p-2 text-xs rounded-lg border font-bold border-green-500 mb-3">
                    {successMessage}
                </div>
            )}
            {users.length === 0 ? (
                <div>No users available</div>
            ) : (
                <table className="w-full mb-3 bg-white rounded-xl overflow-x-scroll">
                    <thead>
                    <tr>
                        <th className="font-medium text-slate-400 text-xs p-1">First Name</th>
                        <th className="font-medium text-slate-400 text-xs p-1">Last Name</th>
                        <th className="font-medium text-slate-400 text-xs p-1">Email</th>
                        <th className="font-medium text-slate-400 text-xs p-1">Gender</th>
                        <th className="font-medium text-slate-400 text-xs p-1">Delete</th>
                        <th className="font-medium text-slate-400 text-xs p-1">New post</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className={"hover:bg-slate-100 hover:cursor-pointer"}
                            onClick={() => onUserClick(user.id)}>
                            <td className="border-b border-slate-200 text-slate-600 font-medium text-xs p-1 text-center">{user.first_name}</td>
                            <td className="border-b border-slate-200 text-slate-600 font-medium text-xs p-1 text-center">{user.last_name}</td>
                            <td className="border-b border-slate-200 text-slate-600 font-medium text-xs p-1 text-center">{user.email}</td>
                            <td className="border-b border-slate-200 text-slate-600 font-medium text-xs p-1 text-center">{user.gender}</td>
                            <td className="border-b border-slate-200 text-slate-600 font-medium text-xs p-1 text-center">
                                <CustomButton text={"Delete"}
                                              className={"bg-red-700 text-white px-3 py-2 rounded-full hover:bg-red-800 duration-300"}
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleDeleteUser(user);
                                              }}/>
                            </td>
                            <td className="border-b border-slate-200 text-slate-600 font-medium text-xs p-1 text-center ">
                                <CustomButton text={"New post"}
                                              className={"bg-blue-700 text-white px-3 py-2 rounded-full hover:bg-blue-800 transition:all duration-300"}
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  navigate(`/${user.id}/add-blog`);
                                              }}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <CustomModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDeleteUser}
                title="Confirm Delete"
                message={`Are you sure you want to delete user ${selectedUser?.first_name} ${selectedUser?.last_name}?`}
            />
        </>
    );
});

export default UsersTable;