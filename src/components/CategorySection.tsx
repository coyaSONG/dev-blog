export default function CategorySection() {
  const categories = ["Frontend", "Backend", "DevOps", "Architecture"]
  
  return (
    <section className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <a
            key={category}
            href="#"
            className={`p-6 rounded-lg border dark:border-gray-800 border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <h3 className="font-bold mb-2">{category}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Explore {category.toLowerCase()} articles and tutorials
            </p>
          </a>
        ))}
      </div>
    </section>
  )
} 