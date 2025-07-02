import React, { useState, useEffect, useContext } from 'react';
import { auth, googleProvider, db, storage } from '../services/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc, Timestamp, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ThemeContext } from '../App';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const initialForm = {
  title: '',
  excerpt: '',
  content: '',
  category: '',
  tags: '', // comma separated
  image: '',
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
}

// Custom CKEditor upload adapter for Firebase Storage
function CustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return {
      upload: async () => {
        const file = await loader.file;
        const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return { default: url };
      },
      abort: () => {}
    };
  };
}

const AdminBlogPage: React.FC = () => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editForm, setEditForm] = useState(initialForm);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user) fetchPosts();
    // eslint-disable-next-line
  }, [user]);

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

  const fetchPosts = async () => {
    setFetchingPosts(true);
    try {
      const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() })) as BlogPost[];
      setPosts(data);
    } catch (err) {
      setError('Failed to fetch blog posts.');
    } finally {
      setFetchingPosts(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setError('');
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Sign in error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign in was cancelled.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized. Please contact the administrator.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked. Please allow popups for this site.');
      } else {
        setError(`Sign in failed: ${err.message || 'Unknown error'}`);
      }
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await addDoc(collection(db, 'blogs'), {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        author: user?.displayName || user?.email || 'Admin',
        date: Timestamp.now().toDate().toISOString(),
      });
      setSuccess('Blog post published!');
      setForm(initialForm);
      fetchPosts();
    } catch (err) {
      setError('Failed to publish blog post.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await deleteDoc(doc(db, 'blogs', id));
      setPosts(posts => posts.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete blog post.');
    }
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setEditForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      image: post.image || '',
    });
    setEditError('');
    setEditSuccess('');
  };

  const closeEditModal = () => {
    setEditingPost(null);
    setEditForm(initialForm);
    setEditError('');
    setEditSuccess('');
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setEditLoading(true);
    setEditError('');
    setEditSuccess('');
    try {
      await updateDoc(doc(db, 'blogs', editingPost.id), {
        ...editForm,
        tags: editForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      });
      setEditSuccess('Blog post updated!');
      fetchPosts();
      setTimeout(closeEditModal, 1000);
    } catch (err) {
      setEditError('Failed to update blog post.');
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-10 gradient-text">Admin Blog Editor</h1>
      {!user ? (
        <div className="text-center">
          <button onClick={handleSignIn} className="btn-primary px-6 py-3 text-lg font-semibold mb-4">Sign in with Google</button>
          {error && <p className="text-red-500 mt-4 text-lg max-w-md mx-auto">{error}</p>}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <span className="text-secondary-700 dark:text-secondary-200">Signed in as <b>{user.displayName || user.email}</b></span>
            <button onClick={handleSignOut} className="btn-secondary px-4 py-2 ml-4">Sign out</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-secondary-900 rounded-2xl shadow-xl p-10 mb-12 text-black dark:text-white">
            <input name="title" value={form.title} onChange={handleChange} required placeholder="Title" className="w-full px-6 py-4 rounded-lg border text-xl font-semibold bg-white dark:bg-secondary-800 text-black dark:text-white" />
            <input name="excerpt" value={form.excerpt} onChange={handleChange} required placeholder="Excerpt" className="w-full px-6 py-3 rounded-lg border text-lg bg-white dark:bg-secondary-800 text-black dark:text-white" />
            <div>
              <label className="block mb-2 font-medium text-secondary-700 dark:text-secondary-200">Content</label>
              <div className="bg-white dark:bg-secondary-800 rounded-lg min-h-[300px] text-lg text-black dark:text-white">
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
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setForm(f => ({ ...f, content: data }));
                  }}
                />
              </div>
            </div>
            <input name="category" value={form.category} onChange={handleChange} required placeholder="Category" className="w-full px-6 py-3 rounded-lg border text-lg bg-white dark:bg-secondary-800 text-black dark:text-white" />
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full px-6 py-3 rounded-lg border text-lg bg-white dark:bg-secondary-800 text-black dark:text-white" />
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
            <button type="submit" className="btn-primary px-10 py-4 text-xl font-semibold" disabled={loading}>{loading ? 'Publishing...' : 'Publish Blog'}</button>
            {success && <p className="text-green-600 mt-2 text-lg">{success}</p>}
            {error && <p className="text-red-500 mt-2 text-lg">{error}</p>}
          </form>
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Your Blog Posts</h2>
          {fetchingPosts ? <p>Loading...</p> : posts.length === 0 ? <p>No posts found.</p> : (
            <div className="space-y-6">
              {posts.map(post => (
                <div key={post.id} className="bg-white dark:bg-secondary-900 rounded shadow p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg text-black dark:text-white">{post.title}</h3>
                      <div className="text-xs text-secondary-500">{new Date(post.date).toLocaleDateString()} • {post.author}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline">Delete</button>
                      <button onClick={() => openEditModal(post)} className="text-blue-600 hover:underline">Edit</button>
                    </div>
                  </div>
                  <div className="text-secondary-700 dark:text-secondary-200 text-sm line-clamp-2">{post.excerpt}</div>
                </div>
              ))}
            </div>
          )}
          {/* Edit Modal */}
          {editingPost && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-secondary-900 rounded-2xl shadow-2xl p-10 w-full max-w-2xl relative overflow-y-auto max-h-screen text-black dark:text-white">
                <button onClick={closeEditModal} className="absolute top-2 right-4 text-3xl">&times;</button>
                <h2 className="text-2xl font-bold mb-6 gradient-text">Edit Blog Post</h2>
                <form onSubmit={handleEditSubmit} className="space-y-6">
                  <input name="title" value={editForm.title} onChange={handleEditChange} required placeholder="Title" className="w-full px-6 py-4 rounded-lg border text-xl font-semibold bg-white dark:bg-secondary-800 text-black dark:text-white" />
                  <input name="excerpt" value={editForm.excerpt} onChange={handleEditChange} required placeholder="Excerpt" className="w-full px-6 py-3 rounded-lg border text-lg bg-white dark:bg-secondary-800 text-black dark:text-white" />
                  <div>
                    <label className="block mb-2 font-medium text-secondary-700 dark:text-secondary-200">Content</label>
                    <div className="bg-white dark:bg-secondary-800 rounded-lg min-h-[300px] text-lg text-black dark:text-white">
                      <CKEditor
                        editor={ClassicEditor as any}
                        data={editForm.content}
                        config={{
                          toolbar: [
                            'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
                            'insertTable', 'imageUpload', 'mediaEmbed', 'undo', 'redo', 'codeBlock'
                          ],
                          table: { contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ] },
                          extraPlugins: [CustomUploadAdapterPlugin],
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setEditForm(f => ({ ...f, content: data }));
                        }}
                      />
                    </div>
                  </div>
                  <input name="category" value={editForm.category} onChange={handleEditChange} required placeholder="Category" className="w-full px-6 py-3 rounded-lg border text-lg bg-white dark:bg-secondary-800 text-black dark:text-white" />
                  <input name="tags" value={editForm.tags} onChange={handleEditChange} placeholder="Tags (comma separated)" className="w-full px-6 py-3 rounded-lg border text-lg bg-white dark:bg-secondary-800 text-black dark:text-white" />
                  <div className="mb-4">
                    <label className="block mb-2 font-medium text-secondary-700 dark:text-secondary-200">Image</label>
                    <input
                      type="text"
                      name="image"
                      value={editForm.image}
                      onChange={handleEditChange}
                      placeholder="Image URL (optional)"
                      className="w-full px-6 py-3 rounded-lg border text-lg bg-white dark:bg-secondary-800 text-black dark:text-white"
                    />
                  </div>
                  <button type="submit" className="btn-primary px-10 py-4 text-xl font-semibold" disabled={editLoading}>{editLoading ? 'Saving...' : 'Save Changes'}</button>
                  {editSuccess && <p className="text-green-600 mt-2 text-lg">{editSuccess}</p>}
                  {editError && <p className="text-red-500 mt-2 text-lg">{editError}</p>}
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBlogPage; 