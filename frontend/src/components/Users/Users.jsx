import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../api/Products'

const Users = () => {

    const [people, setPeople] = useState([])

    useEffect(() => {
        async function getUsers() {
            const all_users = await getAllUsers()
            setPeople(all_users.data)

        }
        getUsers()
    }, [])



    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 p-16">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="font-semibold leading-6 text-gray-900 text-4xl mb-2">Users</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the users who have created account in Mico.
                        </p>
                    </div>

                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            address
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Profession
                                        </th>


                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {people.map((person) => (
                                        <tr key={person.email}>
                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="flex items-center">

                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">{person.fullName}</div>
                                                        <div className="mt-1 text-gray-500">{person.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="text-gray-900">{person.email}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {person.address}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{person.profession}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users