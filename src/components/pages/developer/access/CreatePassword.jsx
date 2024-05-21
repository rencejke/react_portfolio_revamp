import React from 'react'
import Logo from '../../../partials/svg/Logo'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { StoreContext } from '../../../../store/StoreContext'
import { getUrlParam } from '../../../helpers/functions-general'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { InputText } from '../../../helpers/FormInputs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryData } from '../../../helpers/queryData'
import { setError, setMessage, setSuccess } from '../../../../store/StoreAction'

const CreatePassword = () => {
    const {store, dispatch} = React.useContext(StoreContext)
    const [verifySuccess, setVerifySuccess] = React.useState(false);
    const [isPasswordNew, setIsPasswordNew] = React.useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);

    const paramKey = getUrlParam().get('key');



    const handleChange = () => console.log('123')

    const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData("/v1/user/password", "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        setVerifySuccess(true);
      }
    },
  });



    const initVal = { new_password: "", confirm_password: "", key: paramKey };
    const yupSchema = Yup.object({
        new_password: Yup.string()
        .required("Required"),
        confirm_password: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("new_password"), null], "Passwords does not match."),
    });


  return (
    <div className="h-screen w-full flex justify-center items-center">
    <div className='max-w-[400px] w-full px-4 py-8 bg-secondary'>
        <Logo />

        {verifySuccess ? ( 
            <div className='text-center'>
                <FaCheckCircle className='text-accent block mx-auto my-5 text-4xl'/>    
                <h3>New Password Set!</h3>
                <p className='text-balance'>Please click the link below to login</p>
                <Link to="/login">Login</Link>
            </div>
        ) : (<>
          <h2>Create Password</h2>
          <Formik
             initialValues={initVal}
             validationSchema={yupSchema}
             onSubmit={async (values, { setSubmitting, resetForm }) => {
             mutation.mutate(values);
             }}
         >
             {(props) => {
             return (
                 <Form className="w-full">
                         <div className="input-wrap mb-5">
                         <InputText
                             label="Password"
                             type={isPasswordNew ? "password" : "text"}
                             name="new_password"
                             onKeyUp={(e) => handleChange(e.target.value)}
                             disabled={mutation.isPending}
                             />
                             {props.values.new_password && (
                             <button
                                 onClick={() => setIsPasswordNew(!isPasswordNew)}
                                 className="text-primary absolute top-1/2 right-3 text-primary"

                                 type="button"
                             >
                                 {isPasswordNew ? <FaRegEye /> : <FaRegEyeSlash />}
                             </button>
                             )}
                         </div>

                         <div className="input-wrap mb-10">
                         <InputText
                                 label="Confirm Password"
                                 type={isPasswordConfirm ? "password" : "text"}
                                 name="confirm_password"
                                 disabled={mutation.isPending}
                                 />
                                 {props.values.confirm_password && (
                                 <button
                                     onClick={() => setIsPasswordConfirm(!isPasswordConfirm)}
                                     className="text-primary absolute top-1/2 right-3 text-primary"
                                     type="button"
                                 >
                                     {isPasswordConfirm ? <FaRegEye /> : <FaRegEyeSlash />}
                                 </button>
                                 )}
                         </div>
                 
                         <button className='btn btn--accent w-full p-4 justify-center'>Create Password</button>
                         <button className='btn btn--cancel w-full p-4 justify-center mt-3'>Return</button>
                 </Form>
             );
             }}
         </Formik>
   </>
 )}
</div>
</div>

)
}

export default CreatePassword
