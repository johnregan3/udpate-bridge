import { Head, Link, usePage } from "@inertiajs/react";
import { Container } from "@/Components/Container";
import { Logo } from "@/Components/Logo";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    return (
        <>
            <header>
                <nav>
                    <Container className="relative z-50 flex justify-between py-8">
                        <div className="relative z-10 flex items-center gap-16">
                            <Link href="/" aria-label="Home">
                                <h1 className="text-center font-bold text-xl">
                                    SiteBridge
                                </h1>
                            </Link>
                        </div>
                        <div className="flex items-center gap-6">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Link>
                        </div>
                    </Container>
                </nav>
            </header>

            <div className="min-h-screen bg-gray-100">
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main>{children}</main>
            </div>
        </>
    );
}
