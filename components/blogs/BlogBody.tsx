import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "../../sanity/lib/image";
import { hasSanityConfig } from "../../sanity/env";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-3xl font-bold text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-2xl font-bold text-gray-900">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="pl-4 my-6 italic border-l-4 border-primary text-gray-600">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-gray-700 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-gray-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-gray-700">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="font-semibold text-primary underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset || !hasSanityConfig()) return null;
      return (
        <figure className="my-8 overflow-hidden rounded-2xl">
          <img
            src={urlForImage(value).width(1200).url()}
            alt={value.alt || ""}
            className="object-cover w-full"
          />
        </figure>
      );
    },
  },
};

interface BlogBodyProps {
  body?: unknown[] | null;
  content?: string[];
}

export default function BlogBody({ body, content = [] }: BlogBodyProps) {
  if (body && body.length > 0) {
    return (
      <div className="prose prose-lg max-w-none prose-teal">
        <PortableText value={body as never} components={components} />
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none prose-teal text-gray-700 leading-relaxed">
      {content.map((paragraph, index) => (
        <p key={index} className="mb-6">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
