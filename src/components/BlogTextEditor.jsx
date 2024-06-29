import React, { useState, useEffect, useContext } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Box, TextField, CssBaseline, Typography, Chip } from '@mui/material';
import { EditorContext } from '../pages/editor.page';
import '../commons/BlogTextEditor.css';
import CategorySelect from './CategorySelect';
import AppSplitter from './AppSplitter';
import BlogEditor from './BlogEditor';
import JsonToHtmlParser from '../commons/JsonToHtmlParser';

const BlogTextEditor = () => {
  const { EditorState, setEditorState } = useContext(EditorContext);
  const { title, banner, content, description, tags = [] } = EditorState || {};

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const savedEditorState = JSON.parse(sessionStorage.getItem('editorState'));
    if (savedEditorState) {
      setEditorState(savedEditorState);
    }
  }, [setEditorState]);

  useEffect(() => {
    sessionStorage.setItem('editorState', JSON.stringify(EditorState));
  }, [EditorState]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleFileSelect = (event) => {
    const img = event.target.files[0];
    if (img) {
      setEditorState(prevState => ({
        ...prevState,
        banner: URL.createObjectURL(img),
        bannerFile: img
      }));
    }
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag.length >= 3 && !tags.includes(trimmedTag) && tags.length < 5) {
      const updatedTags = [...tags, trimmedTag];
      setEditorState(prevState => ({
        ...prevState,
        tags: updatedTags,
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setEditorState(prevState => ({
      ...prevState,
      tags: updatedTags,
    }));
  };

  return (
    <>
      <CssBaseline />
      <AppSplitter>
        <Box p={2} sx={{ pt: 1, overflowY: 'auto' }}>
          <Box sx={{ width: "100%" }}>
            <label htmlFor='uploadBanner'>
              <img
                src={banner || "/src/assets/blog_banner.png"}
                style={{ zIndex: 20, width: "100%", height: 'auto' }}
                alt="Banner"
              />
              <input
                id="uploadBanner"
                type="file"
                hidden
                onChange={handleFileSelect}
                accept='.png, .jpg, .jpeg'
              />
            </label>
          </Box>
          <TextField
            variant="outlined"
            sx={{ width: '100%', mb: 5 }}
            placeholder="Blog Title"
            value={title || ''}
            onKeyDown={handleKeyDown}
            onChange={e => setEditorState(prevState => ({ ...prevState, title: e.target.value }))}
          />
          <TextField
            variant="outlined"
            sx={{ width: '100%', mb: 5 }}
            placeholder="Add a small description or introduction about your blog..."
            value={description || ''}
            onKeyDown={handleKeyDown}
            onChange={e => setEditorState(prevState => ({ ...prevState, description: e.target.value }))}
          />
          <Box>
            {tags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                sx={{ mr: 1, mb: 1 }}
                style={{ backgroundColor: '#40739e', color: 'white' }}
              />
            ))}
            <TextField
              label="Tags"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleAddTag();
                }
              }}
              sx={{ minWidth: '150px', width: '100%', mb: 3 }}
            />
          </Box>
          <CategorySelect />
          <BlogEditor />
        </Box>
        <Box p={2} sx={{ pt: 1, overflow: 'auto' }}>
          <Typography variant='h3' align='left' mb={2} sx={{ wordWrap: 'break-word' }}>
            {title && title.length > 0 ? title : 'New Blog'}
          </Typography>
          <Typography variant='h6' align='left' mb={2} sx={{ wordWrap: 'break-word' }}>
            {description && description.length > 0 ? description : ''}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 0, flexDirection: 'column' }}>
            {banner && <img src={banner} alt="Cover" style={{ width: '100%', height: '80%' }} />}
          </Box>
          <Box>
            <JsonToHtmlParser editorJsData={content ? content : []} />
          </Box>
        </Box>
      </AppSplitter>
    </>
  );
};

export default BlogTextEditor;
