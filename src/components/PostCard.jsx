import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostCard({ title, featuredimage, $id }) {
    return (
        <div className="border border-gray-400 rounded-sm p-4 mb-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <Link to={`/post/${$id}`} className="no-underline text-black hover:text-gray-700">
                {/* Image Container with Aspect Ratio */}
                <div className="mb-3 overflow-hidden rounded-sm relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                    <img
                        src={appwriteService.getFilePreview(featuredimage)}
                        alt={title}
                        className="absolute top-0 left-0 w-full h-full object-cover border border-gray-300 hover:scale-105 transition-transform duration-300"
                        loading="lazy" // Add lazy loading
                    />
                </div>
                
                <div className="p-2">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2 hover:underline line-clamp-2"> {/* Limit to 2 lines */}
                        {title}
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-gray-600 hover:text-gray-800">
                        Click to read more...
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default PostCard;