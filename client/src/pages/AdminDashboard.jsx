import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        axios({
            url: `https://server-patern-shop11.onrender.com/api/user/getalluser`,
            method: "get",
        })
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const submitHandler = (id) => {
        axios.delete(`https://server-patern-shop11.onrender.com/api/user/delete/${id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="flex-between flex-col block">
            <div className="">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 mt-20">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Username
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        FirstName
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        LastName
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Email
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        Edit
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            {users.map((user, index) => {
                                return (
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {user.username}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {user.firstname}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {user.lastname}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <a className="text-green-500 hover:text-green-700"
                                                    href="/">
                                                    Edit Role
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <a onClick={() => submitHandler(user._id)} className="text-red-500 hover:text-red-700"
                                                    href="/">
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
