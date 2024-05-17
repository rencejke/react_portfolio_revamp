import React from 'react'
import Navigation from '../../../../partials/Navigation'
import Header from '../../../../partials/Header'
import { FiPlus } from 'react-icons/fi'
import BannerTable from './BannerTable'
import ModalAddBanner from './ModalAddBanner'
import useQueryData from '../../../../custom-hook/useQueryData'
import { setIsAdd } from '../../../../../store/StoreAction'
import { StoreContext } from '../../../../../store/StoreContext'
import Toast from '../../../../partials/Toast'
import ModalError from '../../../../partials/modals/ModalError'

const Banner = () => {
    const {store, dispatch} = React.useContext(StoreContext)
    const [isSearch, setIsSearch] = React.useState(false);
    const [keyword, setKeyword] = React.useState('');
    const [itemEdit, setItemEdit] = React.useState(null);

    const {
        isLoading,
        isFetching,
        error,
        data: banner,
      } = useQueryData(
        isSearch ? "/v1/banner/search" : "/v1/banner", // endpoint
        isSearch ? "post" : "get", // method
        "banner", // key
        {
            searchValue: keyword
        }
      );

      //addbtn
      const handleAdd = () => {
        dispatch(setIsAdd(true))
        setItemEdit(null)
      }

  return (
    <>

      <section className='flex overflow-x-hidden'>
        <Navigation/>
        <main className='w-[calc(100%-250px)]'>
            <Header/>

        <div className='flex relative'>
            <div className={`main-wrapper transition-all px-4 py-3 max-h-[calc(100vh - 65px)] w-full `}>
                <div className='flex justify-between items-center'>
                    <h1 className='uppercase'>Banner Section</h1>
                    {/* <Searchbar setIsSeach={setIsSeach} setKeyword={setKeyword}/> */}
                </div>
            

                <div className='tab flex justify-between items-center mt-8 border-b border-line mb-8 '>
                   <h1>Search</h1>

                    <button className='btn btn--accent' onClick={handleAdd}>
                        <FiPlus/> New
                    </button>
                </div>
                    {/* table here */}
                    <BannerTable  isLoading={isLoading} banner={banner} isFetching={isFetching} setItemEdit={setItemEdit}/>
            </div>
             {/* database info */}
        </div>

        </main>

        {store.isAdd && <ModalAddBanner itemEdit={itemEdit}/>}
        {store.error && <ModalError position='center'/>}
        {store.success && <Toast />}
    </section>

    </>
  )
}

export default Banner
