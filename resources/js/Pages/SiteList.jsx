import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
    const { sites } = usePage().props;

    const getStatusClass = (status) => {
        switch (status) {
            case "connected":
                return "bg-emerald-400";
            case "disconnected":
                return "bg-rose-400";
            default:
                return "bg-amber-300";
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    SiteList
                </h2>
            }
        >
            <Head title="SiteList" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1>Sites</h1>
                            {sites.length > 0 ? (
                                <div class="relative overflow-x-auto">
                                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 sm:rounded-lg">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    Site
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-center"
                                                >
                                                    Plugins
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-center"
                                                >
                                                    Themes
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-center"
                                                >
                                                    Connected
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-center"
                                                >
                                                    Recheck
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sites.map((site) => (
                                                <React.Fragment key={site.id}>
                                                    <tr class="border-b border-gray-200">
                                                        <th
                                                            scope="row"
                                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                        >
                                                            {site.pretty_url}
                                                        </th>
                                                        <td class="px-6 py-4 text-center">
                                                            X
                                                        </td>
                                                        <td class="px-6 py-4 text-center">
                                                            X
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <div class="flex items-center">
                                                                <div
                                                                    className={`inline-block w-4 h-4 mx-auto rounded-full ${getStatusClass(
                                                                        site.connection_status
                                                                    )}`}
                                                                    title={
                                                                        site.connection_status
                                                                    }
                                                                ></div>
                                                                <span class="sr-only">
                                                                    {
                                                                        site.connection_status
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 text-center">
                                                            <ArrowPathIcon className="size-5 text-blue-500 mx-auto" />
                                                        </td>
                                                    </tr>
                                                    <tr class="border-b border-gray-200">
                                                        <td
                                                            colSpan="5"
                                                            class="pl-4"
                                                        >
                                                            {site
                                                                .site_extensions
                                                                .length > 0 ? (
                                                                <table class="w-full">
                                                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                                                        <tr>
                                                                            <th
                                                                                scope="col"
                                                                                class="px-6 py-3"
                                                                            >
                                                                                Type
                                                                            </th>
                                                                            <th
                                                                                scope="col"
                                                                                class="px-6 py-3"
                                                                            >
                                                                                Name
                                                                            </th>
                                                                            <th
                                                                                scope="col"
                                                                                class="px-6 py-3"
                                                                            >
                                                                                Needs
                                                                                Update
                                                                            </th>
                                                                            <th
                                                                                scope="col"
                                                                                class="px-6 py-3"
                                                                            >
                                                                                Action
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {site.site_extensions.map(
                                                                            (
                                                                                site_extension
                                                                            ) => (
                                                                                <tr>
                                                                                    {console.log(
                                                                                        site_extension
                                                                                    )}
                                                                                    <td class="px-6 py-4 text-sm text-gray-700">
                                                                                        {
                                                                                            site_extension.type
                                                                                        }
                                                                                    </td>
                                                                                    <td class="px-6 py-4 text-sm text-gray-700">
                                                                                        {
                                                                                            site_extension.name
                                                                                        }
                                                                                    </td>
                                                                                    <td class="px-6 py-4 text-sm text-gray-700">
                                                                                        {
                                                                                            site_extension.needs_update
                                                                                        }
                                                                                    </td>
                                                                                    <td class="px-6 py-4 text-sm text-gray-500">
                                                                                        View
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        )}
                                                                    </tbody>
                                                                </table>
                                                            ) : (
                                                                <div>
                                                                    No plugins
                                                                    or themes
                                                                    found.
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div>No sites found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
