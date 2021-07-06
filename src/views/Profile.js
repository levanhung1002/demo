import axios from "axios";
import {useEffect, useState} from "react";

const Profile = ({ currentUser }) => {

    const [profile, setProfile] = useState({
        createdAt: '',
        name: '',
        id: ''
    });
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let didCancel = false;
        axios({
            method: 'GET',
            url: `https://60dff0ba6b689e001788c858.mockapi.io/users/${currentUser.userId}`
        }).then(({ data: { createdAt, name, id } })=>{
            if(!didCancel) {
                setIsloading(false);
                setProfile({
                    createdAt,
                    name,
                    id
                })
            }
        }).catch(()=> {
            if(!didCancel) {
                setError(() => setError('Something went wrong'));
                setIsloading(false)
            }
        })
        return () => didCancel = true;
    }, [currentUser.userId]);

    if(isLoading) return (<div>Loading</div>);
    if(error) return error;
    return (
        <div>
            <h3>Profile </h3>
            <div>Name: { profile.name }</div>
            <div>UserID: { profile.id }</div>
        </div>
    );
}

export default Profile;