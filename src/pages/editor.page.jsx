import { createContext, useState, } from "react";
import BlogTextEditor from "../components/BlogTextEditor";
import EditorNavBar from "../components/EditorNavBar";

export const EditorContext = createContext({});

function EditorPage() {
    const [EditorState, setEditorState] = useState(() => {
        const storedState = sessionStorage.getItem('editorState');
        return storedState ? JSON.parse(storedState) : {
            bannerFile: null,
            title: '',
            content: [],
            tags: [],
            description: '',
            categoryId: null,
            bannerUrlFromServer: null,
            blogId: null,
        };
    });
    return (
        <EditorContext.Provider value={{ EditorState, setEditorState }}>
            <EditorNavBar />
            <BlogTextEditor />
        </EditorContext.Provider>
    );
}

export default EditorPage;
