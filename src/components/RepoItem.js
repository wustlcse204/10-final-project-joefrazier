import React, {Component} from 'react'
import './components.css'

class RepoItem extends Component{
    constructor(props){
        super(props);
    }

    handlePost = () => {
        this.props.onClick(JSON.stringify(this.props.repo));
        console.log(this.props.repo);
    }

    render(){
        return(
            <div className="repo-item-container">
                <div className="repo-item-name">{this.props.name}</div>
                <div className="repo-item-owner">{this.props.owner}</div>
                <div className="repo-item-description">{this.props.description}</div>
                <input type="button" className="postRepoBtn" value="Post" onClick={this.handlePost}></input>
            </div>
        );
    }

}
export default RepoItem;