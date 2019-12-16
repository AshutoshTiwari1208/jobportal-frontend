import React, { Component } from 'react'
import { Card,
Button,
Pagination
} from 'antd';
import { connect } from 'react-redux';
import {recruiterDelete,allRecruiters} from "../redux/actions/recruiters";


class RecruiterList extends Component {

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
    this.props.allRecruiters(pagination).then(response=>{
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
    this.props.allRecruiters(pagination).then(response=>{
        console.log("$$$$$$$$$$$$",response);
        this.setState({//set state will render the view again..
            total:response.metadata.count,
            list:response.results
        });
    })
  };


deleteRecruiter=(e,recruiterUuid)=>{//uuid kahan se ayegi jispe click hoga
    e.preventDefault();
    let recruiterDetails=this.props.recruiterDelete(recruiterUuid).then(data=>{
        const updatedRecruiters = this.state.list.map(recruiter=>{
            return recruiter.uuid===recruiterUuid ?
            {
                ...recruiter,isApplied:true //only isApplied replace rest same.
            }:
            recruiter
        });
        this.setState({
            list:updatedRecruiters
        })
    })
}


    render(){
        const {list}=this.state //got list form inside current state
        if(list.length<1){
            return(
                <h2><center>No Recruiters present...</center></h2>
            )
        }
        return(
            <React.Fragment>
            {
            list.map(recruiter=>{
                return(
                    <Card style={{ width: 300 }}>
                    <p>{recruiter.name}</p>
                    <p>{recruiter.username}</p>
                    <p>{recruiter.uuid}</p>
                    <Button type="danger" onClick={(e) => this.deleteRecruiter(e,recruiter.uuid)} disabled={recruiter.isApplied}>Delete</Button>
                    {/* <Button type="primary" onClick={(e) => this.jobsByRecruiter(e,recruiter.uuid)} disabled={recruiter.isApplied}>Yet to Come</Button> */}
                    </Card>
                )

            })
        }
             <Pagination onChange={this.onChange} total={this.state.total} pageSize={this.state.limit}/>   
             </React.Fragment>
        )
    }  
}


export default connect(null,{allRecruiters,recruiterDelete})(RecruiterList);

