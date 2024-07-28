import { Typography, Box, CardMedia} from '@mui/material';

const parseEditorJsJson = (blocks) => {
    // console.log(blocks);
    if (!blocks) {
        throw new Error('Invalid Editor.js data');
    }

    return blocks.map((block, index) => {
        switch (block.type) {
            case 'paragraph':
                return <Typography key={index} variant="body1" gutterBottom mt={1}>{block.data.text}</Typography>
            case 'header':
                return <Typography key={index} variant={`h${block.data.level}`} gutterBottom mt={1}>{block.data.text}</Typography>;
            case 'list':
                return (
                    <>
                        {
                            block.data.style === 'ordered' ?
                                <ol key={index} style={{ fontSize: '18px' }}>
                                    {
                                        block.data.items.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))
                                    }
                                </ol>
                                :
                                <ul key={index} style={{ fontSize: '18px' }}>
                                    {
                                        block.data.items.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))
                                    }
                                </ul>
                        }
                    </>
                );
            case 'image':
                return (
                    <CardMedia
                        component="img"
                        image={block.data.file.url}
                        alt={block.data.caption || ''}
                        sx={{ mt: 2 }}
                        key={index}
                    />
                );
            case 'quote':
                return (
                    <Box key={index} component="blockquote" sx={{ borderLeft: '5px solid', paddingLeft: 2, margin: 2 }}>
                        <Typography variant="body1">{block.data.text}</Typography>
                        {block.data.caption && (
                            <Typography variant="caption" component="cite">{block.data.caption}</Typography>
                        )}
                    </Box>
                );
            case 'code':
                return (
                    <Box key={index} component="pre" sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1 }}>
                        <code>{block.data.code}</code>
                    </Box>
                );
            default:
                console.warn(`Unknown block type "${block.type}"`);
                return null;
        }
    });
};

// eslint-disable-next-line react/prop-types
const JsonToHtmlParser = ({ editorJsData }) => {
    return (<>
        {parseEditorJsJson(editorJsData)}
        <div style={{ minHeight: '200px' }}>
            {/* footer */}
        </div>
    </>);
};
export default JsonToHtmlParser;
