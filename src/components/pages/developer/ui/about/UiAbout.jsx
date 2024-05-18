import React from 'react'
import { Link } from 'react-router-dom';
import useQueryData from '../../../../custom-hook/useQueryData';
import { StoreContext } from '../../../../../store/StoreContext';
import { devBaseImgUrl } from '../../../../helpers/functions-general';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const UiAbout = () => {
   
    //download resume
    const handleDownloadResume = () => {
      const link = document.createElement('a');
      link.href = '../../resume/resume_clarence.pdf';
      link.download = 'resume_clarence.pdf';
      link.click();
    };

  
  const {store, dispatch} = React.useContext(StoreContext) 
  const [info, setInfo] = React.useState(null)
   
  const {
    isLoading,
    isFetching,
    error,
    data: about,
  } = useQueryData(
    "/v1/about",
    "get", // method
    "about", // key
  );

  
  const [text] = useTypewriter({
    words:['Designer', 'Developer'],
    loop:{},
    typeSpeed: 180,
    delaySpeed: 200,
  })


  return (

    <>
    <section id='about'>
       {about?.data.map((item, key) => (
             item.about_is_active === 1 && (<div id='about' className='bg-[#0c1216] pt-16 px-12 pb-12'>
             <div className="container">
             <div className='wrapper flex gap-[90px] items-center'>
         
               <div className='left ml-[95px]'>
               <small className='text-[16px] mb-12 text-[#00abf0]'>{item.about_small_title}</small>
                 <h3 className='text-[35px] mt-3 font-regular font-bold '>{item.about_title} {text}<Cursor/></h3>
             
                 <div className='abt-img w-[320px] bg-[#00abf0] px-6 mx-auto mt-8 rounded-md'>
                 <img src={`${devBaseImgUrl}/${item.about_image}`} alt="" className=''/>
                 </div>
               </div>
         
               <div className='right  text-justify max-w-[700px] mt-20'>
                <div className='space-y-6'>
                <p>{item.about_description_1}</p>
                 <p>{item.about_description_2}</p>
                </div>
                      <div className="btn-container w-[345px] h-[50px] mt-6">
                      <Link><button onClick={handleDownloadResume}>{item.about_btn_title}</button></Link>
                      </div>
               </div>
             </div>
             </div>
             </div>)))}
             </section>
    
    </>
  )
}

export default UiAbout