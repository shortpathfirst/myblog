
type Props = {
    children: string;
};

export function StepTitle({ children }: Props) {
    return (
        <div>
            <div style={{ "fontSize": "20px", "textTransform": "uppercase", "marginBottom": "15px" }}> {children}</div>
            <hr></hr>
        </div>
    );
}
