import React from 'react'
import { useState } from 'react'
import { SignIn } from '../../helper/auth'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const Login = () => {
    const [successEvent, setSuccessEvent] = useState({
        status: 0,
        message: ""
    })

    // Manage the user email and the password
    const [user_data, setUserData] = useState({
        email: "",
        password: "",

    })

    // Function to store the values on each time there is an event.
    function HandleUserData(e) {
        setUserData((prevUserdata) => ({
            ...prevUserdata,
            [e.target.name]: e.target.value
        }))
        console.log(user_data)

    }

    async function handleUserData() {
        const signed_in = await SignIn(user_data.email, user_data.password)

        if (signed_in!=null) {
            if (signed_in.status == 200) {
                setSuccessEvent({
                    status: 200,
                    message: "Success"
                })
                if (signed_in.status == 200) {
                    localStorage.setItem('access_token', signed_in.data.accessToken)
                }
                if (signed_in.status === 200) {
                    window.location.href = '/';
                }
            }
        }
        else {
            setSuccessEvent({
                status: 400,
                message: "Sorry something went wrong"
            })
        }
    }

    return (
        <>
            {successEvent?.status === 200 && (
                <div className="rounded-md bg-green-50 p-4 fixed top-0 w-full z-50">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">Order completed</h3>
                            <div className="mt-2 text-sm text-green-700">
                                <p>{successEvent.message}</p>
                            </div>
                            <div className="mt-4">
                                <div className="-mx-2 -my-1.5 flex">
                                    <button
                                        type="button"
                                        className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                    >
                                        View status
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                        onClick={(e) => { setSuccessEvent({ status: 0, message: "" }) }}
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {successEvent?.status === 400 && (
                <div className="rounded-md bg-red-100 p-4 fixed top-0 w-full z-50">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Order completed</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{successEvent.message}</p>
                            </div>
                            <div className="mt-4">
                                <div className="-mx-2 -my-1.5 flex">
                                    <button
                                        type="button"
                                        className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                    >
                                        View status
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-3 rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                        onClick={(e) => { setSuccessEvent({ status: 0, message: "" }) }}
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => { HandleUserData(e) }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => { HandleUserData(e) }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => { handleUserData() }}
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>


                    </div>


                </div>
            </div>
        </>
    )
}

export default Login