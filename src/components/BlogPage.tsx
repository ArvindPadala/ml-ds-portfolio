import React, { useEffect, useState, useContext } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ThemeContext } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';

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

// ML/DS themed floating math symbols
const FloatingMathSymbols = () => {
  const symbols = ["∑", "∫", "∂", "∇", "σ", "μ", "θ", "λ", "α", "β"];
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {symbols.map((symbol, i) => (
        <motion.div
          key={symbol + i}
          className="absolute text-2xl font-bold text-primary-300/20 select-none"
          style={{
            left: `${10 + (i * 8) % 80}%`,
            top: `${15 + (i * 7) % 70}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
};

// Utility to strip HTML tags and get a short preview
function getContentPreview(html: string, maxLength = 120) {
  const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  // If a blog is selected via URL, show the full reading page
  const blogId = location.pathname.startsWith('/blog/') ? location.pathname.replace('/blog/', '') : null;
  const selectedBlog = blogId ? posts.find(p => p.id === blogId) : null;

  // Blog page theme preference: default to light mode if no preference is set
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (!stored) {
      // If no theme preference is stored, set to light mode for blog page
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[];
        setPosts(data);
      } catch (err) {
        setError('Failed to load blog posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="relative min-h-screen max-w-5xl mx-auto py-16 px-4">
      <FloatingMathSymbols />
      <h1 className="text-4xl font-bold mb-8 gradient-text relative z-10">Blogs</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-secondary-700 dark:text-secondary-200">No blog posts found.</p>
      )}
      {/* Blog Reading Page */}
      {selectedBlog ? (
        <div className="relative z-10 bg-white dark:bg-secondary-900 rounded-2xl shadow-2xl p-8 text-black dark:text-white">
          {selectedBlog.image && (
            <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-64 object-cover rounded mb-6" />
          )}
          <h2 className="text-3xl font-bold mb-2">{selectedBlog.title}</h2>
          <div className="flex items-center text-sm text-secondary-500 mb-4">
            <span>{new Date(selectedBlog.date).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{selectedBlog.author}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedBlog.tags && selectedBlog.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div
            className="prose dark:prose-invert max-w-none mt-4 text-black dark:text-white"
            dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
          />
          {/* Comment Section */}
          <div className="mt-12 border-t pt-8">
            <h3 className="text-2xl font-bold mb-4">Comments</h3>
            {/* Simple comment form and list (local state only for now) */}
            <CommentSection blogId={selectedBlog.id} />
          </div>
        </div>
      ) : (
        // NYTimes/news-style layout
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Featured large card (left, spans 2 rows on desktop) */}
          {posts[0] && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              whileHover={{
                scale: 1.08,
                y: -4,
                boxShadow: "0 0 16px 4px #e879f9, 0 0 32px 8px #60a5fa"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="lg:row-span-2 cursor-pointer bg-white dark:bg-secondary-900 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 text-black dark:text-white lg:col-span-2"
              style={{ minHeight: '400px' }}
              onClick={() => navigate(`/blog/${posts[0].id}`)}
            >
              {posts[0].image && (
                <motion.img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full h-64 object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <div className="flex-1 flex flex-col p-8">
                <h2 className="text-3xl font-bold mb-2 line-clamp-2">{posts[0].title}</h2>
                <p className="text-secondary-600 dark:text-secondary-200 mb-4 text-lg line-clamp-3">{posts[0].excerpt}</p>
                <p className="text-secondary-500 dark:text-secondary-300 mb-2 text-base line-clamp-2 italic">{getContentPreview(posts[0].content, 160)}</p>
                <div className="flex items-center text-sm text-secondary-500 mb-4">
                  <span>{new Date(posts[0].date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{posts[0].author}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {posts[0].tags && posts[0].tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {/* Two smaller cards stacked on the right (desktop) or below (mobile) */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            {posts.slice(1, 3).map(post => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                whileHover={{
                  scale: 1.08,
                  y: -4,
                  boxShadow: "0 0 16px 4px #e879f9, 0 0 32px 8px #60a5fa"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="cursor-pointer bg-white dark:bg-secondary-900 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 text-black dark:text-white"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                {post.image && (
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                <div className="flex-1 flex flex-col p-6">
                  <h2 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h2>
                  <p className="text-secondary-600 dark:text-secondary-200 mb-2 line-clamp-3">{post.excerpt}</p>
                  <p className="text-secondary-500 dark:text-secondary-300 mb-2 text-sm line-clamp-2 italic">{getContentPreview(post.content, 100)}</p>
                  <div className="flex items-center text-xs text-secondary-500 mb-2">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags && post.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      {/* Rest of the posts in a 2-column grid */}
      <div className="grid sm:grid-cols-2 gap-8 relative z-10">
        {posts.slice(3).map(post => (
          <motion.div
            key={post.id}
            layout
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            whileHover={{
              scale: 1.08,
              y: -4,
              boxShadow: "0 0 16px 4px #e879f9, 0 0 32px 8px #60a5fa"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="cursor-pointer bg-white dark:bg-secondary-900 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 text-black dark:text-white"
            onClick={() => navigate(`/blog/${post.id}`)}
          >
            {post.image && (
              <motion.img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              />
            )}
            <div className="flex-1 flex flex-col p-6">
              <h2 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h2>
              <p className="text-secondary-600 dark:text-secondary-200 mb-2 line-clamp-3">{post.excerpt}</p>
              <p className="text-secondary-500 dark:text-secondary-300 mb-2 text-sm line-clamp-2 italic">{getContentPreview(post.content, 100)}</p>
              <div className="flex items-center text-xs text-secondary-500 mb-2">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {post.tags && post.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Simple comment section (local state, can be replaced with backend later)
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

export default BlogPage; 