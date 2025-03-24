import React, { useState } from "react";
import {
    ArrowPathIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@/Components/Button";

const Accordion = ({ site }) => {
    const [isActive, setIsActive] = useState(false);

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

    const HighlightHost = ({ url }) => {
        try {
            const formattedUrl = url.startsWith("http")
                ? url
                : `https://${url}`;
            const parsedUrl = new URL(formattedUrl); // Parse the URL
            const host = parsedUrl.host; // Get the hostname (e.g., example.com)
            const path = parsedUrl.pathname + parsedUrl.search; // Get the path (e.g., /something?this=1)

            return (
                <span>
                    <span className="text-gray-600 font-medium">
                        {rtrimSingle(host, "/")}
                    </span>
                    <span>{rtrimSingle(path, "/")}</span>
                </span>
            );
        } catch (error) {
            return <span>Invalid URL</span>; // Handle invalid URLs
        }
    };

    function rtrimSingle(str, char) {
        while (str.endsWith(char)) {
            str = str.slice(0, -1);
        }
        return str;
    }

    return (
        <div className="accordion-item mb-10 overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="accordion-title px-6 py-2 text-gray-900">
                <div className="relative overflow-x-auto"></div>
                <div className="flex items-center width-full">
                    <div className="accordion-title">
                        <div onClick={() => setIsActive(!isActive)}>
                            {isActive ? (
                                <ChevronUpIcon className="size-5 text-gray-500 mx-auto rounded-sm hover:cursor-pointer hover:bg-gray-100" />
                            ) : (
                                <ChevronDownIcon className="size-5 text-gray-500 mx-auto rounded-sm hover:cursor-pointer hover:bg-gray-100" />
                            )}
                        </div>
                    </div>
                    <div
                        className="px-6 py-3 text-gray-400 hover:cursor-pointer max-w-[20em] truncate"
                        onClick={() => setIsActive(!isActive)}
                    >
                        <HighlightHost url={site.pretty_url} />
                    </div>
                    <div className="flex ml-auto">
                        <div className="px-6 py-3 flex items-center text-xs">
                            <span
                                style={{
                                    textTransform: "capitalize",
                                }}
                            >
                                {site.connection_status} &nbsp;
                            </span>
                            <div
                                className={`inline-block w-4 h-4 mx-auto rounded-full ${getStatusClass(
                                    site.connection_status
                                )}`}
                                title={site.connection_status}
                            ></div>
                        </div>
                        <div className="px-6 py-3">
                            <Button variant="outline">
                                <ArrowPathIcon className="size-4 text-gray-700 mx-auto mr-3 mt-1" />
                                Resync
                            </Button>
                        </div>
                        <div className="px-6 py-3">
                            <Button variant="solid" color="cyan">
                                Update All
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {isActive && (
                <div className="accordion-content mb-4 mt-2">
                    {site.site_extensions.length > 0 ? (
                        <table className="w-[calc(100%-2rem)] rounded-t-md mx-auto rounded-sm overflow-hidden">
                            <thead className="overflow-hidden text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left first:rounded-t-lg"
                                    >
                                        Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 first:rounded-t-lg"
                                    >
                                        Update
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {site.site_extensions.map((site_extension) => (
                                    <tr
                                        key={site_extension.id}
                                        className="text-sm text-gray-500 border-b border-gray-100"
                                    >
                                        <td className="px-6 py-4">
                                            {site_extension.type}
                                        </td>
                                        <td className="px-6 py-4">
                                            {site_extension.name}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {site_extension.needs_update ? (
                                                <Button
                                                    variant="solid"
                                                    color="cyan"
                                                >
                                                    Update
                                                </Button>
                                            ) : (
                                                <button
                                                    className="text-gray-500 cursor-not-allowed inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors"
                                                    disabled={true}
                                                >
                                                    Up to date
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="px-6 py-3 mb-4">
                            No plugins or themes found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Accordion;
