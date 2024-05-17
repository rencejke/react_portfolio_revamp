import React from 'react'
import Navigation from '../../../../partials/Navigation'
import Header from '../../../../partials/Header'
import { FiPlus } from 'react-icons/fi'
import useQueryData from '../../../../custom-hook/useQueryData'
import { setIsAdd } from '../../../../../store/StoreAction'
import { StoreContext } from '../../../../../store/StoreContext'
import Toast from '../../../../partials/Toast'
import ExpTable from './ExpTable'
import ModalAddExp from './ModalAddExp'
import ModalError from '../../../../partials/modals/ModalError'

const Exp = () => {
    const {store, dispatch} = React.useContext(StoreContext)
    const [isSearch, setIsSearch] = React.useState(false);
    const [keyword, setKeyword] = React.useState('');
    const [itemEdit, setItemEdit] = React.useState(null);

    const {
        isLoading,
        isFetching,
        error,
        data: exp,
      } = useQueryData(
        "/v1/exp", // endpoint
        "get", // method
        "exp", // key
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
                    <h1 className='uppercase'>Experience Section</h1>
                    {/* <Searchbar setIsSeach={setIsSeach} setKeyword={setKeyword}/> */}
                </div>
            

                <div className='tab flex justify-between items-center mt-8 border-b border-line mb-8 '>
                   <h1>Search</h1>

                    <button className='btn btn--accent' onClick={handleAdd}>
                        <FiPlus/> New
                    </button>
                </div>
                    {/* table here */}
                    <ExpTable isLoading={isLoading} exp={exp} isFetching={isFetching} setItemEdit={setItemEdit}/>
            </div>
             {/* database info */}
        </div>

        </main>

        {store.isAdd && <ModalAddExp itemEdit={itemEdit}/>}
        {store.error && <ModalError position='center'/>}
        {store.success && <Toast />}
    </section>

    </>
  )
}

export default Exp
