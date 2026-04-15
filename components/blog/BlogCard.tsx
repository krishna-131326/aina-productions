import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  coverImage: string;
  excerpt: string;
  publishedAt: string;
  slug: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

export default function BlogCard({ post }: { post: Post }) {
  return (
    <article className="bg-[var(--surface)] border border-[var(--border)] overflow-hidden hover:border-[var(--accent)] transition-colors duration-300 group">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-video bg-[var(--bg)]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-6">
          <p
            className="text-xs uppercase tracking-widest text-[var(--muted)] mb-3"
            style={{ fontFamily: 'var(--font-space-mono), monospace' }}
          >
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <h2
            className="text-2xl text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors"
            style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
          >
            {post.title}
          </h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            {post.author && (
              <span
                className="text-xs text-[var(--muted)]"
                style={{ fontFamily: 'var(--font-space-mono), monospace' }}
              >
                {post.author.name}
              </span>
            )}
            <span
              className="text-xs uppercase tracking-widest text-[var(--accent)]"
              style={{ fontFamily: 'var(--font-space-mono), monospace' }}
            >
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
} 