import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import AddCustomer from "./components/Customer/AddCustomer";
import ManageCustomer from "./components/Customer/ManageCustomer";
import AddProduct from "./components/Product/AddProduct";
import Manageproduct from "./components/Product/ManageProduct";
import AddCompany from "./components/Company/AddCompanyInfo";
import ManageCompany from "./components/Company/ManageCompany";
import AddPayment from "./components/Payment/AppPayment";
import ManagePayment from "./components/Payment/ManagePayment";
import AddInvoice from "./components/Invoice/AddInvoice";
import InvoiceTable from "./components/Invoice/ManageInvoice";
import Index from "./components/Common/Index";

function App() {
	const user = localStorage.getItem("token");

	return (
		<div>
			<Routes>
			<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
			</Routes>

			<Main />
			<Routes>
				{user && <Route path="/" exact element={<Main />} />}
				
				<Route path="/" element={<Navigate replace to="/login" />} />
				<Route path="/addCustomer" element={<AddCustomer />} />
				<Route path="/manageCustomer" element={<ManageCustomer />} />
				<Route path="/addProduct" element={<AddProduct></AddProduct>} />
				<Route path="/manageProduct" element={<Manageproduct></Manageproduct>}/>
				<Route path="/addCompany" element={<AddCompany></AddCompany>}/>
				<Route path="/manageCompany" element={<ManageCompany></ManageCompany>}/>
				<Route path="/addPayment" element={<AddPayment></AddPayment>}/>
				<Route path="/managePayment" element={<ManagePayment/>}/>
				<Route path="/addInvoice" element={<AddInvoice/>}/>
				<Route path="/displayInvoice" element={<InvoiceTable></InvoiceTable>}/>
				<Route path="/index" element={<Index/>} />
			</Routes>
		</div>
	);
}

export default App;
