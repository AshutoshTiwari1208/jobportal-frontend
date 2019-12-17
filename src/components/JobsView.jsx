import React, { Component } from 'react'
import { Card,
Button,
Pagination,
Icon} from 'antd';
import {applyForJob, availablejobs,deleteJob,allJobs} from "../redux/actions/jobs";
import { connect } from 'react-redux';

class JobsView extends Component {


    state = {
        list: [],
        isApplied:false,
        page:1,
        limit:6,
        total: 0
    }

componentDidMount() {
    if(this.props.userData.auth.userdetails.role=="0"){
       const pagination={
            page: this.state.page,
            limit:this.state.limit
        }
        this.props.availablejobs(pagination).then(response=>{
            this.setState({//set state will render the view again..
                total:response.metadata.count,
                list:response.results
            });
        })
    }else{

        this.props.allJobs().then(response=>{
            this.setState({//set state will render the view again..
                total:response.metadata.count,
                list: response.results
            })
        });
    }
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

    delJob=(e,jobUuid)=>{
        e.preventDefault();
        let jobDetails=this.props.deleteJob(jobUuid).then(data=>{
            const updatedJobs=this.state.list.map(job=>{
                return job.uuid===jobUuid ?
                {
                    ...job, isApplied:true
                }:
                job
            })
            this.setState({
                list:updatedJobs
            })
        })
    }

    //PAGINATE HERE.....
    onChange = page => {
        const pagination={
            page: page,
            limit:this.state.limit
        }
        this.props.availablejobs(pagination).then(response=>{
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
                <h2><center>No Jobs Published So far...</center></h2>
            )
        }

        return (
            <React.Fragment>
                <h2 align="center">LIST OF JOBS</h2>
                {
                this.props.userData.auth.userdetails.role=="0" ? (
                    list.map(item=>{
                        return (
                            <div className="cards">
                             <Card title={item.job_title}><p>{item.job_description}</p>
                             <Button type="primary" onClick={(e) => this.applyToJob(e,item.uuid)} disabled={item.isApplied}>Apply</Button>
                             </Card>
                            </div>
                          ) 
                })) : 
                list.map(item=>{
                    return (
                        <div className="cards">
                            <Card title={item.job_title}>
                            <p>{item.job_description}</p>
                             <Button type="danger" onClick={(e) => this.delJob(e,item.uuid)} disabled={item.isApplied}>Delete</Button>
                             </Card>
                      </div>
                    ) 
                })
                }
            <Pagination onChange={this.onChange} total={this.state.total} pageSize={this.state.limit}/>
            </React.Fragment>  
        )}
}
        
const mapStateToProps=(store)=>{
   return({
       userData:store
   })
}  



export default connect(mapStateToProps, {applyForJob, availablejobs, allJobs, deleteJob}) (JobsView);//take then send

