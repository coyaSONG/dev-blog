export default function FeaturedSnippet() {
  return (
    <section className="mb-16 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Featured Code Snippet</h2>
      <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-6 hover:scale-[1.01] transition-transform duration-300">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium">useEffect Hook Example</span>
          <button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            Copy
          </button>
        </div>
        <pre className="overflow-x-auto">
          <code className="text-sm">
            {`useEffect(() => {
  const handleScroll = () => {
    // Handle scroll logic
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);`}
          </code>
        </pre>
      </div>
    </section>
  )
} 