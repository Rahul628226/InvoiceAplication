import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

export default function Main() {
	const [customerOptionsVisible, setCustomerOptionsVisible] = React.useState(false);

	const handleCustomerClick = () => {
		setCustomerOptionsVisible(!customerOptionsVisible);
	};

	const [ProductOptionsVisible, setproductOptionsVisible] = React.useState(false);

	const handleProductClick = () => {
		setproductOptionsVisible(!ProductOptionsVisible);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [InvoiceOptionsVisible, setinvoiceOptionsVisible] = React.useState(false);

	const handleInvoiceClick = () => {
		setinvoiceOptionsVisible(!InvoiceOptionsVisible);
	};



	const [SettingsOptionsVisible, setsettingsOptionsVisible] = React.useState(false);

	const handlesettingsClick = () => {
		setsettingsOptionsVisible(!SettingsOptionsVisible);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
			>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						Permanent drawer
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar />
				<Divider />
				<List>
					<ListItem disablePadding onClick={handleCustomerClick}>
						<ListItemButton>
							<ListItemIcon>
								<AccountCircleIcon />
							</ListItemIcon>
							<ListItemText primary="Customer" />
						</ListItemButton>
					</ListItem>
					{customerOptionsVisible && (
						<>
							<ListItem disablePadding>
								<Link to="/manageCustomer" style={{ textDecoration: 'none', color: 'inherit' }}>
									<ListItemButton>
										<ListItemIcon>
											<GroupIcon />
										</ListItemIcon>
										<ListItemText primary="Manage Customer" />
									</ListItemButton>
								</Link>
							</ListItem>

							<ListItem disablePadding>
								<Link to="/addCustomer" style={{ textDecoration: 'none', color: 'inherit' }}>
									<ListItemButton>
										<ListItemIcon>
											<AddIcon />
										</ListItemIcon>
										<ListItemText primary="Add Customer" />
									</ListItemButton>
								</Link>
							</ListItem>
						</>
					)}

					<ListItem disablePadding onClick={handleProductClick}>
						<ListItemButton>
							<ListItemIcon>
								<CategoryRoundedIcon></CategoryRoundedIcon>
							</ListItemIcon>
							<ListItemText primary="Product" />
						</ListItemButton>
					</ListItem>
					{ProductOptionsVisible && (
						<>
							<ListItem disablePadding>
								<Link to="/manageProduct" style={{ textDecoration: 'none', color: 'inherit' }}>
									<ListItemButton>
										<ListItemIcon>
											<ProductionQuantityLimitsOutlinedIcon />
										</ListItemIcon>
										<ListItemText primary="Manage Product" />
									</ListItemButton>
								</Link>
							</ListItem>

							<ListItem disablePadding>
								<Link to="/addProduct" style={{ textDecoration: 'none', color: 'inherit' }}>
									<ListItemButton>
										<ListItemIcon>
											<AddIcon />
										</ListItemIcon>
										<ListItemText primary="Add Product" />
									</ListItemButton>
								</Link>
							</ListItem>
							<ListItem disablePadding>
								<Link to="/index" style={{ textDecoration: 'none', color: 'inherit' }}>
									<ListItemButton>
										<ListItemIcon>
											<AddIcon />
										</ListItemIcon>
										<ListItemText primary="Add Product" />
									</ListItemButton>
								</Link>
							</ListItem>
						</>
					)}


					<ListItem disablePadding onClick={handleInvoiceClick}>
						<ListItemButton>
							<ListItemIcon>
								<DescriptionIcon></DescriptionIcon>
							</ListItemIcon>
							<ListItemText primary="Invoice" />
						</ListItemButton>
					</ListItem>
					{InvoiceOptionsVisible && (
						<>
							<ListItem disablePadding>
								<Link to="/displayInvoice" style={{ textDecoration: 'none', color: 'inherit' }}>
									<ListItemButton>
										<ListItemIcon>
											<FileCopyOutlinedIcon/>
										</ListItemIcon>
										<ListItemText primary="Manage Invoice" />
									</ListItemButton>
								</Link>
							</ListItem>

							<ListItem disablePadding>
								<Link to="/addInvoice" style={{ textDecoration: 'none', color: 'inherit' }}>
									<ListItemButton>
										<ListItemIcon>
											<AddIcon />
										</ListItemIcon>
										<ListItemText primary="Add Invoice" />
									</ListItemButton>
								</Link>
							</ListItem>
						</>
					)}






<ListItem disablePadding onClick={handlesettingsClick}>
						<ListItemButton>
							<ListItemIcon>
								<SettingsIcon></SettingsIcon>
							</ListItemIcon>
							<ListItemText primary="Setting" />
						</ListItemButton>
					</ListItem>
					{SettingsOptionsVisible && (
						<>
							<ListItem disablePadding>
								<Link to="/manageCompany" style={{ textDecoration: 'none', color: 'inherit' }}>
									<ListItemButton>
										<ListItemIcon>
											<PaidOutlinedIcon/>
										</ListItemIcon>
										<ListItemText primary="Tax" />
									</ListItemButton>
								</Link>
							</ListItem>

							<ListItem disablePadding>
								<Link to="/manageCompany" style={{ textDecoration: 'none', color: 'inherit' }}>
									<ListItemButton>
										<ListItemIcon>
											<BusinessIcon />
										</ListItemIcon>
										<ListItemText primary="Company" />
									</ListItemButton>
								</Link>
							</ListItem>
						</>
					)}



				</List>
				<Divider />
				<List sx={{ marginTop: 'auto' }}>
					<ListItem disablePadding>
						<ListItemButton onClick={handleLogout}>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Box
				component="main"
				sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
			>
				<Toolbar />

			</Box>
		</Box>
	);
}
