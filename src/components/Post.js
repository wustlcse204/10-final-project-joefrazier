import React, {Component} from 'react'
import './components.css'

class Post extends Component{
    constructor(props){
        super(props);
    }

    renderReadme = () => {
        var id = this.props.repoID;
        var readme = this.props.readme;
        console.log(this.props.readme);
        document.getElementById(id).innerHTML = readme;
    }

    render(){
        return(
            <div className="post-item">
                <div className="post-header">
                    <div className="post-header-1">
                        <img className="post-owner-pic" src={this.props.ownerPic}/>
                    </div>
                    <div className="post-header-2">
                        <div className="post-name">{this.props.name}</div>
                        <div className="post-owner">{this.props.owner}</div>
                        <div className="post-link"><a className="post-link-href" href={this.props.link}>View</a></div>
                    </div>
                   
                    
                
                
                </div>
                <div className="post-readme" id={this.props.repoID} >{this.props.readme}</div>
            </div>
        )
    }

    componentDidMount(){
        this.renderReadme();
    }
}
export default Post;