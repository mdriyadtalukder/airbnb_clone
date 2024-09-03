"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modals from "./Modals";
import Heading from "../Heading";
import Input from "../input/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setLoading] = useState(false);
    const {
        register, handleSubmit, formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((err) => {
                toast.error('Something went wrong!')

            })
            .finally(() => {
                setLoading(false)
            })
    }
    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();

    }, [loginModal, registerModal])
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb"
                subtitle="Create an account"
            >

            </Heading>
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required

            ></Input>

            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required

            ></Input>
            <Input
                id="password"
                label="Password"
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required

            ></Input>
        </div>
    )
    const footerContent = (
        <div className="flex flex-col gap-4 ml-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                Icon={FcGoogle}
                onClick={() => { signIn('google') }}
            >

            </Button>
            <Button
                outline
                label="Continue with Github"
                Icon={AiFillGithub}
                onClick={() => { signIn('github') }}
            >

            </Button>
            <div className=" text-neutral-500 text-center mt-4 font-light">
                <div className="flex text-center justify-center flex-row items-center gap-2 ">
                    <div>
                        Already have account?
                    </div>
                    <div onClick={toggle} className="cursor-pointer text-neutral-800 hover:underline">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modals disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        >

        </Modals>
    );
};

export default RegisterModal;