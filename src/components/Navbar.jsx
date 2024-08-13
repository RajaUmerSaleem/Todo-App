
const Navbar = () => {
  
  return (
    <>
      <div className='w-[98%] h-[50px] bg-slate-700 flex mx-auto my-[10px] rounded-[10px]'>
        <ul className="w-full h-[50px] flex  justify-around">
          <li className="text-white flex justify-center items-center  sm::text-[15px] md:text-[35px] w-[50%] font-extrabold ">Tasks List<span className="text-[15px] p-2">&reg;</span> </li>
         <li className="text-white sm::text-[10px] font-light  md:text-[15px] w-[50%] sm:font-bold m-[2px] flex justify-center items-center">Copyright &copy; 2024 </li>:
        </ul>
      </div>
    </>
  )
}

export default Navbar
