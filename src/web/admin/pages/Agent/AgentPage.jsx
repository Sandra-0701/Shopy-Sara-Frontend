import AgentTable from "./AgentTable";


export default function AgentPage() {

    return(
        <div className="p-2 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Agents</h2>
            </div>
            <AgentTable/>
        </div>
    );
}