import { useSelector } from "react-redux";

const Admin = () => {

	const totalApplications = useSelector((state) => state.applications.totalCount);
	const items = useSelector((state) => state.applications.items)


	const openApplications = items.filter(item => item.status === 'open').length
	const rejectedApplications = items.filter(item => item.status === 'rejected').length
	const acceptedApplications = items.filter(item => item.status === 'accept').length

	return <div className=" flex-col">
	
	<h1>Applications Amount: {totalApplications}</h1><br />
	<h2>Open Applications: {openApplications}</h2><br />
	<h2>Rejected Applications: {rejectedApplications}</h2>
	<h2>Accepted applications: {acceptedApplications}</h2>
	
	</div>
	
	
};

export default Admin;
