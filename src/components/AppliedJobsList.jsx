import React, { Component } from 'react'
import { Card,
Button,
Icon,
Pagination,
Spin} from 'antd';
import { connect } from 'react-redux';
import {appliedjobslist} from "../redux/actions/jobs";


class AppliedJobsList extends Component {

    state = {
        list: [],
         page:1,
        limit:6,
        loading:true
    }

componentDidMount() {
    const pagination={
        page: this.state.page,
        limit:this.state.limit
    }
    this.props.appliedjobslist(pagination).then(response=>{

        this.setState({//set state will render the view again..
        total:response.metadata.count,
        list:response.data,
        loading:false
        })
    })
}


onChange = page => {
    console.log("PAGE CLICKED ::::",page);
    const pagination={
        page: page,
        limit:this.state.limit
    }
    this.props.appliedjobslist(pagination).then(response=>{
        console.log("$$$$$$$$$$$$",response);
        this.setState({//set state will render the view again..
            total:response.metadata.count,
            list:response.data
        });
    })
  };

        

    render() {
        const { list,loading } = this.state
        if(loading){
            return(
           <center><Spin /></center>
            )
        }
        if(list.length<1){
            return(
                <h3><center>You have not applied to any Job !!</center></h3>
            )
        }
        return (
            <React.Fragment>
            {
            list.map(jobs=>{
              return (
                <div className="cards">
                <Card title={jobs.job_title}>{jobs.job_description}<br/>ID :{jobs.id}<hr/>{jobs.companyname}</Card>
               </div>
              ) 
            })
        }
        <Pagination  className="paginationblock" onChange={this.onChange} total={this.state.total} pageSize={this.state.limit}/>
        </React.Fragment>
        );
    }
}

export default connect(null, {appliedjobslist}) (AppliedJobsList);//take then send