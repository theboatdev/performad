export default function SingleBlogPage({ blog }) {
  const { title, image, author, authorPhoto, publishedDate, content } = blog;

  return (
    <section id="single-blog" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-8 md:mx-10 lg:mx-auto">
        {/* Blog Header */}
        <div className="mb-12 space-y-5 text-center">
          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <img
              src={authorPhoto}
              alt={author}
              className="w-12 h-12 bg-center bg-cover border rounded-full"
            />
            <div>
              <p className="text-md font-semibold">{author}</p>
              <p className="text-sm">{publishedDate}</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={image}
            alt={title}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-gray-800">
          {content.map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
