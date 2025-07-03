import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ThemeContext } from '../App';

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

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, 'blogs', id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost);
        } else {
          setError('Blog post not found.');
        }
      } catch (err) {
        setError('Failed to load blog post.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  return (
    <div className="relative min-h-screen max-w-3xl mx-auto py-16 px-4">
      <button onClick={() => navigate(-1)} className="mb-6 text-primary-600 hover:underline font-medium">← Back to Blogs</button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {post && (
        <div className="bg-white dark:bg-secondary-900 rounded-2xl shadow-2xl p-8 text-black dark:text-white">
          {post.image && (
            <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded mb-6" />
          )}
          <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
          <div className="flex items-center text-sm text-secondary-500 mb-4">
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags && post.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div
            className="prose dark:prose-invert max-w-none mt-4 text-black dark:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {/* Comment Section */}
          <div className="mt-12 border-t pt-8">
            <h3 className="text-2xl font-bold mb-4">Comments</h3>
            <CommentSection blogId={post.id} />
          </div>
        </div>
      )}
    </div>
  );
};

const CommentSection: React.FC<{ blogId: string }> = ({ blogId }) => {
  const [comments, setComments] = useState<{ name: string; text: string }[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && text) {
      setComments([...comments, { name, text }]);
      setName('');
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full px-4 py-2 rounded border bg-white dark:bg-secondary-800 text-black dark:text-white"
          required
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full px-4 py-2 rounded border bg-white dark:bg-secondary-800 text-black dark:text-white"
          rows={3}
          required
        />
        <button type="submit" className="btn-primary px-6 py-2 font-semibold">Post Comment</button>
      </form>
      <div className="space-y-4">
        {comments.length === 0 && <p className="text-secondary-500">No comments yet.</p>}
        {comments.map((c, i) => (
          <div key={i} className="bg-secondary-50 dark:bg-secondary-800 rounded p-4">
            <div className="font-bold text-primary-700 dark:text-primary-300 mb-1">{c.name}</div>
            <div className="text-secondary-800 dark:text-secondary-100">{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail; 