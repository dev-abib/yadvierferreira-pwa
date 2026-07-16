import ai from "@/app/assets/img/chat/ai.png";
import Image from "next/image";

export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between px-5 pt-6 pb-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-[#241A13] shadow-lg shadow-black justify-center rounded-[16px] h-12 w-12   ">
          <Image
            src={ai}
            alt="not found"
            width={28}
            height={24}
            className="h-10 w-10  object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[17px] font-semibold leading-tight text-text-primary">
            Brewie
          </span>
          <span className="text-[13px] leading-tight text-text-secondary">
            Your personal AI Assistant
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-online" />
        <span className="text-[13px] font-medium text-online">Active</span>
      </div>
    </header>
  );
}
