import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SiteAccordion from "@/Components/SiteAccordion";
import { Head, Link, usePage } from "@inertiajs/react";

export default function SiteList() {
    const { sites } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between  gap-6">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        My Sites
                    </h2>
                    <Link
                        href={route("sites.add")}
                        variant="outline"
                        className="inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors"
                    >
                        Add Site
                    </Link>
                </div>
            }
        >
            <>
                <Head title="SiteList" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {sites.length <= 0 ? (
                            <div>No sites found.</div>
                        ) : (
                            <>
                                {sites.map((site) => (
                                    <SiteAccordion
                                        key={site.id}
                                        site={site}
                                    ></SiteAccordion>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </>
        </AuthenticatedLayout>
    );
}
