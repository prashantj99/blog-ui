import React, { createContext, useEffect, useState } from "react";
// import BlogTextEditor from "../components/BlogTextEditor";
import BlogTextEditor from "../components/BlogTextEditor";
import EditorNavBar from "../components/EditorNavBar";

export const EditorContext = createContext({});

function EditorPage() {
    const blog = {
        bannerFile: ' ',
        title: ' ',
        content: [],
        tags: [],
        description: ' ',
        categoryId: ' ',
        bannerUrlFromServer: ' ',
        blogId: ' ',
    }
    const [EditorState, setEditorState] = useState({content: []});
    useEffect(() => {
        setEditorState(JSON.parse(sessionStorage.getItem('editorState')));
    }, []);
    return (
        <EditorContext.Provider value={{ EditorState, setEditorState }}>
            <EditorNavBar />
            <BlogTextEditor />
        </EditorContext.Provider>
    );
}

export default EditorPage;
