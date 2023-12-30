import React from 'react'
import { useState } from 'react'
import { SignIn } from '../../helper/auth'
import Notification from '../Notification/Notification'

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

        if (signed_in != null) {
            if (signed_in.status == 200) {
                setSuccessEvent({
                    status: 200,
                    message: "You have logged in successfully"
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
            <Notification setSuccessEvent={setSuccessEvent} successEvent={successEvent} />
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-red-200 h-screen">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=yellow&shade=600"
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
                                        className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => { HandleUserData(e) }}
                                        placeholder='johndoe@gmail.com'

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
                                        className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => { HandleUserData(e) }}
                                        placeholder='Eren56#$%'
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-600"
                                    />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
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