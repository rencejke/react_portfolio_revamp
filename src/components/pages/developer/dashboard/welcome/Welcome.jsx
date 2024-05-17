import React from 'react'
import Navigation from '../../../../partials/Navigation'
import Header from '../../../../partials/Header'
import useQueryData from '../../../../custom-hook/useQueryData'
import WelcomeTable from './WelcomeTable'

const Welcome = () => {

    const {
        data: banner,
      } = useQueryData(
        "/v1/banner", // endpoint
        "get", // method
        "banner", // key
      );

      const {
        data: about,
      } = useQueryData(
        "/v1/about", // endpoint
        "get", // method
        "about", // key
      );

      const {
        data: exp, 
      } = useQueryData(
        "/v1/exp", // endpoint
        "get", // method
        "exp", // key
      );

      
      const {
        data: projects, 
      } = useQueryData(
        "/v1/projects", // endpoint
        "get", // method
        "projects", // key
      );

      const {
        data: contact, 
      } = useQueryData(
        "/v1/contact", // endpoint
        "get", // method
        "contact", // key
      );


  return (
    <>

      <section className='flex overflow-x-hidden'>
        <Navigation/>
        <main className='w-[calc(100%-250px)]'>
            <Header/>

        <div className='flex relative'>
            <div className={`main-wrapper transition-all px-4 py-3 max-h-[calc(100vh - 65px)] w-full `}>
                <div className='flex justify-between items-center'>
                    <h1 className='uppercase'>Welcome User 001</h1>
                    {/* <Searchbar setIsSeach={setIsSeach} setKeyword={setKeyword}/> */}
                </div>
            

                {/* <div className='tab flex justify-between items-center mt-8 border-b border-line mb-8 '> */}
                 

                    {/* <button className='btn btn--accent' onClick={handleAdd}>
                        <FiPlus/> New
                    </button> */}
                {/* </div> */}
                    {/* table here */}
                    {/* <ExpTable isLoading={isLoading} exp={exp} isFetching={isFetching} setItemEdit={setItemEdit}/> */}
                    <WelcomeTable banner={banner} about={about} exp={exp} projects={projects} contact={contact}/>
            </div>
             {/* database info */}
        </div>

        </main>
{/* 
        {store.isAdd && <ModalAddExp itemEdit={itemEdit}/>}
        {store.error && <ModalErrorEXP position='center'/>}
        {store.success && <Toast />} */}
    </section>

    </>
  )
}

export default Welcome
