import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { FaUserEdit } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Loading from './Loading';

const Profile = () => {
    const [user] = useAuthState(auth);
    const [edit, setEdit] = useState(null);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const { data: mongoUser, isLoading, refetch } = useQuery(['mongoUser', user?.email], () => fetch(`https://peaceful-anchorage-00739.herokuapp.com/users/${user?.email}`, {
        method: 'GET'
    }).then(res => res.json())
    );

    if (isLoading) {
        return <Loading></Loading>
    }

    const onSubmit = data => {
        console.log(data);
        fetch(`https://peaceful-anchorage-00739.herokuapp.com/users/${user?.email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(inserted => {
                console.log(inserted);
                if (inserted?.acknowledged) {
                    toast.success('successfully updated')
                    refetch()
                    setEdit(null)
                }
            });
    }

    return (
        <div className='lg:flex lg:m-32'>
            <div className='mt-5 pl-4 text-center lg:text-left lg:flex-1'>
                <div className='my-5'>
                    <h2 className='text-3xl text-blue-900 font-bold'>{mongoUser?.name ? mongoUser?.name : user?.displayName}</h2>
                    <h4>{mongoUser?.email}</h4>
                    {mongoUser?.address && <p className='mt-2'>Address: {mongoUser?.address}</p>}
                    {mongoUser?.phone && <p className='mt-2'>Phn no: {mongoUser?.phone}</p>}

                    <button onClick={() => setEdit(mongoUser)} className="btn btn-primary my-4 px-4"><FaUserEdit className='mr-2 text-xl'></FaUserEdit> Edit Profile</button>
                </div>
            </div>
            {
                edit && <div className='lg:flex-1'>
                    <div>
                        <h2 className='text-2xl font-bold text-center'>Edit your Profile!!!!</h2>
                        <div className='mt-5'>
                            <form onSubmit={handleSubmit(onSubmit)} className=' grid grid-cols-1 gap-3 justify-items-center'>

                                <div className="form-control w-full max-w-xs text-center">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Enter your name" className="input input-bordered w-full max-w-xs"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: 'Name is required'
                                            }
                                        })} />

                                    <label className="label">
                                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>}
                                    </label>

                                </div>
                                <div className="form-control w-full max-w-xs text-center">
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <input type="text" placeholder="Enter your address" className="input input-bordered w-full max-w-xs"
                                        {...register("address", {
                                            required: {
                                                value: true,
                                                message: 'address is required'
                                            }
                                        })} />

                                    <label className="label">
                                        {errors.address?.type === 'required' && <span className="label-text-alt text-red-600">{errors.address.message}</span>}
                                    </label>

                                </div>
                                <div className="form-control w-full max-w-xs text-center">
                                    <label className="label">
                                        <span className="label-text">Phone</span>
                                    </label>
                                    <input type="number" placeholder="Enter your phone number" className="input input-bordered w-full max-w-xs"
                                        {...register("phn", {
                                            required: {
                                                value: true,
                                                message: 'Provide your phn no.'
                                            }
                                        })} />

                                    <label className="label">
                                        {errors.phn?.type === 'required' && <span className="label-text-alt text-red-600">{errors.phn.message}</span>}
                                    </label>

                                </div>

                                <input className='btn  text-white uppercase font-bold  w-full max-w-xs' value='Add' type="submit" />

                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};


export default Profile;