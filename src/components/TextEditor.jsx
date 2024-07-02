// import { useEffect} from 'react';
import { CssBaseline, Box} from '@mui/material';
// import useBlog from '../hooks/useBlog';

const TextEditor = () => {
    // const {textEditor, setTextEditor, setBlogState, blogState} = useBlog();
    
    // useEffect(() => {
    //     if(textEditor && textEditor.isReady){
    //         return ;
    //     }
        

        
    //     if(editor){
    //         editor.isReady.then(() => {
    //             if (blogState.content && blogState.content.length > 0) {
    //                 editor.render({ blocks: blogState.content });
    //             }
    //         }).catch((error) => {
    //             console.error('Error destroying editor:', error);
    //         });
    //     }

        // return () => {
        //     if (editor) {
        //         editor.isReady.then(() => {
        //             editor.destroy();
        //         }).catch((error) => {
        //             console.error('Error destroying editor:', error);
        //         });
        //     }
        // };
    // }, [setTextEditor, setBlogState, blogState, textEditor]); 

    // useEffect(()=>{
    //     if(textEditor.isReady){
    //         console.log(textEditor.isReady);
    //         if (blogState.content && blogState.content.length > 0) {
    //             textEditor.render({ blocks: blogState.content });
    //         }
    //         return;
    //     }
    // }, [textEditor.isReady, blogState.content, textEditor]);

    return (
        <>
            <CssBaseline />
            <Box id="textEditor" sx={{ margin: 2, padding: 2, border: '1px solid #ddd', borderRadius: '4px' }}></Box>
        </>
    );
};

export default TextEditor;
