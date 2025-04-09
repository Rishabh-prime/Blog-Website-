import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Check network connection first
                if (!navigator.onLine) {
                    throw new Error('No internet connection');
                }

                const postsData = await appwriteService.getPosts([]);
                if (postsData) {
                    setPosts(postsData.documents);
                }
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setError(err.message || "Failed to load posts. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

        // Add network event listeners
        const handleOnline = () => fetchPosts();
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    if (loading) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className="text-center">Loading posts...</div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
                        {/* {error} */}
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
                            <PostCard 
                                title={post.title}
                                content={post.content.replace(/<[^>]*>/g, '')} // Clean HTML tags
                                featuredimage={post.featuredimage}
                                $id={post.$id}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}


export default Home