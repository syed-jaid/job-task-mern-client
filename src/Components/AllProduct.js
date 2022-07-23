import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiDeleteOutline } from 'react-icons/ti';
import { useQuery } from 'react-query';
import Loading from './Loading';

const AllProduct = () => {
    const navigate = useNavigate();
    const navigateProduct = id => {
        navigate(`/update/${id}`)
    }
    const { data: products, isLoading, refetch } = useQuery("products", () => fetch(`https://peaceful-anchorage-00739.herokuapp.com/product`, {
        method: 'GET'
    }).then(res => res.json())
    );

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleDelete = id => {
        fetch(`https://peaceful-anchorage-00739.herokuapp.com/product/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch()
            })
    }
    return (
        <div className='mt-5 lg:mx-20'>

            <h2>Food:</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    products.filter(product => product.category.includes('food')).map(product =>
                        <div className="card lg:w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title flex justify-between">Product Name : {product.name} <span className='text-red-600' onClick={() => handleDelete(product._id)}><TiDeleteOutline className=' text-2xl ' /></span></h2>
                                <p>Category : {product.category}</p>
                                <p>Price : {product.price} $</p>
                                <div className="card-actions justify-end">
                                    <button onClick={() => navigateProduct(product._id)} className="btn btn-primary hover:btn-secondary">Update</button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
            <h2>Cloth:</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    products.filter(product => product.category.includes('cloth')).map(product =>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title flex justify-between">Name : {product.name} <span className='text-red-600' onClick={() => handleDelete(product._id)}><TiDeleteOutline className=' text-2xl ' /></span></h2>
                                <p>Category : {product.category}</p>
                                <p>Price : {product.price} $</p>
                                <div className="card-actions justify-end">
                                    <button onClick={() => navigateProduct(product._id)} className="btn btn-primary hover:btn-secondary">Update</button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default AllProduct;