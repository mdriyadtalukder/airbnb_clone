"use client";

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
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setLoading] = useState(false);
    const {
        register, handleSubmit, formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                setLoading(false);
                if (callback?.ok) {
                    toast.success('Logged in!');
                    router.refresh();
                    loginModal.onClose();
                }
                if (callback?.error) {
                    toast.error('Callback error!')
                }
            })

    }
    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();

    }, [loginModal, registerModal])
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back"
                subtitle="Login to your account"
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
            {/* <Button
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

            </Button> */}
            <div className=" text-neutral-500 text-center mt-4 font-light">
                <div className="flex text-center justify-center flex-row items-center gap-2 ">
                    <div>
                        First time using Arbnb?
                    </div>
                    <div onClick={toggle} className="cursor-pointer text-neutral-800 hover:underline">
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modals disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        >

        </Modals>
    );
};

export default LoginModal;