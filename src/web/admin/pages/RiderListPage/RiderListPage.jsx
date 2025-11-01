import RiderTable from "./RiderListTable";


export default function RiderListPage() {
    return(
        <div className="p-2 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Rider List</h2>
            </div>
            <RiderTable/>
        </div>
    );
}