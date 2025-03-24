import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SiteAccordion from "@/Components/SiteAccordion";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { sites } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    SiteList
                </h2>
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
