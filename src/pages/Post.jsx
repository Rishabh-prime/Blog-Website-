import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 px-4 bg-[#fdf6e3] text-[#2e2c29] font-['Courier_New',monospace]">
            <Container>
                <div className="max-w-4xl mx-auto bg-[#fffef6] border border-[#d6cfc4] rounded-lg  p-6 relative">
                    {post.featuredimage && (
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="w-full h-auto max-h-[450px] object-cover mb-6 rounded-md border border-[#d6cfc4]"
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-[#6b705c] hover:bg-[#585e4d]">
                                    ✏️ Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-[#b85742] hover:bg-[#944132]" onClick={deletePost}>
                                🗑️ Delete
                            </Button>
                        </div>
                    )}

                    <h1 className="text-3xl md:text-4xl font-bold mb-4 border-b border-[#b5aa98] pb-2 text-[#3d322c] shadow-sm">
                        📰 {post.title}
                    </h1>

                    <div className="prose prose-sm prose-stone prose-headings:text-[#463f3a] prose-strong:text-[#403d39] max-w-none">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
