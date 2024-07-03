import { createContext, useCallback, useEffect, useState } from 'react';
import EditorNavBar from '../components/EditorNavBar';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { WAITING_TIME_FOR_AUTO_SAVE } from '../commons/AppConstant.jsx';
import { toast } from 'react-toastify';
import CreateBlogPage from './create-blog.page';
import EditorJS from '@editorjs/editorjs';
import { tools } from '../components/tools';

export const BlogContext = createContext({});

function EditorPage() {
    const axiosPrivate = useAxiosPrivate();
    const { userAuth } = useAuth();
    const [textEditor, setTextEditor] = useState({isReady: false});
    const [isSaving, setIsSaving] = useState(false); // State for saving/loading indicator
    const [blogState, setBlogState] = useState({
        title: '',
        content: [],
        tags: [],
        description: '',
        categoryId: null,
        banner: null,
        blogId: null,
        prevBanner: null,
        draft: true,
    });
    const {blogId, title, content, categoryId, banner, prevBanner, description, tags, draft} = blogState;
    
    const initializeTextEditor = (blocks) =>{
        const editor = new EditorJS({
            holder: 'textEditor',
            data: blocks,
            tools: tools,
            autofocus: true,
            placeholder: "Let's write an awesome story",
            onChange: async () => {
                try {
                    const data = await editor.save();
                    setBlogState((prev) => ({
                        ...prev,
                        content: data.blocks,
                    }));
                } catch (error) {
                    console.error('Error saving content:', error);
                }
            }
        });
        setTextEditor(editor);
    }

    const sendUpdatedBlogToServer = useCallback(async (isDraft) => {
        if(!banner || !prevBanner){
            return;
        }
        try {
            // update the blog content on server
            console.log(isDraft);
            const response = await axiosPrivate.post(
                blogId ? '/post/update' : '/post/create_post',
                {
                    postId: blogId,
                    postTitle: title || 'New Blog',
                    postContent: JSON.stringify(content),
                    postDescription: description || '',
                    tags: tags || [],
                    bannerUrl: prevBanner, // for curr  request the prevBanner will contain the name of curr banner img
                    draft: isDraft,
                    categoryId: categoryId,
                    userId: userAuth?.userId
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response);

            //update the blog response blogid
            setBlogState((prev) => {
                return {
                    ...prev,
                    blogId: response.data?.postId,
                };
            });

            sessionStorage.setItem('curr_blog_id', response.data?.postId);
            let success_msg = draft ? 'Draft saved successfully!' : 'Your blog has been Published!!!'; 
            toast.success(success_msg);
        } catch (error) {
            console.log(error);
        }
    }, [axiosPrivate, banner, blogId, categoryId, content, description, prevBanner, tags, title, userAuth?.userId, draft]);

    const handleSaveDraft = useCallback(async (isDraft) => {
        setIsSaving(true); // Start saving/loading state
        try {
            if (!content || !categoryId || !banner) {
                console.log('empty content or category or banner!!!');
                return;
            }

            if (prevBanner == null) {
                try {
                    //get image file form banner
                    const response = await fetch(banner);
                    const blob = await response.blob();
                    const file = new File([blob], 'banner_img.png');

                    //make post request to upload banner image
                    const formData = new FormData();
                    formData.append('file', file);

                    const uploadResponse = await axiosPrivate.post('/file/upload', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });

                    //update the url of banner
                    console.log(uploadResponse.data);
                    setBlogState((prev) => {
                        return {
                            ...prev,
                            prevBanner: uploadResponse.data,
                            banner: `${import.meta.env.VITE_SERVER_DOMAIN}/file/name/${uploadResponse.data}`,
                        };
                    });
                    sendUpdatedBlogToServer(isDraft); //make call once banner updated
                    console.log('banner uploaded');
                } catch (error) {
                    console.log(error);
                    toast.error('banner not uploaded!!!');
                    setIsSaving(false);
                    return;
                }
            } else {
                //update post if no change in banner
                sendUpdatedBlogToServer(isDraft);
            }
        } catch (error) {
            console.error('Error saving draft:', error);
            toast.error('Failed to save draft');
        } finally {
            setTimeout(()=>{
                setIsSaving(false); // End saving/loading state
            }, 2000);
        }
    }, [banner, sendUpdatedBlogToServer, prevBanner, axiosPrivate, content, categoryId]);

    //auto save blog
    useEffect(() => {
        const intervalId = setInterval(handleSaveDraft, WAITING_TIME_FOR_AUTO_SAVE * 60000); 

        return () => {
            clearInterval(intervalId);
        };

    }, [handleSaveDraft]);


    //fetch blog on load from session
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogId = sessionStorage.getItem('curr_blog_id');
    
                if (!blogId) {
                    initializeTextEditor({blocks:[]});
                    return;
                }
    
                const response = await axiosPrivate.get(`/post/${blogId}`);
                const { postId, postTitle, postContent, imageName, category: { categoryId }, tags, postDescription, draft} = response.data;
    
                // Initialize the text editor once blog content is fetched
                initializeTextEditor({ blocks: JSON.parse(postContent) });

                setBlogState({
                    blogId: postId,
                    title: postTitle,
                    description: postDescription,
                    content: JSON.parse(postContent),
                    prevBanner: imageName,
                    banner: `${import.meta.env.VITE_SERVER_DOMAIN}/file/name/${imageName}`,
                    categoryId: parseInt(categoryId),
                    tags: tags.map(tag => tag.tagName),
                    draft: draft,
                });

            } catch (error) {
                console.log('Error fetching blog:', error);
            }
        };
    
        fetchBlog();
    
    }, []);
    
    return (
        <BlogContext.Provider value={{ blogState, setBlogState, textEditor, setTextEditor, handleSaveDraft, isSaving}}>
            <EditorNavBar />
            <CreateBlogPage />
        </BlogContext.Provider>
    );
}

export default EditorPage;
