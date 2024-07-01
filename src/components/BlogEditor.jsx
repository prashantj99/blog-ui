import { useContext, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import { tools } from './tools';
import { CssBaseline, Box } from '@mui/material';
import { EditorContext } from '../pages/editor.page';

const BlogEditor = () => {
    const { EditorState, setEditorState } = useContext(EditorContext);
    const editorInstance = useRef(null);

    useEffect(() => {
        const initializeEditor = () => {
            console.log(EditorState.content);
            editorInstance.current = new EditorJS({
                holder: 'textEditor',
                data: EditorState.content || { blocks: [] },
                tools: tools,
                placeholder: "Let's write an awesome story",
                onChange: async () => {
                    try {
                        const editorData = await editorInstance.current.save();
                        setEditorState((prev) => {
                            console.log('Editor content:', editorData);
                            return { ...prev, content:editorData.blocks};
                        });
                    } catch (error) {
                        console.error("Error saving content:", error);
                    }
                },
            });
        };

        initializeEditor();

        return () => {
            if (editorInstance.current) {
                editorInstance?.current?.destroy();
                editorInstance.current = null;
            }
        };
    }, []);

    return (
        <>
            <CssBaseline />
            <Box id="textEditor" sx={{ margin: 2, padding: 2, border: '1px solid #ddd', borderRadius: '4px' }}></Box>
        </>
    );
};

export default BlogEditor;
