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

const ModalAddServices = ({itemEdit}) => {
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
            itemEdit ? `/v1/services/${itemEdit.services_aid}` :`/v1/services`,
            itemEdit ? "put" : "post",
            values
        ),
   
        onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["services"] });
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
          services_type : itemEdit ? itemEdit.services_type : "",
          services_image : itemEdit ? itemEdit.services_image : "",
          services_description : itemEdit ? itemEdit.services_description : "", 
          services_btn_title : itemEdit ? itemEdit.services_btn_title : "",
     }
       

     const yupSchema = Yup.object({
       
        services_type: Yup.string().required("Required"),
        services_description: Yup.string().required("Required"),
        services_btn_title: Yup.string().required("Required"),

     })


  return (
    <div>
      <ModalWrapper>
      <div className="main-modal w-[320px] bg-secondary text-content h-full">
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
                                services_image:
                                (itemEdit && itemEdit.services_image === "") || photo
                                  ? photo === null
                                    ? itemEdit.services_image
                                    : photo.name
                                  : values.services_image,})
                          }}
                    >
                        {(props) => {
                            return (
                            <Form  className='flex flex-col h-[calc(100vh-110px)]'>
                        <div className='grow overflow-y-auto'>


                            {/* edit here */}

                            <div className="input-wrap">
                            {photo || (itemEdit && itemEdit.services_image !== "") ? (
                        <img
                        src={
                        photo
                        ? URL.createObjectURL(photo) // preview
                        : itemEdit.services_image // check db
                        ? devBaseImgUrl + "/" + itemEdit.services_image
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
                        (itemEdit && itemEdit.services_image !== "")) && (
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
                                label="Type"
                                type="text"
                                name="services_type"
                            />
                        </div>

                        <div className="input-wrap">
                        <InputTextArea
                                label="Description"
                                type="text"
                                name="services_description"
                                className='h-[10rem] resize-none'
                            />
                        </div>
                          

                        <div className="input-wrap">
                        <InputText
                                label="Button Title"
                                type="text"
                                name="services_btn_title"
                            />
                        </div>                                
                                {/* edit here */}
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

export default ModalAddServices
