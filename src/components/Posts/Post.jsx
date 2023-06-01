import React from 'react'
import './Post.css';
export default function Post(props) {
    return (
        <div className='new-post-section'>
            <div className="card post-card mt-3">
                <div className="card-body">
                    {/* <div className='post-header'> */}
                    <div className='d-flex'>
                        <img src={props.profileImage} alt="Profile" style={{ width: "60px", height: "60px", borderRadius: "500px" }} className="small-profile" />
                        <h5 className='p-2 mx-3'><span>{props.userName ? props.userName : "You"}</span><span className='text-secondary'> _{props.userNickName ? props.userNickName : "user"}</span> shares a story...</h5>
                    </div>
                    <p className="card-text">
                        {props.description}
                    </p>
                    {/* </div> */}
                    <p>
                        {props.tags ? props.tags.map((item, index) => {
                            return <a className='text-primary mr-1 text-decoration-none' key={index} href="https://www.google.com/">{item}</a>
                        }
                        ) : ""}
                    </p>
                    {props.postImage ? <img src={props.postImage} className="card-img-top post-image img-fluid" alt="..." /> : ""
                    }
                    <hr className='divider' />
                        <div className="d-flex justify-content-between align-items-center">
                            <button className="btn btn-outline-primary">
                                <i className='bi bi-hand-thumbs-up p-1'></i><span className="d-none d-md-inline">Like</span>({props.likeCount})
                            </button>
                            <button className="btn btn-outline-primary">
                                <i className='bi bi-chat-left-dots px-1 mb-5'></i><span className="d-none d-md-inline">Comment</span>({props.commentCount})
                            </button>
                            <button className="btn btn-outline-primary">
                                <i className='bi bi-star p-1'></i><span className="d-none d-md-inline">Stars</span>({props.starCount})
                            </button>
                        </div>
                </div>
            </div>
        </div >
    )
}

