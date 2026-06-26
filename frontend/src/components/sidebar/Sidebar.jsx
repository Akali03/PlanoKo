import { LayoutGrid, Circle, CheckCircle2, Star, X } from "lucide-react";

function Sidebar({ tasks = [], activeView, onViewChange, isOpen, onClose }) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const highPriority = tasks.filter(t => t.priority === "high").length;
    const urgent = tasks.filter(t => t.priority === "high" && !t.completed).length;
    const today = tasks.filter(t => t.dueToday && !t.completed).length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    const views = [
        { key: "all", label: "All Tasks", icon: LayoutGrid, count: total },
        { key: "active", label: "Active", icon: Circle, count: active },
        { key: "completed", label: "Completed", icon: CheckCircle2, count: completed },
        { key: "high", label: "High Priority", icon: Star, count: highPriority },
    ];

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed md:static z-30 top-0 left-0 h-full md:h-screen
                w-64 bg-[#0b0b12] text-slate-200 flex flex-col px-4 py-6 border-r border-white/5
                transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                <div className="flex items-center justify-between md:hidden mb-4">
                    <span className="text-sm font-bold text-slate-300">Menu</span>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <X size={18} />
                    </button>
                </div>

                <div className="mb-8">
                    <p className="text-xs font-semibold tracking-wider text-slate-500 mb-3 px-2">VIEWS</p>
                    <nav className="space-y-1">
                        {views.map(({ key, label, icon: Icon, count }) => {
                            const isActive = activeView === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => { onViewChange?.(key); onClose?.(); }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                                        isActive
                                            ? "bg-violet-600/20 text-violet-300 font-medium"
                                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                    }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <Icon size={16} strokeWidth={2} className={isActive ? "text-violet-400" : "text-slate-500"} />
                                        {label}
                                    </span>
                                    <span className={`text-xs font-semibold px-1.5 ${isActive ? "text-violet-300" : "text-slate-500"}`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="border-t border-white/5 pt-6 mt-auto">
                    <p className="text-xs font-semibold tracking-wider text-slate-500 mb-3 px-2">STATS</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <StatCard label="Total" value={total} />
                        <StatCard label="Done" value={completed} />
                        <StatCard label="Urgent" value={urgent} />
                        <StatCard label="Today" value={today} />
                    </div>
                    <div className="px-1">
                        <div className="flex items-center justify-between text-xs mb-2">
                            <span className="text-slate-500 font-medium">Progress</span>
                            <span className="text-violet-400 font-semibold">{progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-violet-500 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

function StatCard({ label, value }) {
    return (
        <div className="bg-white/[0.03] rounded-xl px-4 py-3">
            <p className="text-xl font-bold text-white leading-none mb-1">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
        </div>
    );
}

export default Sidebar;
