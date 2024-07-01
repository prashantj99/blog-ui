import { useContext } from 'react';
import { EditorContext } from '../pages/editor.page';

const useEditor = () => {
    return useContext(EditorContext);
};

export default useEditor;
