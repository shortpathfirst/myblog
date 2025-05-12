import { FooterMinimal } from "./FooterMinimal";
import { FooterSection } from "./FooterSection";

type Props = {
  version?: "minimal" | "normal";
}
export const Footer = ({ version = "normal" }: Props) => {

  return (
    <>
      {version == "minimal" && <FooterMinimal />}
      {version == "normal" && <FooterSection />}
    </>
  )
}
