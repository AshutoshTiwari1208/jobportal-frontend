import React, { Component } from "react";
import Navbar from "./../components/Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import JobsList from "../components/JobsView";
import {SIGNOUT,ADMIN_DASHBOARD} from "../constants/Routes";

class JobHome extends Component {
	state = {
		initLoading: false,
		loading: false,
		data: []
	};

	render() {
		return (
			<div>
				<div>
					<Navbar text="Logout" to={SIGNOUT}/>
				</div>
				<div align="left" className="linksDivLeft">
					<Link to={ADMIN_DASHBOARD}>
						<span className="links">
							<u>Dashboard</u>
						</span>
					</Link>
				</div >
                <div className="listCards">
                    <JobsList />
                </div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		candidateData: state
	};
};

export default connect(mapStateToProps)(JobHome);
