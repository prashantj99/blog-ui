import { useState, useEffect } from 'react';

const useEditor = () => {
    const [EditorState, setEditorState] = useState(() => {
        const storedState = sessionStorage.getItem('editorState');
        return storedState ? JSON.parse(storedState) : {
            bannerFile: null,
            title: '',
            content: '',
            tags: [],
            description: '',
            categoryId: null,
            bannerUrlFromServer: '',
            blogId: null
        };
    });

    useEffect(() => {
        sessionStorage.setItem('editorState', JSON.stringify(EditorState));
    }, [EditorState]);

    return { EditorState, setEditorState };
};

export default useEditor;
