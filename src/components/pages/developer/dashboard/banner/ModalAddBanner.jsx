import React from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import { Formik, Form } from 'formik'
import { InputFileUpload, InputText, InputTextArea } from '../../../../helpers/FormInputs'
import SpinnerButton from '../../../../partials/spinners/SpinnerButton'
import { setError, setIsAdd, setMessage, setSuccess } from '../../../../../store/StoreAction'
import { StoreContext } from '../../../../../store/StoreContext'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryData } from '../../../../helpers/queryData'
import ModalWrapper from '../../../../partials/ModalWrapper'
import useUploadPhoto from '../../../../custom-hook/useUploadPhoto'
import { devBaseImgUrl } from '../../../../helpers/functions-general'

const ModalAddBanner = ({itemEdit}) => {
    const {store, dispatch} = React.useContext(StoreContext)
    const handleClose = () => dispatch(setIsAdd(false));

    const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto(
        `/v1/upload/photo`,
        dispatch
      );


    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (values) =>
        queryData(
            itemEdit ? `/v1/banner/${itemEdit.banner_aid}` :`/v1/banner`,
            itemEdit ? "put" : "post",
            values
        ),
   
        onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["banner"] });
        if (data.success) {
            dispatch(setIsAdd(false));
            dispatch(setSuccess(true));
            dispatch(setMessage(`Successfuly updated.`));
        } else {
            dispatch(setError(true));
            dispatch(setMessage(data.error));
        } 
        },
    });

    
     const initVal  = {
          banner_title_1 : itemEdit ? itemEdit.banner_title_1 : "",
          banner_image : itemEdit ? itemEdit.banner_image : "",
          banner_description : itemEdit ? itemEdit.banner_description : "", 
          banner_btn_title : itemEdit ? itemEdit.banner_btn_title : "",
          banner_btn_title_2 : itemEdit ? itemEdit.banner_btn_title_2 : "",
        
     }
    
     const yupSchema = Yup.object({
       
        banner_title_1: Yup.string().required("Required"),
        banner_description: Yup.string().required("Required"),
        banner_btn_title: Yup.string().required("Required"),
        banner_btn_title_2: Yup.string().required("Required"),
    
     })

  return (
    <div>
      <ModalWrapper>
      <div className="main-modal w-[320px] bg-black text-white text-content h-full">
                <div className="modal-header p-4 relative">
                    <h2>New Student</h2>
                    <button className='absolute top-[25px] right-4' onClick={handleClose}><LiaTimesSolid/></button>
                </div>
                <div className="modal-body p-4">
                    <Formik
                        initialValues={initVal}
                        validationSchema={yupSchema}
                        onSubmit={async (values) => {
                            uploadPhoto()
                            mutation.mutate({...values, 
                                banner_image:
                                (itemEdit && itemEdit.banner_image === "") || photo
                                  ? photo === null
                                    ? itemEdit.banner_image
                                    : photo.name
                                  : values.banner_image,})
                          }}
                    >
                        {(props) => {
                            return (
                            <Form  className='flex flex-col h-[calc(100vh-110px)]'>
                        <div className='grow overflow-y-auto'>
                        
                        <div className="input-wrap">
                            {photo || (itemEdit && itemEdit.banner_image !== "") ? (
                        <img
                        src={
                        photo
                        ? URL.createObjectURL(photo) // preview
                        : itemEdit.banner_image // check db
                        ? devBaseImgUrl + "/" + itemEdit.banner_image
                        : null
                        }
                        alt="Photo"
                        className="rounded-tr-md rounded-tl-md h-[200px] max-h-[200px] w-full object-cover object-center m-auto"
                        />
                            ) : (
                        <span className="min-h-20 flex items-center justify-center">
                        <span className="text-accent mr-1">Drag & Drop</span>{" "}
                        photo here or{" "}
                        <span className="text-accent ml-1">Browse</span>
                        </span>
                        )}

                        {(photo !== null ||
                        (itemEdit && itemEdit.banner_image !== "")) && (
                        <span className="min-h-10 flex items-center justify-center">
                            <span className="text-accent mr-1">Drag & Drop</span>{" "}
                            photo here or{" "}
                            <span className="text-accent ml-1">Browse</span>
                            </span>  
                            )}

{/* <FaUpload className="opacity-100 duration-200 group-hover:opacity-100 fill-dark/70 absolute top-0 right-0 bottom-0 left-0 min-w-[1.2rem] min-h-[1.2rem] max-w-[1.2rem] max-h-[1.2rem] m-auto cursor-pointer" /> */}
               <InputFileUpload
               label="Photo"
               name="photo"
               type="file"
               id="myFile"
               accept="image/*"
               title="Upload photo"
               onChange={(e) => handleChangePhoto(e)}
               onDrop={(e) => handleChangePhoto(e)}
               className="opacity-0 absolute right-0 bottom-0 left-0 m-auto cursor-pointer h-full "
/>

                         </div>

                            
                        <div className="input-wrap">
                            <InputText
                                label="Title 1"
                                type="text"
                                name="banner_title_1"
                            />
                        </div>


                                
                                {/* edit here */}
   
                        <div className="input-wrap">
                        <InputTextArea
                                label="Description"
                                type="text"
                                name="banner_description"
                                className='h-[10rem] resize-none'
                            />
                        </div>

                        <div className="input-wrap">
                        <InputText
                                label="Button Title"
                                type="text"
                                name="banner_btn_title"
                            />
                        </div>

                        <div className="input-wrap">
                            <InputText
                                label="Button Title 2"
                                type="text"
                                name="banner_btn_title_2"
                            />
                        </div>

                        </div>

                        <div className='form-action'>
                            <button className='btn btn-form btn--accent' type="submit"> {mutation.isPending ? <SpinnerButton/> : "Add"}</button>
                            <button className='btn btn-form btn--cancel' type="button" onClick={handleClose} >Cancel</button>
                        </div>
                    </Form>)}}
                    
                    </Formik>
                </div>
        </div>
    </ModalWrapper>
    </div>
  )
}

export default ModalAddBanner
