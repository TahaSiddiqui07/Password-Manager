import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied To Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
        passwordRef.current.type = isPasswordVisible ? "text" : "password";
    }
    const savePassword = () => {
        if(form.site.length >3 && form.username.length >3 && form.password.length >3){
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        console.log([...passwordArray, form])
        setForm({ site: "", username: "", password: "" })
    }
    else{
         toast('Error')
    }
    }
    const deletePassword = (id) => {
        console.log("deleting your pass", id)
        let c = confirm("Do You Want To Delete")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

        }
    }
    const editPassword = (id) => {
        console.log("editing your pass", id)
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
            <div className="p-2 md:p-0 md:mycontainer min-h-[88.2vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-600 "> &lt;</span>

                    Magic

                    <span className="text-green-600">Vault/ &gt;</span>
                </h1>
                <p className='text-green-800 text-center text-lg'>Your Personal Password Manager</p>
                <div className="text-black items-center flex flex-col p-4 gap-5
                ">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full py-1 p-4' type="text" name='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-6 ">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full py-1 p-4' type="text" name='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full py-1 p-4' type="password" name='password' />
                            <span onClick={showPassword} className='absolute right-[8px] top-[1px] cursor-pointer'><lord-icon
                                src="https://cdn.lordicon.com/dicvhxpz.json"
                                trigger="hover">
                            </lord-icon></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-300 rounded-full hover:bg-green-500 px-5 gap-1 border border-green-500 py-1 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="hover">
                        </lord-icon>
                        Save Pasword</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold py-4 text-xl'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords To Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md mb-10 overflow-hidden">
                        <thead className='text-white bg-green-500'>
                            <tr>
                                <th className='py-1'>Site</th>
                                <th className='py-1'>Username</th>
                                <th className='py-1'>Password</th>
                                <th className='py-1'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-1 text-center '>
                                        <div className="flex items-center justify-center ">
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className="lordiconcopy cursor-pointer size-7" onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/jectmwqf.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 text-center'>
                                        <div className="flex justify-center items-center ">
                                            <span>{item.username}</span>
                                            <div className="lordiconcopy cursor-pointer size-7" onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/jectmwqf.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 text-center'>
                                        <div className="flex justify-center items-center ">
                                            <span>{item.password}</span>
                                            <div className="lordiconcopy cursor-pointer size-7" onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/jectmwqf.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 text-center'>
                                        <span className='cursor-pointer mx-2' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                colors="primary:#646e78,secondary:#4bb3fd,tertiary:#30e849,quaternary:#3a3347"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-2' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                colors="primary:#646e78,secondary:#4bb3fd,tertiary:#30e849,quaternary:#3a3347"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
