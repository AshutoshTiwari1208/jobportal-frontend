import React, { Component } from 'react'
import { Card,
Button,
Pagination
} from 'antd';
import { connect } from 'react-redux';
import {allJobsByRecruiter} from "../redux/actions/jobs";
import { Link } from 'react-router-dom'






class PostedJobList extends Component {

    state = {
        list: [],
        isApplied:false,
        page:1,
        limit:6,
    }

componentDidMount() {
    const pagination={
        page: this.state.page,
        limit:this.state.limit
    }
    this.props.allJobsByRecruiter(pagination).then(response=>{
        this.setState({//check what coming inside list
            list:response.results,
            total:response.metadata.count,
            list:response.results
        })
    })
}

onChange = page => {
    console.log("PAGE CLICKED ::::",page);
    const pagination={
        page: page,
        limit:this.state.limit
    }
    this.props.allJobsByRecruiter(pagination).then(response=>{
        console.log("$$$$$$$$$$$$",response);
        this.setState({//set state will render the view again..
            total:response.metadata.count,
            list:response.results
        });
    })
  };
   



    render(){
        const {list}=this.state //got list form inside current state
        if(list.length<1){
            return(
                <h2><center>No Jobs Published!</center></h2>
            )
        }
        return(
            <React.Fragment>
            {
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
            }
            <Pagination onChange={this.onChange} total={this.state.total} pageSize={this.state.limit}/>   
            </React.Fragment>
        )
    }  
}



export default connect(null,{allJobsByRecruiter})(PostedJobList);

