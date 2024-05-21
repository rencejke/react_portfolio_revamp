import React from 'react'
import useQueryData from '../../../../custom-hook/useQueryData';
import { StoreContext } from '../../../../../store/StoreContext';
import {FaFacebookF, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import AOS from 'aos';

AOS.init();


import { Link } from 'react-router-dom';
import { devBaseImgUrl } from '../../../../helpers/functions-general';


const UiBanner = () => {


  const {store, dispatch} = React.useContext(StoreContext) 
  const [info, setInfo] = React.useState(null)
   
  const {
    isLoading,
    isFetching,
    error,
    data: banner,
  } = useQueryData(
    "/v1/banner",
    "get", // method
    "banner", // key
  );


  const [text] = useTypewriter({
    words:['Designer', 'Developer'],
    loop:{},
    typeSpeed: 180,
    delaySpeed: 200,
  })



return (

    <>
    {banner?.data.map((item, key) => (
             item.banner_is_active === 1 && (<section className='home h-[100vh] flex items-center py-0 px-[10%] relative'>
             <div className=' max-w-[600px] text-[#ededed] space-y-6'>
             <h1 className='text-[56px] font-bold text-[#ededed] leading-[3.5rem] md:leading-3'>{item.banner_title_1}</h1>
             <h3 className='text-[32px] font-bold text-[#00abf0] leading-10'>Web {text}<Cursor/></h3>
              <p className='text-[#ededed] text-[16px] mt-5 mb-10 font-regular text-wrap md:text-wrap'>{item.banner_description}
                     </p>
         
                 <div className="btn-container flex w-[300px] md:w-[345px] h-[50px] justify-around gap-2 md:justify-between">
                     <Link><button>{item.banner_btn_title}</button></Link>
                     <Link><button>{item.banner_btn_title_2}</button></Link>
                 </div>
         
                 <img src={`${devBaseImgUrl}/${item.banner_image}`} className='absolute h-[890px] w-[700px] top-0 right-20 bottom-0 invisible md:visible' alt="" />
                 
                 <div className="socials bg-[#081b29] max-w-[800px] w-[400px] py-3  px-6 rounded-md absolute  right-5 md:right-10 bottom-[120px] md:bottom-[150px]">
                   <ul className='flex gap-5  text-[26px]  items-center'>
                     <li><Link><FaFacebookF className='text-[#081b29]'/></Link></li>
                     <li><Link><FaTwitter className='text-[#081b29]'/></Link></li>
                     <li><Link><FaLinkedin className='text-[#081b29]'/></Link></li>
                     <li><Link><FaInstagram className='text-[#081b29]'/></Link></li>
                     <li><Link><FaGithub className='text-[#081b29]'/></Link></li>
                   </ul>
                 </div> 
         
                       <Link className='scroll-btn mb-12'></Link>
                     
         </div>
         
         </section>)))}
   </>
  )
}

export default UiBanner