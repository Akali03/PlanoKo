import { useState } from "react";
import { Sparkles, MessageSquare, ChevronUp, ChevronDown } from "lucide-react";

function RightSidebar() {
    const [activeTab, setActiveTab] = useState("summary");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* mobile bottom sheet toggle */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-20">
                <button
                    onClick={() => setIsOpen(p => !p)}
                    className="w-full flex items-center justify-center gap-2 bg-[#0b0b12] border-t border-white/10 py-3 text-sm text-slate-300 font-medium"
                >
                    {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                    {activeTab === "summary" ? "Summary" : "Assistant"}
                </button>

                {isOpen && (
                    <div className="bg-[#0b0b12] border-t border-white/5 px-4 py-4 max-h-64 overflow-y-auto">
                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                        <Content activeTab={activeTab} />
                    </div>
                )}
            </div>

            {/* desktop sidebar */}
            <aside className="hidden md:flex flex-col flex-1 h-screen bg-[#0b0b12] max-w-sm border-l border-white/5">
                <div className="h-10 flex items-center justify-center gap-10 p-1 border-b border-white/5">
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                    <Content activeTab={activeTab} />
                </div>
            </aside>
        </>
    );
}

function Tabs({ activeTab, setActiveTab }) {
    return (
        <div className="flex items-center gap-6">
            <button
                onClick={() => setActiveTab("summary")}
                className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-bold ${activeTab === "summary" ? "bg-main text-white" : "text-slate-400"}`}
            >
                <Sparkles size={14} /> Summary
            </button>
            <button
                onClick={() => setActiveTab("assistant")}
                className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-bold ${activeTab === "assistant" ? "bg-main text-white" : "text-slate-400"}`}
            >
                <MessageSquare size={14} /> Assistant
            </button>
        </div>
    );
}

function Content({ activeTab }) {
    return activeTab === "summary" ? (
        <div>
            <h2 className="font-semibold text-lg text-white">Summary</h2>
            <p className="text-slate-400 text-sm mt-1">This is the Summary content.</p>
        </div>
    ) : (
        <div>
            <h2 className="font-semibold text-lg text-white">Assistant</h2>
            <p className="text-slate-400 text-sm mt-1">This is the Assistant content.</p>
        </div>
    );
}

export default RightSidebar;
