import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className=' mt-8'>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content text-center">
                    <div class="max-w-md">
                        <h1 class="text-5xl font-bold">Inventory Management System</h1>
                        <p class="py-6">An inventory management system combines varying software packages to track stock levels and stock movements. The solution can integrate with multichannel sales systems or shipping systems.</p>
                        <button class="btn btn-primary"><Link to='/login'></Link> Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;