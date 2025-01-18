import { Dispatch, SetStateAction } from 'react';
import RichTextEditor, { BaseKit, Bold, Italic, Underline, BulletList, OrderedList, Image, TextAlign, FontSize } from 'reactjs-tiptap-editor';
import parse from 'html-react-parser';

// Import CSS
import 'reactjs-tiptap-editor/style.css';

const handleImageUpload = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file);
  alert("Uploading")
  console.log(formData)
  try {
    const response = await fetch(`http://localhost:3000/upload`, { // Replace with your image upload API
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.url) {
      return data.url; // Return the image URL from the server
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

const extensions = [
  BaseKit.configure({

    // Show placeholder
    placeholder: {  
      showOnlyCurrent: true, 
    },
    
    // Character count
    characterCount: {  
      limit: 50_000,  
    },  
  }),
  // Heading,
  FontSize.configure({
    types: ['textStyle'], // Enable font size for text styles
  }),
  Bold, // Add Bold extension
  Italic, // Add Italic extension
  Underline, // Add Underline extension
  BulletList, // Add Bullet List extension
  OrderedList, // Add Ordered List extension
  Image.configure({
    upload: handleImageUpload, // Using the upload option for image handling
  }),
  TextAlign.configure({
    types: ['paragraph', 'heading'], // Enable for paragraph and heading nodes
  }),
  // Add more extensions as needed
];

const TextEditor = ({ content, setContent }: 
  { setContent: Dispatch<SetStateAction<string>>, content: string }
) => {
  
  const onChangeContent = (value: any) => {
    setContent(value);
  };

  return (
    <div className='mt-5'>
    <RichTextEditor
      output='html'
      content={content}
      onChangeContent={onChangeContent}
      extensions={extensions} 
    />
    <div>
      <h2>Content</h2>
      <div>{parse(content)}</div>  
    </div>
  </div>
  );
};

export default TextEditor;
