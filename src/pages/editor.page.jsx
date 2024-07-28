import { createContext, useCallback, useEffect, useState } from 'react';
import EditorNavBar from '../components/EditorNavBar';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { BASE_URL, CREATE_POST_URL, FILE_UPLOAD_URL, UPDATE_POST_URL, WAITING_TIME_FOR_AUTO_SAVE } from '../commons/AppConstant.jsx';
import { toast } from 'react-toastify';
import CreateBlogPage from './create-blog.page';
import EditorJS from '@editorjs/editorjs';
import { tools } from '../components/tools';

export const BlogContext = createContext({});

function EditorPage() {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
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
                blogId ? UPDATE_POST_URL : CREATE_POST_URL,
                {
                    postId: blogId,
                    postTitle: title || 'New Blog',
                    postContent: JSON.stringify(content),
                    postDescription: description || '',
                    tags: tags || [],
                    bannerUrl: prevBanner, // for curr  request the prevBanner will contain the name of curr banner img
                    draft: isDraft,
                    categoryId: categoryId,
                    userId: auth?.id
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
    }, [auth?.id, axiosPrivate, banner, blogId, categoryId, content, description, draft, prevBanner, tags, title]);

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

                    const uploadResponse = await axiosPrivate.post(FILE_UPLOAD_URL, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });

                    //update the url of banner
                    console.log(uploadResponse.data);
                    setBlogState((prev) => {
                        return {
                            ...prev,
                            prevBanner: uploadResponse.data,
                            banner: `${BASE_URL}/file/name/${uploadResponse.data}`,
                        };
                    });
                    sendUpdatedBlogToServer(isDraft); //make call once banner updated
                    console.log('banner uploaded');
                } catch (error) {
                    console.log(error);
                    toast.error('banner not uploaded!!!');
                    setIsSaving(false);
                }
            } else {
                //update post if no change in banner
                sendUpdatedBlogToServer(isDraft);
            }
        } catch (error) {
            toast.error('Failed to save draft');
        } finally {
            setTimeout(()=>{
                setIsSaving(false); // End saving/loading state
            }, 5000);
        }
    }, [banner, sendUpdatedBlogToServer, prevBanner, axiosPrivate, content, categoryId]);
    
    //auto save blog
    useEffect(() => {
        const intervalId = setInterval(()=>{handleSaveDraft(draft);}, WAITING_TIME_FOR_AUTO_SAVE * 60000); 

        return () => {
            clearInterval(intervalId);
        };

    }, [handleSaveDraft, draft]);


    //fetch blog on load from session
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchBlog = async () => {
            try {
                const blogId = sessionStorage.getItem('curr_blog_id');
    
                if (!blogId) {
                    initializeTextEditor({blocks:[]});
                    return;
                }
    
                const response = await axiosPrivate.get(`/post/${blogId}`, {signal});
                const { postId, title, content, bannerUrl, draft, lastUpdated, description, categoryId} = response.data;
    
                // Initialize the text editor once blog content is fetched
                initializeTextEditor({ blocks: JSON.parse(content) });


                setBlogState({
                    blogId: postId,
                    title: title,
                    description: description,
                    content: JSON.parse(content),
                    prevBanner: bannerUrl,
                    banner: `${BASE_URL}/file/name/${bannerUrl}`,
                    categoryId: parseInt(categoryId),
                    tags: tags.map(tag => tag.name),
                    draft: draft,
                    lastUpdated: lastUpdated,
                });

            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.log('Error fetching blog:', error);
                }
            }
        };
        
        fetchBlog();
        
        return () => {
            controller.abort();
        };

    }, [])
    
    return (
        <BlogContext.Provider value={{ blogState, setBlogState, textEditor, setTextEditor, handleSaveDraft, isSaving}}>
            <EditorNavBar />
            <CreateBlogPage />
        </BlogContext.Provider>
    );
}

export default EditorPage;
