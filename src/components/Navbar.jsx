

const Navbar = () => {
  return (
    <nav>
      <div className='flex justify-between bg-slate-700 text-white py-2'>
        <span className='font-bold text-xl mx-8'>iTask</span>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>
                Home
            </li>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>
                Your Tasks
            </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
