import React, { Component } from 'react'
import { Card,
Button,
} from 'antd';
import { connect } from 'react-redux';
import {allJobsByRecruiter} from "../redux/actions/jobs";
import { Link } from 'react-router-dom'






class PostedJobList extends Component {

    state = {
        list: [],
        isApplied:false,
    }

componentDidMount() {
    this.props.allJobsByRecruiter().then(response=>{
        this.setState({//check what coming inside list
            list:response.results
        })
    })
}
   



    render(){
        const {list}=this.state //got list form inside current state
        return(
            list.map(jobs=>{
                let linkto="/recruiter/jobs/"+jobs.uuid;
                return(
                    <Card style={{ width: 300 }}>
                    <p>{jobs.job_title}</p>
                    <p>{jobs.job_description}</p>
                    <p>{jobs.uuid}</p>
                    <Link to={linkto}>View Applications</Link>
                    </Card>
                )

            })
        )
    }  
}

const mapStateToProps=(state)=>{//Dont need it !!
    return ({
        userData:state
    })
}

export default connect(mapStateToProps,{allJobsByRecruiter})(PostedJobList);

