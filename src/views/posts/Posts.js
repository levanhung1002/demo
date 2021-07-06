import {useEffect, useState} from "react";
import axios from "axios";
import Action from "./Action";

export default function Posts() {

    const header = {
        columns: [
            {
                label: 'ID',
                field: 'id',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Title',
                field: 'title',
                width: 150
            },
            {
                label: 'Action',
                field: 'action',
                width: 150
            }
        ]
    };

    const SORT = ['NONE', 'ASC', 'DES'];

    const [posts, setPosts] = useState([]);

    const [apiData, setApiData] = useState([]);

    const [sort, setSort] = useState(0);

    const [loading, setLoading] = useState(false);

    function handleRemove(id) {
        const removedPosts = posts.filter(e => e.id !== id);
        setPosts(removedPosts);
        setApiData(removedPosts);
    }

    function handleSort() {

        const option = (sort + 1) % 3;
        setSort(option);
        if (option === 0) {
            apiData.sort((a, b) => {
                return a.id - b.id;
            });
        } else if (option === 1) {
            apiData.sort((a, b) => {
                return a.title.localeCompare(b.title)
            });
        } else {
            apiData.sort((a, b) => {
                return b.title.localeCompare(a.title)
            });
        }
        setPosts([...apiData]);
        setApiData([...apiData])
    }


    function searchPosts(event) {
        const value = event.target.value;
        const filteredData = apiData.filter(element => {
            return element.title.toLowerCase().includes(value.toLowerCase());
        });

        setPosts(filteredData);

    }

    function getAll() {
        setLoading(true);
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                setLoading(false);
                setPosts(res.data);
                setApiData(res.data);
            })
            .catch(err => setLoading(false));
    }

    useEffect(getAll, []);

    const listItem = posts.map(e =>
        <tr key={e.id}>
            <td>{e.id}</td>
            <td>{e.title}</td>
            <td><Action post={e} onRemove={() => handleRemove(e.id)}/></td>
        </tr>
    );


    return (
        loading ? <h1>Loading</h1> :
            <div>
                <input type="text" placeholder="Search by title" class="search-by-title" onChange={searchPosts}/>
                <table id="post">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th onClick={handleSort}>Title -- Sort {SORT[sort]}</th>
                        <th>Action</th>
                    </tr>

                    </thead>

                    <tbody>
                    {listItem}
                    </tbody>
                </table>
            </div>

    );
}