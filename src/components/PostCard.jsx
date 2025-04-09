import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostCard({ title, featuredimage, $id }) {
    return (
        <div className="border border-gray-400 rounded-sm p-4 mb-6 bg-white shadow-sm">
            <Link to={`/post/${$id}`} className="no-underline text-black">
                <div className="mb-3">
                    <img
                        src={appwriteService.getFilePreview(featuredimage)}
                        alt={title}
                        className="w-full h-52 object-cover border border-gray-300"
                    />
                </div>
                <h2 className="text-2xl font-serif font-bold mb-2 underline">{title}</h2>
                <p className="text-sm font-mono text-gray-600">Click to read more...</p>
            </Link>
        </div>
    );
}

export default PostCard;
