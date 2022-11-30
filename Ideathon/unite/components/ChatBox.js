import React from 'react'
import ChatInput from './ChatInput'
import Image from 'next/image';


function ChatBox(props) {
    const chats = props.allMessages;
    var rows = [];
    var arr = chats || [];
    arr.forEach(chat => {
        rows.push(

            // <div>{chat.profile_id === props.user.id ? (
            //     <div className='my-10 flex rounded text-white bg-blue-500 outline-none p-2'>
            //         {chat.content}
            //         {chat.profile.username}
            //     </div>
            // ) : (
            //     <div className='my-10 flex-1 text-white rounded bg-red-500 outline-none p-2'>
            //         {chat.content}
            //         {chat.profile.username}
            //     </div>
            // )}
            // </div>


            (chat.profile_id === props.user.id) ? (
                <div className='flex w-fit ml-auto'>
                    <div className='flex-shrink-0 order-2'>
                        <Image
                            className="rounded-full mx-2"
                            height={30}
                            width={30}
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt="Profile Picture"
                        />
                    </div>
                    <div className=' ml-auto'   >
                        <p className='text-[0.65rem] px-[2px] pb-[2px] text-blue-400'>{chat.profile.username}</p>
                        <div className=' items-end'>
                            <div className='px-3 py-2 rounded-lg w-fit text-white bg-blue-400'>
                                <p>{chat.content}</p>
                            </div>
                            <p className='text-[0.65rem] italic  px-[2px] pb-[2px] text-gray-400'>30/11/2022 12:15 PM</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex w-fit'>
                    <div className='flex-shrink-0'>
                        <Image
                            className="rounded-full mx-2"
                            height={30}
                            width={30}
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt="Profile Picture"
                        />
                    </div>
                    <div>
                        <p className='text-[0.65rem] px-[2px] pb-[2px] text-red-400'>{chat.profile.username}</p>
                        <div className=' items-end'>
                            <div className='px-3 py-2 rounded-lg w-fit text-white bg-red-400'>
                                <p>{chat.content}</p>
                            </div>
                            <p className='text-[0.65rem] italic  px-[2px] pb-[2px] text-gray-400'>30/11/2022 12:15 PM</p>
                        </div>
                    </div>
                </div>)






        )
    });
    return (
        <div className=' w-full'>
            {rows}
        </div>
    )
}

export default ChatBox