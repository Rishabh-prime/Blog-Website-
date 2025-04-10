import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async (data) => {
        setIsSubmitting(true);
        try {
            if (!userData || !userData.$id) {
                throw new Error("User data is missing. Please login again.");
            }
    
            if (post) {
                // Update existing post
                const file = data.featuredImage[0] ? await appwriteService.uploadFile(data.featuredImage[0]) : null;
    
                if (file) {
                    await appwriteService.deleteFile(post.featuredimage);
                }
    
                const dbPost = await appwriteService.updatePost(post.$id, {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    featuredimage: file ? file.$id : post.featuredimage
                });
    
                if (dbPost) {
                    toast.success("Post updated successfully");
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // Create new post
                if (!data.featuredImage[0]) {
                    throw new Error("Featured image is required");
                }
    
                const file = await appwriteService.uploadFile(data.featuredImage[0]);
    
                const dbPost = await appwriteService.createPost({ 
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featuredimage: file.$id,
                    userId: userData.$id  // ✅ Now safe to access
                });
    
                if (dbPost) {
                    toast.success("Post created successfully");
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error.message || "Failed to save post");
        } finally {
            setIsSubmitting(false);
        }
    };
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-4">
        {/* Left: Content Inputs */}
        <div className="lg:w-2/3 w-full space-y-4">
            <Input
                label="Title :"
                placeholder="Title"
                {...register("title", { required: "Title is required" })}
                error={errors.title?.message}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                {...register("slug", { required: "Slug is required" })}
                error={errors.slug?.message}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE 
                label="Content :" 
                name="content" 
                control={control} 
                defaultValue={getValues("content")}
                error={errors.content?.message}
            />
        </div>
    
        {/* Right: Image, Status, Button */}
        <div className="lg:w-1/3 w-full space-y-4">
            <Input
                label="Featured Image :"
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("featuredImage", { 
                    required: !post ? "Featured image is required" : false 
                })}
                error={errors.featuredImage?.message}
            />
    
            {post && (
                <div className="w-full">
                    <img
                        src={appwriteService.getFilePreview(post.featuredimage)}
                        alt={post.title}
                        className="rounded-xl w-full object-cover max-h-64 border"
                    />
                </div>
            )}
    
            <Select
                options={["active", "inactive"]}
                label="Status"
                {...register("status", { required: "Status is required" })}
                error={errors.status?.message}
               
            />
    
            <Button 
                type="submit" 
                bgColor={post ? "bg-green-500" : " bg-[#DCC6AC]"} 
                className="w-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Processing..." : (post ? "Update" : "Submit")}
            </Button>
        </div>
    </form>
    
    );
}