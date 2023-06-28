import "./globals.css";


export const metadata = {
    title: "Flexibble",
    description: "Showcase and discover remarkable developer projects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>

                <main>
                    {children}
                </main>

            </body>
        </html>
    );
}