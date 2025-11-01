
import { FiShoppingBag, FiUsers, FiTrendingUp, FiPackage, FiTruck } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";

export default function DashboardHome() {
  const stats = [
    {
      title: "Total Stores",
      value: "124",
      change: "+12%",
      changeType: "positive",
      icon: FiShoppingBag,
      color: "bg-yellow-500"
    },
    {
      title: "Revenue",
      value: "₹45,231",
      change: "+8.2%",
      changeType: "positive",
      icon: MdCurrencyRupee,
      color: "bg-green-500"
    },
    {
      title: "Active Users",
      value: "8,549",
      change: "+23%",
      changeType: "positive",
      icon: FiUsers,
      color: "bg-blue-500"
    },
    {
      title: "Orders",
      value: "1,893",
      change: "-3.1%",
      changeType: "negative",
      icon: FiPackage,
      color: "bg-purple-500"
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      change: "+2.4%",
      changeType: "positive",
      icon: FiTrendingUp,
      color: "bg-pink-500"
    },
    {
      title: "Deliveries",
      value: "1,654",
      change: "+18%",
      changeType: "positive",
      icon: FiTruck,
      color: "bg-indigo-500"
    }
  ];


  


  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-4 text-black">Welcome to Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-black text-xl" />
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === "positive" ? "text-green-500" : "text-red-500"
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-white text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

    </div>
  );
}