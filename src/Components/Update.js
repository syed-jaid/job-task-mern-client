import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    // const [product, setProduct] = useState({});
    // useEffect(() => {
    //     const url = `https://peaceful-anchorage-00739.herokuapp.com/product/${id}`
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => setProduct(data));
    // }, [id]);
    const onSubmit = data => {
        console.log(data);
        fetch(`https://peaceful-anchorage-00739.herokuapp.com/product/${id}`, {
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
                    navigate('/all')
                }
            });
    }
    return (
        <div>
            <h2 className='text-3xl text-blue-800 font-bold text-center mt-5'>Update Product!!!!</h2>
            <div className='mt-5'>
                <form onSubmit={handleSubmit(onSubmit)} className=' grid grid-cols-1 gap-3 justify-items-center'>

                    <div className="form-control w-full max-w-xs text-center">
                        <input type="text" placeholder="Enter product name" className="input input-bordered w-full max-w-xs"
                            {...register("name")} />
                    </div>

                    <div className="form-control w-full max-w-xs text-center">
                        <input type="text" placeholder="product price" className="input input-bordered w-full max-w-xs"
                            {...register("price")} />
                    </div>

                    <input className='btn  text-white uppercase font-bold  w-full max-w-xs' value='Add' type="submit" />

                </form>
            </div>
        </div>
    );
};

export default Update;