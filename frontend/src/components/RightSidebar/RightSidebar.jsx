import { useState } from "react";
import { Sparkles, MessageSquare, ChevronUp, ChevronDown } from "lucide-react";
import { summarizeTasks } from "../../api/task.api";

function RightSidebar() {
    const [activeTab, setActiveTab] = useState("summary");
    const [isOpen, setIsOpen] = useState(false);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

        const fetchSummary = async () => {
            try {
                setLoading(true);
                const summaryData = await summarizeTasks();
                console.log("Summary data fetched:", summaryData.summary);
         
                setSummary(summaryData.summary.content);
            } catch (err) {
                console.error("Failed to fetch summary:", err);
            }finally {
                setLoading(false);
            }
        }



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
                        <Content activeTab={activeTab} loading={loading} summary={summary} fetchSummary={fetchSummary}/>
                    </div>
                )}
            </div>

            {/* desktop sidebar */}
            <aside className="hidden md:flex flex-col flex-1 h-screen bg-[#0b0b12] max-w-sm border-l border-white/5">
                <div className="h-10 flex items-center justify-center gap-10 p-1 border-b border-white/5">
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                    <Content activeTab={activeTab} loading={loading} summary={summary} fetchSummary={fetchSummary} />
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

function Content({ activeTab, loading, summary, fetchSummary }) {
   return activeTab === "summary" ? (
    <div className="space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-lg font-semibold text-white">
                    AI Summary
                </h2>
                <p className="text-xs text-slate-500">
                    Get a quick overview of your tasks.
                </p>
            </div>

            <button
                onClick={fetchSummary}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Sparkles size={16} />

                {loading
                    ? "Generating..."
                    : summary
                    ? "Refresh"
                    : "Generate"}
            </button>
        </div>

        {/* Summary Card */}
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 min-h-[220px]">

            {loading ? (
                <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-slate-400 animate-pulse">
                        ✨ Generating your AI summary...
                    </p>
                </div>
            ) : summary ? (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-violet-400">
                        <Sparkles size={18} />
                        <span className="font-medium">
                            AI Recommendation
                        </span>
                    </div>

                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                        {summary}
                    </p>
                </div>
            ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                    <Sparkles
                        size={40}
                        className="mb-3 text-slate-600"
                    />

                    <h3 className="text-white font-medium">
                        No summary yet
                    </h3>

                    <p className="mt-2 text-sm text-slate-500 max-w-xs">
                        Click <strong>Generate</strong> to let AI analyze your
                        tasks and recommend what you should work on first.
                    </p>
                </div>
            )}

        </div>

    </div>
    ) : (
        <div>
            <h2 className="font-semibold text-lg text-white">Assistant</h2>
            <p className="text-slate-400 text-sm mt-1">This is the Assistant content.</p>
        </div>
    );
}

export default RightSidebar;
