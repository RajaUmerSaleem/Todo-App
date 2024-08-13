import { useState } from 'react'

const Todoli = () => {
  
    return (
        <>
            <div className='w-full h-[13%] bg-white flex justify-center rounded-xl px-[5px] items-center'>
                <div className={`w-[72%] h-[95%] bg-white border-black text-black  flex p-[5px]  overflow-scroll overflow-x-hidden ${click ? 'line-through' : ''}`}>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dicta modi nemo iure, minus sint voluptatem, quasi quia recusandae quis ea, nisi quod est? Doloremque at dolorem accusantium, odit tempora sit est voluptate repudiandae doloribus. Impedit velit autem libero, neque labore dicta animi odio!   untur, quod aliquid quis expedita animi cumque ipsa exercitationem voluptates distinctio consectetur placeat vel hic iusto!
                </div>
                <div className='w-[28%] h-[95%] flex justify-center items-center'>
                    <button  className='w-[20%] mx-[5px] h-[80%]   font-bold hover:font-extrabold border-black  text-white'>
                        <input type="checkbox"/>
                    </button>
                    <button className='w-[40%] mx-[2px] h-[80%] bg-blue-600 duration-75 hover:bg-blue-400  font-bold hover:font-extrabold border-black rounded-[20px] material-symbols-outlined text-white'>Delete</button>
                    <button  className='w-[40%] mx-[2px] h-[80%] bg-black hover:bg-gray-600 font-bold hover:font-extrabold border-black rounded-[20px] text-white material-symbols-outlined '>edit</button>
                </div>
            </div>
        </>
    )
}

export default Todoli
