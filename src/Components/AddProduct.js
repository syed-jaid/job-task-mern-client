import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        console.log(data);
        fetch('https://peaceful-anchorage-00739.herokuapp.com/product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(inserted => {
                console.log(inserted);
                if (inserted.insertedId) {
                    toast.success('successfully added product')
                    reset();
                    navigate('/all')
                }
            });
    }

    return (
        <div>
            <h2 className='text-3xl text-blue-800 font-bold text-center mt-5'>Add a Product!!!!</h2>
            <div className='mt-5'>
                <form onSubmit={handleSubmit(onSubmit)} className=' grid grid-cols-1 gap-3 justify-items-center'>

                    <div className="form-control w-full max-w-xs text-center">
                        <input type="text" placeholder="Enter product name" className="input input-bordered w-full max-w-xs"
                            {...register("name")} />
                    </div>

                    <div className="form-control w-full max-w-xs text-center">
                        <input type="text" placeholder="product category" className="input input-bordered  w-full max-w-xs"
                            {...register("category")} />
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


export default AddProduct;