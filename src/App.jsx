
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './web/user/HomePage';
import StorePage from './web/user/StorePage';
import DashboardLayout from './web/admin/layouts/DashboardLayout';
import DashboardHome from './web/admin/pages/DashboardHome';
import ProductPage from './web/admin/pages/ProductPage/ProductPage';
import CategoryPage from './web/admin/pages/CategoryPage/CategoryPage';
import SubCategoryPage from './web/admin/pages/SubCategoryPage/SubCategoryPage';
import VendorPage from './web/admin/pages/Vendor/VendorPage';
import RiderListPage from './web/admin/pages/RiderListPage/RiderListPage';
import AgentPage from './web/admin/pages/Agent/AgentPage';
import DistrictPanchayathPage from './web/admin/pages/DistrictPanchayath/DistrictPanchayathPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stores" element={<StorePage/>} /> 

        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="subcategory" element={<SubCategoryPage />} />
          <Route path="vendor" element={<VendorPage/>} />
          <Route path="agent" element={<AgentPage/>}/>
          <Route path="master/district-panjayath" element={<DistrictPanchayathPage/>}/>
          <Route path="rider-list" element={<RiderListPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );

  
}

export default App;
