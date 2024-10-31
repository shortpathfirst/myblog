export default function Title({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <h1 style={{
            "color":"#3D3D3D",
            "paddingTop":"1rem",
            "paddingBottom":"1rem",
            "marginBottom":"1.5rem",
            "fontWeight":800,
            "textAlign":"center",
            "textDecoration":"underline",
            "textDecorationColor":"teal",
            "textDecorationThickness":"3px",
            "textUnderlineOffset":"14px"
            }}>
            {children}
        </h1>
    );
}
