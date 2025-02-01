import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Search, Tag, Eye, Calendar } from 'lucide-react';
import { dummyArticles } from '../lib/dummy-data';
import { formatDistanceToNow } from 'date-fns';

export function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(dummyArticles.map(article => article.category)));

  const filteredArticles = dummyArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Knowledge Base</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Explore our community-driven knowledge base of tech stacks and best practices.</p>
        </div>
        <Link to="/knowledge-base/new" className="btn">
          <Book className="w-4 h-4 mr-2" />
          Write Article
        </Link>
      </div>

      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li
                  key={category}
                  className={`cursor-pointer ${
                    selectedCategory === category
                      ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <article key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <Link to={`/knowledge-base/${article.id}`}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400">
                    {article.title}
                  </h2>
                </Link>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{article.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <div className="flex gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {article.views} views
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDistanceToNow(new Date(article.updated_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
            {filteredArticles.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No articles found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}