import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, storage } from '../services/firebase';
import { collection, addDoc, doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ThemeContext } from '../App';

interface AdminBlogEditorProps {
  mode: 'create' | 'edit';
}

const initialForm = {
  title: '',
  excerpt: '',
  content: '',
  category: '',
  tags: '',
  image: '',
};

// Custom CKEditor upload adapter for serverless Firebase Cloud Function
function CustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return {
      upload: async () => {
        const file = await loader.file;
        const formData = new FormData();
        formData.append('image', file);
        // Replace with your deployed function URL
        const response = await fetch('https://us-central1-arvindpadala-portfolio.cloudfunctions.net/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) throw new Error('Upload failed');
        const data = await response.json();
        return { default: data.url };
      },
      abort: () => {},
    };
  };
}

const AdminBlogEditor: React.FC<AdminBlogEditorProps> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Inject dark mode CSS for CKEditor only when theme is dark
  useEffect(() => {
    const styleId = 'ckeditor-dark-mode-style';
    let styleTag = document.getElementById(styleId);
    if (theme === 'dark') {
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        styleTag.innerHTML = `
          .ck.ck-editor__main > .ck-editor__editable { background: #232946 !important; color: #fff !important; }
          .ck.ck-toolbar { background: #181c2a !important; color: #fff !important; }
          .ck.ck-toolbar .ck-button .ck-button__label, .ck.ck-toolbar .ck-button .ck-icon { color: #fff !important; }
          .ck.ck-dropdown .ck-dropdown__panel { background: #232946 !important; color: #fff !important; }
          .ck.ck-list__item .ck-button__label { color: #fff !important; }
          .ck.ck-editor__editable { caret-color: #fff !important; }
        `;
        document.head.appendChild(styleTag);
      }
    } else {
      if (styleTag) {
        styleTag.remove();
      }
    }
    return () => {
      const tag = document.getElementById(styleId);
      if (tag) tag.remove();
    };
  }, [theme]);

  // Fetch blog data for edit mode
  useEffect(() => {
    if (mode === 'edit' && id) {
      setLoading(true);
      setError('');
      getDoc(doc(db, 'blogs', id))
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setForm({
              title: data.title || '',
              excerpt: data.excerpt || '',
              content: data.content || '',
              category: data.category || '',
              tags: (data.tags || []).join(', '),
              image: data.image || '',
            });
          } else {
            setError('Blog post not found.');
          }
        })
        .catch(() => setError('Failed to load blog post.'))
        .finally(() => setLoading(false));
    } else {
      setForm(initialForm);
    }
  }, [mode, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const blogData = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        date: Timestamp.now().toDate().toISOString(),
      };
      if (mode === 'create') {
        await addDoc(collection(db, 'blogs'), blogData);
        setSuccess('Blog post created!');
      } else if (mode === 'edit' && id) {
        await updateDoc(doc(db, 'blogs', id), blogData);
        setSuccess('Blog post updated!');
      }
      setTimeout(() => navigate('/admin'), 1000);
    } catch (err) {
      setError('Failed to save blog post.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-10 gradient-text">
        {mode === 'create' ? 'Create New Blog Post' : `Edit Blog Post`}
      </h1>
      {loading ? (
        <div className="text-center text-lg py-20">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg py-20">{error}</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6 bg-white dark:bg-secondary-900 rounded-2xl shadow-xl p-10 text-black dark:text-white">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Title"
            className="w-full px-6 py-4 rounded-lg border text-xl font-semibold bg-white dark:bg-secondary-800 text-black dark:text-white"
          />
          <input
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            required
            placeholder="Excerpt"
            className="w-full px-6 py-3 rounded-lg border text-lg bg-white dark:bg-secondary-800 text-black dark:text-white"
          />
          <div>
            <label className="block mb-2 font-medium text-secondary-700 dark:text-secondary-200">Content</label>
            <div className="bg-white dark:bg-secondary-800 rounded-lg min-h-[300px]">
              <CKEditor
                editor={ClassicEditor as any}
                data={form.content}
                config={{
                  toolbar: [
                    'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
                    'insertTable', 'imageUpload', 'mediaEmbed', 'undo', 'redo', 'codeBlock'
                  ],
                  table: { contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ] },
                  extraPlugins: [CustomUploadAdapterPlugin],
                }}
                onChange={(_event, editor) => {
                  const data = editor.getData();
                  setForm(f => ({ ...f, content: data }));
                }}
              />
            </div>
          </div>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="Category"
            className="w-full px-6 py-3 rounded-lg border text-lg bg-white dark:bg-secondary-800 text-black dark:text-white"
          />
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full px-6 py-3 rounded-lg border text-lg bg-white dark:bg-secondary-800 text-black dark:text-white"
          />
          <div className="mb-4">
            <label className="block mb-2 font-medium text-secondary-700 dark:text-secondary-200">Image</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL (optional)"
              className="w-full px-6 py-3 rounded-lg border text-lg bg-white dark:bg-secondary-800 text-black dark:text-white"
            />
          </div>
          <div className="flex gap-4 mt-8">
            <button type="submit" className="btn-primary px-10 py-4 text-xl font-semibold" disabled={loading}>
              {loading ? (mode === 'create' ? 'Creating...' : 'Saving...') : (mode === 'create' ? 'Create' : 'Save')}
            </button>
            <button type="button" className="btn-secondary px-10 py-4 text-xl font-semibold" onClick={handleCancel} disabled={loading}>
              Cancel
            </button>
          </div>
          {success && <p className="text-green-600 mt-2 text-lg">{success}</p>}
          {error && <p className="text-red-500 mt-2 text-lg">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default AdminBlogEditor; 