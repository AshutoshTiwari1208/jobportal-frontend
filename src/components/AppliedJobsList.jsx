import React, { Component } from 'react'
import { Card,
Button,
Icon,
Pagination} from 'antd';
import { connect } from 'react-redux';
import {appliedjobslist} from "../redux/actions/jobs";


class AppliedJobsList extends Component {

    state = {
        list: [],
         page:1,
        limit:6,
    }

componentDidMount() {
    const pagination={
        page: this.state.page,
        limit:this.state.limit
    }
    this.props.appliedjobslist(pagination).then(response=>{

        this.setState({//set state will render the view again..
        list: response.results,
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
    this.props.appliedjobslist(pagination).then(response=>{
        console.log("$$$$$$$$$$$$",response);
        this.setState({//set state will render the view again..
            total:response.metadata.count,
            list:response.results
        });
    })
  };




        

    render() {
        const { list } = this.state
        if(list.length<1){
            return(
                <h2><center>You have not applied to any Job !!</center></h2>
            )
        }
        return (
            <React.Fragment>
            {

            list.map(jobs=>{
              return (
                <Card style={{ width: 300 }}>
                <p>{jobs.job_title}</p>
                <p>{jobs.job_description}</p>
                <p>{jobs.uuid}</p>
                </Card>
              ) 
            })
        }
        <Pagination onChange={this.onChange} total={this.state.total} pageSize={this.state.limit}/>
        </React.Fragment>
        );
    }
}

export default connect(null, {appliedjobslist}) (AppliedJobsList);//take then send

