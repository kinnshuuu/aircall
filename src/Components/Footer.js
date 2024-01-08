import React from 'react'
import { MdOutlineCall } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { IoIosKeypad } from "react-icons/io";
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className=' flex pt-1 text-4xl justify-around h-[100px] w-[100%] pr-5 pl-5 pb-10 rounded-t-full sticky  m-auto mb-0 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
            <Link to={"/activities"}> <div className='pt-7 text-orange-500 cursor-pointer'><MdOutlineCall /> </div></Link>
            <div className='text-5xl pt-5 rounded-full text-green-600 text-center cursor-pointer'><IoIosKeypad /></div>           
            <div className='pt-7 text-blue-600 cursor-pointer '><RiContactsLine /></div>
        </footer>
    )
}

export default Footer