import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!userData) return;

            setLoading(true);
            const allPosts = await appwriteService.getPosts();

            if (allPosts?.documents) {
                // Filter posts created by this user
                const userPosts = allPosts.documents.filter(post => post.userId === userData.$id);
                setPosts(userPosts);
            }

            setLoading(false);
        };

        fetchUserPosts();
    }, [userData]);

    if (loading) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <h2 className="text-xl font-semibold">Loading your posts...</h2>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-12 text-center">
                <Container>
                    <h1 className="text-2xl font-bold mb-4">You haven’t written anything yet.</h1>
                    <Link 
                        to="/add-post"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Create Your First Post
                    </Link>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <h1 className="text-2xl font-bold mb-6 text-center">Your Posts</h1>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
