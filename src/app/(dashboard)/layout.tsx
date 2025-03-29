import type { Metadata } from "next";





export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (

        <div className="min-h-screen flex flex-col">
            {/* <Header /> */}
            <main className="flex-1">
                {children}
            </main>
        </div>


    );
}

