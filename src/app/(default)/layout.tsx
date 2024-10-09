import PageContainer from "@/ui/components/page-container/PageContainer";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PageContainer>
            {children}
        </PageContainer>
    );
}
