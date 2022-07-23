import React, { useEffect } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import Loading from './Loading';
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

    const { register, watch, formState: { errors }, handleSubmit } = useForm();

    if (googleUser || user) {
        navigate('/profile');
    }

    if (googleLoading || loading) {
        return <Loading></Loading>
    };

    let signInError;
    if (googleError || error) {
        signInError = <p className='text-red-600'>{googleError?.message || error?.message}</p>
    };

    const onSubmit = data => {
        // console.log(data);
        signInWithEmailAndPassword(data.email, data.password);
    };
    const reset = async () => {
        const email = watch(("email"));
        console.log(email);
        if (email) {
            await sendPasswordResetEmail(email);
            alert('email sent')
        }
        else {
            alert('provide your email')
        }
    }
    return (
        <div className="card w-1/2 mx-auto my-auto bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center text-blue-900 text-3xl font-bold ">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className=' grid grid-cols-1 gap-3 justify-items-center'>

                    <div className="form-control w-full max-w-xs text-center">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Enter your email" className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid pattern'
                                }
                            })} />

                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}

                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                        </label>

                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter your password" className="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password should be 6 characters'
                                }
                            })} />

                        <label className="label">
                            <span className="label-text-alt">Forget password?</span>
                            <span onClick={reset} className="label-text-alt text-secondary">Reset password</span>
                        </label>

                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}

                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                        </label>
                    </div>

                    <input className='btn  text-white uppercase font-bold  w-full max-w-xs' type="submit" />

                    <p> <Link className='text-secondary' to='/signup'>Signup</Link> </p>

                    {signInError}
                </form>

                <div className="flex flex-col w-full border-opacity-50">
                    <div className="divider">OR</div>
                </div>

                <button onClick={() => signInWithGoogle()} className="btn btn-outline lg:w-1/2 mx-auto text-primary">Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;