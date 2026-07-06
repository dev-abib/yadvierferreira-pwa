import { ReactNode } from "react";


const LoginCard = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        marginTop: "auto",
        width: "94%",
        maxWidth: 512,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 28,
        background: "linear-gradient(180deg, #171009 0%, #14100B 100%)",
        padding: `28px 24px `,
      }}
      className="w-auto h-auto"
    >
      {children}
    </div>
  );
};

export default LoginCard;
