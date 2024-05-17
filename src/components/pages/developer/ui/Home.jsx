import React, { useEffect, useState } from 'react'
import UiBanner from './uibanner/UiBanner';
import UiHeader from './header/UiHeader';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import UiAbout from './about/UiAbout';
import UiExperiences from './experiences/UiExperiences';
import UiProjects from './project/UiProjects';
import UiCta from './cta/UiCta';
import UiFooter from './footer/UiFooter';
import ScrollToTop from './ScrollToTop';
import UiServices from './services/UiServices';

AOS.init();

const Home = () => {
  
  const [home, setHome] = useState('')
    const [showImg, setShowImg] = useState(true);
    useEffect (() => {

        setTimeout(() => {
            setShowImg(false);
            setHome(
               <Home />
            )
            }, 500)

        })

  return (
<>
   

           <div className='bg-[#081b29] h-[100dvh] relative'>
            {
                showImg ? (<div className='flex justify-center items-center mx-auto pt-[23rem]'>
                
                <img src="../../loading2.svg" className='size-[130px]' alt="" /> 

                </div> ) : (   <div className='bg-[#081b29] text-white'>
    <div className={`banner h-[100dvh] relative isolate`}>
       
       <div className="backdrop absolute top-0 legft-0 h-full w-full -z-10"></div>
        
        <UiHeader />
        <UiBanner />
        </div>
        <UiAbout />
        <UiExperiences/>
        <UiProjects/>
        <UiServices/>
        <UiCta/>
        <UiFooter/>
        <ScrollToTop/>
    </div> )
     }
         
      
    

 
    </div>
</>
  )
}

export default Home