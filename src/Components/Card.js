import React from 'react'
import { FcMissedCall } from "react-icons/fc";
import { FcVoicemail } from "react-icons/fc";
import { IoMdCall } from "react-icons/io";
import { MdUnarchive } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdArchive } from "react-icons/io";
import { Link } from 'react-router-dom';

const Card = ({ call , setCalldata}) => {

    const dateString = call.created_at;
    const dateObject = new Date(dateString);

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    // console.log(hours, minutes)

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    const time = `${formattedHours < 10 ? '0' + formattedHours : formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
    // console.log(call.is_archived);
    // call.is_archived = true;

    // Handeling the Archieved 

    const API = "https://cerulean-marlin-wig.cyclic.app/activities/" + call.id;

    const handleArch = async () => {
        try {
            const response = await fetch(API, {
                method: "PATCH",
                body: JSON.stringify({
                    is_archived: !call.is_archived
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
            // call.is_archived = !call.is_archived
            // console.log(response)
            
            // Activity.ChangeData();
        } catch (error) {
            console.error("Error during PATCH request:", error);
        }
    };



    return (<div className='w-[90%] flex justify-between p-5 mt-2 mb-2 m-auto rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[70px] '>
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
            {time}
        </div>
        <div className='flex flex-col text-xl justify-center gap-2'>
            <Link to={"/activities/" + call.id}><p className='text-green-500'><CiCircleInfo style={{ color: 'green' }} />  </p></Link>

            <button onClick={() => handleArch()}  ><p className='text-amber-800'>{!call.is_archived && <IoMdArchive style={{ color: 'green' }} />}{call.is_archived && <MdUnarchive style={{ color: 'green' }} />}</p></button>

        </div>
    </div>)
}

export default Card