import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const Notification = ({ setSuccessEvent, successEvent }) => {

    const dismissNotification = () => {
        // Set the success state to an initial value
        setSuccessEvent({
            status: 0,
            message: ''
        });
    };

    return (
        <>
            {successEvent?.status == 200 && <div className="rounded-md bg-green-50  p-4 fixed top-0 w-full z-50">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Notification</h3>
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
                                    onClick={dismissNotification}
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            {successEvent?.status == 400 && (
                <div className="rounded-md bg-red-100 p-4 fixed top-0 w-full z-50">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Notification</h3>
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
        </>
    )
}

export default Notification