import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userInfo = await authService.getCurrentUser();
                if (userInfo) dispatch(login(userInfo));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f5f1e6] text-[#3b3029] font-['Georgia',serif]">
            <div className="mx-auto w-full max-w-lg bg-[#fcf8f2] rounded-xl p-10 border border-[#cdbca5] shadow-[4px_4px_0_#d4c4aa]">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight tracking-wide text-[#4b3f34]">
                    📝 Sign up for a new chapter
                </h2>

                <p className="mt-2 text-center text-sm text-[#6d6157]">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-[#8c6239] font-medium hover:underline"
                    >
                        Sign in
                    </Link>
                </p>

                {error && (
                    <p className="text-red-600 mt-6 text-center italic font-semibold">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="space-y-6">
                        <Input
                            label="🧑 Full Name:"
                            placeholder="John Doe"
                            className="bg-[#fffefb]"
                            {...register("name", { required: true })}
                        />

                        <Input
                            label="📧 Email:"
                            placeholder="e.g. johndoe@example.com"
                            type="email"
                            className="bg-[#fffefb]"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be valid",
                                },
                            })}
                        />

                        <Input
                            label="🔒 Password:"
                            type="password"
                            placeholder="••••••••"
                            className="bg-[#fffefb]"
                            {...register("password", { required: true })}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-[#8c6239] hover:bg-[#7a5432] text-white tracking-wide shadow-md cursor-pointer"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
