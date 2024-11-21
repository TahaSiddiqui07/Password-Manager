import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex px-4 py-5 h-14 justify-between items-center">
                <div className="logo font-bold text-2xl">
                    <span className="text-green-600 "> &lt;</span>

                    Magic

                    <span className="text-green-600">Vault/&gt;</span>

                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">contact</a>
                    </li>
                </ul> */}
                <button className='text-white bg-gray-600 my-5 mx-4 rounded-full flex  justify-between items-center ring-white ring-1'> 
                    <img className='invert  w-10 p-1' src="/icons/githubs.svg" alt="github logo" />
                    <span className='font-bold px-2'>GitHub</span>
                    
                </button>
            </div>
        </nav>
    )
}

export default Navbar
