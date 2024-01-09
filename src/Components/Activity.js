import { IoMdArchive } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { FcMissedCall } from "react-icons/fc";
import { FcVoicemail } from "react-icons/fc";
import { IoMdCall } from "react-icons/io";
import { MdUnarchive } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { Link } from 'react-router-dom';



const Activity = () => {
    const API = "https://cerulean-marlin-wig.cyclic.app/";
    const [calldata, setCalldata] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(API + "activities");
        const jsonData = await data.json();
        const groupedData = {};

        jsonData.forEach(call => {
            const createdAt = new Date(call.created_at); // Extract date without time
            const year = createdAt.getFullYear(); // Get the year (e.g., 2023)
            const month = createdAt.getMonth() + 1; // Get the month (0-11, so adding 1 to get 1-12)
            const day = createdAt.getDate(); // Get the day of the month (1-31)

            const completeDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

            if (!groupedData[completeDate] && !call.is_archived && call.from && call.to) {
                groupedData[completeDate] = [];
            }
            if (!call.is_archived && call.from && call.to)
                groupedData[completeDate].push(call);
        });

        const sortedKeys = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));
        const sortedData = {};

        sortedKeys.forEach(key => {
            sortedData[key] = groupedData[key].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        });

        // console.log(sortedData);

        setCalldata(sortedData);
    };

    // console.log(calldata)

    const formatDate = (inputDate) => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const dateParts = inputDate.split('-');
        const year = dateParts[0];
        const month = months[parseInt(dateParts[1]) - 1];
        const day = dateParts[2];

        return `${day} ${month} ${year}`;
    };
    const archiveAll = async () => {
        const updatedData = {};
        for (const key in calldata) {
            if (calldata[key] && calldata[key].length > 0) {
                const updatedCalls = await Promise.all(
                    calldata[key].map(async call => {
                        try {
                            await fetch(API + "activities/" + call.id, {
                                method: "PATCH",
                                body: JSON.stringify({
                                    is_archived: true
                                }),
                                headers: {
                                    "Content-type": "application/json",
                                },
                            });
                        } catch (error) {
                            console.error("Error during PATCH request:", error);
                            return call;
                        }
                    })
                );
            }
        }

        setCalldata(updatedData);

    }

    const Time = (call) => {
        const dateString = call.created_at;
        const dateObject = new Date(dateString);

        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        // console.log(hours, minutes)

        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

        const time = `${formattedHours < 10 ? '0' + formattedHours : formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`

        return time;
    }

    const handleArch = async (date, call) => {
        try {
            const response = await fetch(API + "activities/" + call.id, {
                method: "PATCH",
                body: JSON.stringify({
                    is_archived: !call.is_archived
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
            const updatedCalldata = {
                ...calldata,
                [date]: calldata[date].filter(obj => obj.id !== call.id)
            };
            const filteredObject = Object.fromEntries(
                Object.entries(updatedCalldata).filter(([key, value]) => value.length > 0)
            );
            setCalldata(filteredObject)
            // console.log(filteredObject);
        } catch (error) {
            console.error("Error during PATCH request:", error);
        }

    };

    return (
        <div>
            <div className="w-[90%] text-lg text-gray-400 flex justify-center pt-4 gap-2 mb-5 font-semibold  m-auto rounded-b-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[50px]">
                <button
                    onClick={archiveAll}
                    className="text-xl gap-2 flex">
                    <div className="text-xl pt-1 flex">
                        <IoMdArchive />
                    </div>
                    <div>Archive All Calls</div>
                </button>
            </div>
            {Object.entries(calldata).map(([date, calls]) => (

                <div key={date}>
                    < div className="date-with-dots-container text-gray-500 font-semibold" >
                        <hr className="dot" />
                        <div className="date">{calls && formatDate(date)}</div>
                        <hr className="dot" />
                    </div>

                    {calls.map(call => (

                        call.from &&
                        <div key={call.id}>
                            <div className='w-[90%] flex justify-between p-5 mt-2 mb-2 m-auto rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[70px] '>
                                <div className='flex gap-5'>
                                    <div className='text-3xl flex flex-col justify-center text-red-400'>
                                        {call.call_type === 'answered' && <IoMdCall style={{ color: 'green' }} />}
                                        {call.call_type === 'missed' && <FcMissedCall />}
                                        {call.call_type === 'voicemail' && <FcVoicemail />}
                                    </div>
                                    <div className='flex flex-col justify-center '>
                                        <p className='text-xl font-semibold font-mono'>{call?.from} </p>
                                        <p className='text-gray-500 font-semibold'> Tried to reach on {call?.to}</p>

                                    </div>

                                </div>
                                <div className='flex flex-col justify-center font-semibold text-gray-500'>
                                    {Time(call)}
                                </div>
                                <div className='flex flex-col text-xl justify-center gap-2'>
                                    <Link to={"/activities/" + call.id}><p className='text-green-500'><CiCircleInfo style={{ color: 'green' }} />  </p></Link>

                                    <button onClick={() => handleArch(date, call)}  ><p className='text-amber-800'>{!call.is_archived && <IoMdArchive style={{ color: 'green' }} />}{call.is_archived && <MdUnarchive style={{ color: 'green' }} />}</p></button>

                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div >
            ))}

            {Object.keys(calldata).length === 0 && <div className="h-full flex items-center text-gray justify-center">No Data</div>}        </div >
    );
};

export default Activity;
