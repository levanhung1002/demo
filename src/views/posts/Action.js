import {Link} from "react-router-dom";

export default function Action(props) {

    const {post, onRemove} = props;

return (
    <div>
        <button onClick={onRemove} style={{margin: "5px"}} >Remove</button>
        <Link to={{
            pathname: `/posts/${post.id}`,
            state: post
        }}>View Detail</Link>
    </div>
);
}