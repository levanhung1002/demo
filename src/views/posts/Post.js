import {
    useLocation, useParams
} from "react-router-dom";


const Post = () => {

    let location = useLocation();
    let {postId} = useParams();
    return (
        <div>
            <h5>id: {postId}</h5>
            <h5>title: {location.state.title}</h5>
            <h5>body: {location.state.body}</h5>
        </div>
    );
}

export default Post;