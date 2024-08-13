
const Footer = () => {

  return (
    <>
      <div className='w-[100%] h-[55px] bg-black my-2 flex mx-auto'>
        <ul className="w-full h-full flex  justify-center  items-center">
          <li><span  className="text-white flex justify-center items-center  sm::text-[10px] md:text-[15px]  font-semibold font-serif">Developer: Raja Umer Saleem</span><span  className="text-white flex justify-center items-center  sm::text-[10px] md:text-[15px]  font-extralight">Copyright &copy; 2024</span> </li>
          <li className="text-white flex justify-center items-center  p-1 "> <img src="2 new.JPG" className="w-[50px] h-[50px] m-2 rounded-full border-[2px] border-red-700" alt="image" /></li>
        </ul>
      </div>
    </>
  )
}

export default Footer
