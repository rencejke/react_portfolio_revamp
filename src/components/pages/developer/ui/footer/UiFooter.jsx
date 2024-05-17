import React from 'react'
import { Link } from 'react-router-dom'
import {FaFacebookF, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { FaMobileScreen } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

const UiFooter = () => {
  return (
    <div className="footer max-w-[900x] w-full mx-auto px-4 py-1 font-regular bg-[#081b29] text-white">
    <div className='flex flex-row justify-around p-12'>
      <div className="footer-item flex flex-col">
      <span className='logo text-[1.4rem]'>Clarence.</span> 
      <p className='mt-3'>Lorem ipsum dolor sit amet.</p>
</div>
      <div className="footer-item  socials flex flex-col">
      <span className='text-[1.4rem]'>Socials</span>
      <ul className='flex gap-5  mt-3  text-[22px] text-[#081b29] items-center'>
          <li><Link><FaFacebookF className='text-[#081b29]'/></Link></li>
          <li><Link><FaTwitter className='text-[#081b29]'/></Link></li>
          <li><Link><FaLinkedin className='text-[#081b29]'/></Link></li>
          <li><Link><FaInstagram className='text-[#081b29]'/></Link></li>
          <li><Link><FaGithub className='text-[#081b29]'/></Link></li>
        </ul>

      </div>
      <div className="footer-item flex flex-col ">
      <span className='text-[1.4rem] text-[#081b29]'>Contact Me</span>
      
      <ul className='mt-3 flex flex-col gap-2'>
        <li className='text-[15px] flex flex-row items-center gap-2'><FaMobileScreen />123456789</li>
        <li className='text-[15px] flex flex-row items-center gap-2'><MdEmail />bonillaclarencejake@gmail.com</li>
      </ul>

      </div>
    </div>
  </div>
  )
}

export default UiFooter
