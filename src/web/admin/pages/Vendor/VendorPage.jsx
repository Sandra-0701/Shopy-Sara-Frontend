import VendorTable from "./VendorTable";

export default function VendorPage() {

    return(
        <div className="p-2 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Vendors</h2>
            </div>
            <VendorTable/>
        </div>
    );
}