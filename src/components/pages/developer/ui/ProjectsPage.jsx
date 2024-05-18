import React from 'react'
import GitHubCalendar from 'react-github-calendar'
import { Link } from 'react-router-dom'
import UiHeader from './header/UiHeader'
import UiFooter from './footer/UiFooter'
import UiCta from './cta/UiCta';
import { StoreContext } from '../../../../store/StoreContext'
import { devBaseImgUrl } from '../../../helpers/functions-general'
import useQueryData from '../../../custom-hook/useQueryData'


const ProjectsPage = () => {

  const {store, dispatch} = React.useContext(StoreContext) 
  const [info, setInfo] = React.useState(null)
   
  const {
    isLoading,
    isFetching,
    error,
    data: projects,
  } = useQueryData(
    "/v1/projects",
    "get", // method
    "projects", // key
  );

  return (
    <>
    <div className='text-[#ededed]'>
    <UiHeader/>
     
    <section id='portfolio' className='projects bg-[#0c1216] dark:bg-[#ededed]/10 pt-8 py-12  overflow-hidden'>
    <div className='"max-w-[1000px] w-full mx-auto px-4 py-1'>
      <div className="wrapper ">
       
      {projects?.data.map((item, key) => (
        item.projects_is_active === 1 && (
          <div className='max-w-[1000px] w-[100%] mx-auto mt-12' key={key}>
            <div className="active panel">
              <div className='tab-item grid grid-cols-[3fr_6fr] gap-10 bg-[#ededed]/80 p-6 rounded-md'>
                <div className='left'>
                  <img src={`${devBaseImgUrl}/${item.projects_image}`} alt="" className='w-[1000px]
                   h-[230px] rounded-xl object-cover object-center '/>
                </div>
                <div className='right text-[#081b29]'>
                  <h3 className='font-bold '>{item.projects_title}</h3>
                  <p className=''>{item.projects_description}</p>
                  <div className='mb-4 flex gap-2 items-center'>
                    <h4 className='font-bold mt-2'>Technologies:</h4>
                    <p className='bg-[#081b29] px-2 py-1 rounded-md text-[#ededed] items-center'>{item.projects_tech}</p>
                  </div>
                  <div className="btn-container w-[345px] h-[50px] ">
                    <Link><button>{item.projects_btn_title}</button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ))}

      </div>
    </div>
  </section>
    
  <section className='days-code p-8'>
    <div className='max-w-[950px] w-[100%] mx-auto mt-12'>
    <h3 className='text-[30px] mb-5 '>Days I <span className='text-[#00abf0]'>Code</span></h3>
      <GitHubCalendar username='rencejke'  blockMargin={6}/>
      </div>
    </section>

    <UiCta/>
    <UiFooter/>
    </div>
    </>
  )
}

export default ProjectsPage