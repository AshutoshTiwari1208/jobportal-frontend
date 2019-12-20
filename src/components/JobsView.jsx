import React, { Component } from 'react'
import { Card,
Button,
Pagination,
Icon,
Popconfirm,
Spin,
} from 'antd';
import {applyForJob, availablejobs,deleteJob,allJobs} from "../redux/actions/jobs";
import { connect } from 'react-redux';

class JobsView extends Component {


    state = {
        list: [],
        isApplied:false,
        page:1,
        limit:6,
        total: 0,
        loading: false,
        textPop:"Want to apply to this job?"
    }

componentDidMount() {
    this.setState({
        loading : true
    })
    if(this.props.userData.auth.userdetails.role=="0"){
       const pagination={
            page: this.state.page,//no prob i this.state
            limit:this.state.limit
        }
        this.props.availablejobs(pagination).then(response=>{
            this.setState({//set state will render the view again..

                total:response.metadata.count,
                list:response.data,
                loading: false
            });
        })
    }else{
        const pagination={
            page: this.state.page,//no prob i this.state
            limit:this.state.limit
        }

        this.props.allJobs(pagination).then(response=>{
            this.setState({//set state will render the view again..
                total:response.metadata.count,
                list: response.data,
                loading: false
            })
        });
    }
}


    applyToJob=(e,jobUuid)=>{
        // console.log("APPLY TO JOB ",jobUuid);
        e.preventDefault();

        let jobDetails= this.props.applyForJob(jobUuid).then(data=>{
            const updatedJobs = this.state.list.map(job=>{
                return job.id === jobUuid ? 
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

    delJob=(e,jobUuid,isDisabled)=>{
        e.preventDefault();
                let jobDetails=this.props.deleteJob(jobUuid).then(data=>{
                    const updatedJobs=this.state.list.map(job=>{
                        return job.id===jobUuid ?
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
                list:response.data
            });
        })
      };

    
    render() {


        const { list, loading } = this.state;

        if(loading) {
            return  <center><Spin /></center> 
        }
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
                        return ( ///FFINEE-----------------------------------------
                            <div className="cards">
                             <Card title={item.job_title}><h1>Description </h1><p><h2>{item.job_description}</h2><hr/> <h2><b>{item.companyname}</b></h2></p>
                             <Popconfirm placement="right" title={this.state.textPop} disabled={item.isApplied} onConfirm={(e) => this.applyToJob(e,item.id)}  okText="Yes" cancelText="No">
                             <Button type="primary"  disabled={item.isApplied}>Apply</Button>
                             </Popconfirm>
                             </Card>
                            </div>
                          ) 
                })) : 
                list.map(item=>{
                    return (
                        <div className="cards">
                             <Card title={item.job_title}><h1>Description </h1><p><h2>{item.job_description}</h2><hr/> <h2><b>{item.companyname}</b></h2></p>                            
                             <Popconfirm placement="right" title={this.state.textPop} disabled={item.isApplied} onConfirm={(e) => this.delJob(e,item.id,item.isApplied)}   okText="Yes" cancelText="No">
                             <Button type="danger"  disabled={item.isApplied}>Delete</Button>
                             </Popconfirm>
                             </Card>
                      </div>
                    ) 
                })
                }
            <Pagination className="paginationblock" onChange={this.onChange} total={this.state.total} pageSize={this.state.limit}/>
            </React.Fragment>  
        )}
}
        
const mapStateToProps=(store)=>{
   return({
       userData:store
   })
}  



export default connect(mapStateToProps, {applyForJob, availablejobs, allJobs, deleteJob}) (JobsView);//take then send

