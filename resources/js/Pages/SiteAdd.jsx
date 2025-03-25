import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function SiteList() {
    const { data, setData, post, processing, errors, reset } = useForm({
        url: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("sites.create"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between  gap-6">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Add Site
                    </h2>
                    <Link
                        href={route("sites.list")}
                        variant="outline"
                        className="inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors"
                    >
                        Dashboard
                    </Link>
                </div>
            }
        >
            <>
                <Head title="Add Site" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="mb-10 mx-10 overflow-hidden bg-white shadow-sm rounded-lg">
                            <div className="flex items-center width-full p-6">
                                <form onSubmit={submit}>
                                    <div>
                                        <InputLabel
                                            htmlFor="url"
                                            value="Site URL"
                                        />

                                        <TextInput
                                            id="url"
                                            name="url"
                                            value={data.url}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("url", e.target.value)
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.url}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4 flex items-center justify-end">
                                        <Link
                                            href={route("sites.list")}
                                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Cancel
                                        </Link>

                                        <PrimaryButton
                                            className="ms-4"
                                            disabled={processing}
                                        >
                                            Register
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AuthenticatedLayout>
    );
}
