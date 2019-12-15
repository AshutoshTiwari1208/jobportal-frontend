import React, { Component } from 'react'
import { Card,
Button,
Icon} from 'antd';
import {applyForJob, availablejobs} from "../redux/actions/jobs";
import { connect } from 'react-redux';

class JobsList extends Component {


    state = {
        list: [],
        isApplied:false,
    }

componentDidMount() {
    console.log("#########",this.props.id);
    this.props.availablejobs(this.props.id).then(response=>{
        this.setState({//set state will render the view again..
        list: response.results
        })
    })
}


    applyToJob=(e,jobUuid)=>{
        
        e.preventDefault();

        let jobDetails= this.props.applyForJob(jobUuid).then(data=>{
            const updatedJobs = this.state.list.map(job=>{
                return job.uuid === jobUuid ? 
                {
                    ...job, isApplied: true
                } : 
                job
            })
            this.setState({
                list: updatedJobs
            })
        });

    }

        

    render() {
        const { list } = this.state
        return (
            list.map(item=>{
              return (
                <Card style={{ width: 300 }} hoverable>
                <title>{item.job_title}</title>
                <p>{item.job_description}</p>
                <Button onClick={(e) => this.applyToJob(e,item.uuid)} disabled={item.isApplied}>Apply</Button>
                </Card>
              ) 
            })
        );
    }
}

const mapStateToProps=(state)=>{
    return ({
        userData:state
    })
}



export default connect(mapStateToProps, {applyForJob, availablejobs}) (JobsList);//take then send

