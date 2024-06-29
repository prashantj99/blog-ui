import React, { useEffect, useState } from 'react';
import { Publish, Save } from '@mui/icons-material';
import { AppBar, Box, Button, Toolbar, Typography, styled } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useEditor from '../hooks/useEditor';

const CustomIconButton = styled(Button)({
    color: 'black',
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
});

const Icons = styled(Box)({
    display: 'flex',
    justifyContent: 'space-around',
});

const StyledToolbar = styled(Toolbar)({
    display: { xs: 'none', sm: 'flex' },
    justifyContent: 'space-between',
});

export default function EditorNavBar() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { EditorState, setEditorState } = useEditor();
    const [isSaving, setIsSaving] = useState(false);

    const {
        bannerFile,
        title,
        content,
        tags,
        description,
        categoryId,
        bannerUrlFromServer,
        blogId,
    } = EditorState || {};

    useEffect(() => {
        const deletePrevBannerHandler = async () => {
            if (bannerUrlFromServer && bannerFile instanceof Blob) {
                try {
                    await axiosPrivate.delete(`/file/${bannerUrlFromServer}`);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        if (bannerUrlFromServer) {
            deletePrevBannerHandler();
            setEditorState((prev) => ({
                ...prev,
                bannerUrlFromServer: null,
            }));
        }
    }, [bannerFile, bannerUrlFromServer, setEditorState, axiosPrivate]);

    const handleSaveDraft = async () => {
        if (!content) return toast.error('Blog must have some content to save as draft!!');
        if (!bannerFile) return toast.error('Blog must have a banner image to save as draft!!');

        if (!bannerUrlFromServer && bannerFile instanceof Blob) {
            const formData = new FormData();
            formData.append('file', bannerFile);

            try {
                const response = await axiosPrivate.post('/file/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                setEditorState((prev) => ({
                    ...prev,
                    bannerUrlFromServer: response.data,
                }));

                setIsSaving(true);
            } catch (error) {
                console.error('Error uploading image:', error);
                return toast.error('Failed to upload the banner image');
            }
        } else {
            setIsSaving(true);
        }
    };

    useEffect(() => {
        if (!isSaving || !bannerUrlFromServer) return;

        const saveBlogDraft = async () => {
            const postData = {
                postTitle: title || 'New Blog',
                postContent: JSON.stringify(content),
                postDescription: description || '',
                tags: tags || [],
                bannerUrl: bannerUrlFromServer,
                draft: true,
                categoryId: categoryId,
            };

            try {
                const endpoint = blogId ? '/post/update' : '/post/create_post';
                const payload = blogId ? { ...postData, postId: blogId } : postData;

                const response = await axiosPrivate.post(endpoint, payload, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!blogId) {
                    setEditorState((prev) => ({
                        ...prev,
                        blogId: response.data.postId,
                    }));
                }

                sessionStorage.setItem('editorState', JSON.stringify(EditorState));
                toast.success('Draft saved successfully!');
            } catch (error) {
                console.error('Error saving draft:', error);
                toast.error('Failed to save draft');
            } finally {
                setIsSaving(false);
            }
        };

        saveBlogDraft();
    }, [isSaving, bannerUrlFromServer, blogId, title, content, description, tags, categoryId, setEditorState, axiosPrivate, EditorState]);

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 'none', color: 'black' }}>
            <ToastContainer />
            <StyledToolbar>
                <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <img
                        src="/src/assets/logo.png"
                        alt="Logo"
                        style={{ height: '20px', marginRight: '20px', cursor: 'pointer' }}
                        onClick={() => navigate('/user/feed')}
                    />
                </Typography>
                <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {title || 'New Blog'}
                </Typography>
                <Icons>
                    <CustomIconButton edge="start" startIcon={<Save />} color="inherit" aria-label="save" onClick={handleSaveDraft}>
                        SAVE DRAFT
                    </CustomIconButton>
                    <Button variant="contained" color={'primary'} startIcon={<Publish />} style={{ marginLeft: 'auto' }}>
                        Publish
                    </Button>
                </Icons>
            </StyledToolbar>
        </AppBar>
    );
}
