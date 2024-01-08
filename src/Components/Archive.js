import Card from "./Card";
import { MdUnarchive } from "react-icons/md";
import React, { useEffect, useState } from "react";

const Activity = () => {
    const API = "https://cerulean-marlin-wig.cyclic.app/";
    const [calldata, setCalldata] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     fetchData();
    // }, [calldata]);

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

            if (!groupedData[completeDate] && call.is_archived && call.from && call.to) {
                groupedData[completeDate] = [];
            }
            if (call.is_archived && call.from && call.to)
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
    return (
        <div>
            <div className="w-[90%] text-lg text-gray-400 flex pt-4 justify-center gap-2 mb-5 font-semibold  m-auto rounded-b-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[50px]">
                <button

                    className="text-xl gap-2 flex">
                    <p className="text-xl pt-1 flex">
                        <MdUnarchive />
                    </p>
                    <p>Unarchive All Calls</p>
                </button>
            </div>

            {Object.entries(calldata).map(([date, calls]) => (
                // <div key={date}>
                //     <div>{formatDate(date)}</div>

                // </div>
                <div key={date}>
                    < div className="date-with-dots-container text-gray-500 font-semibold" >
                        <div>
                            <hr className="dot" />
                        </div >
                        <div className="date ">{formatDate(date)}</div>
                        {/* <div className="date ">{new Date(date).getHours()}:{ new Date(date).getMinutes() }</div> */}
                        <div>
                            <hr className="dot" />
                        </div >

                    </div>

                    {calls.map(call => (

                        call.from &&
                        <div key={call.id}>
                            <Card call={call} setCalldata={setCalldata} />

                            {/* <div className="date ">{new Date(call.created_at).getHours()}:{new Date(call.created_at).getMinutes()}</div> */}

                        </div>
                    ))
                    }
                </div >
            ))}
        </div >
    );
};

export default Activity;
