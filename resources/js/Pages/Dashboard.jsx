import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [sites, setSites] = useState([]);
    const { userId } = usePage().props;

    useEffect(() => {
        axios
            .get("/api/sites", { withCredentials: true })
            .then((response) => {
                setSites(response.data);
            })
            .catch((error) => {
                console.error("Error fetching sites:", error.response);
            });
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard + {userId}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                        <div>
                            <h1>Sites</h1>
                            <ul>
                                {sites.map((site) => (
                                    <li key={site.id}>{site.url}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
